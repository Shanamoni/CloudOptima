
const BillingNormalized = require("../billing/billing.model");
const Recommendation = require("./recommendation.model");

/**
 * Generate recommendations based on billing data
 */
exports.generateRecommendations = async (req, res) => {
    try {
        await Recommendation.deleteMany(); // Refresh recommendations

        // Rule 1: High-cost services
        const highCostServices = await BillingNormalized.aggregate([
            {
                $group: {
                    _id: "$serviceName",
                    totalCost: { $sum: "$cost" },
                },
            },
            { $sort: { totalCost: -1 } },
            { $limit: 3 },
        ]);

        if (highCostServices.length === 0) {
            return res.json({
                message: "No billing data available for recommendations.",
            });
        }

        for (const service of highCostServices) {
            await Recommendation.create({
                type: "HIGH_COST_SERVICE",
                title: `High cost detected for ${service._id}`,
                description: `The service ${service._id} is among the top cost contributors. Consider rightsizing or usage optimization.`,
                serviceName: service._id,
                estimatedSavings: service.totalCost * 0.15,
                confidenceScore: 80,
            });
        }

        // Rule 2: Provider cost concentration
        const providerCosts = await BillingNormalized.aggregate([
            {
                $group: {
                    _id: "$provider",
                    totalCost: { $sum: "$cost" },
                },
            },
        ]);

        const totalCost = providerCosts.reduce(
            (sum, p) => sum + p.totalCost,
            0
        );

        for (const provider of providerCosts) {
            if (provider.totalCost / totalCost > 0.6) {
                await Recommendation.create({
                    type: "PROVIDER_CONCENTRATION",
                    title: `High cost concentration on ${provider._id}`,
                    description: `More than 60% of total cloud cost is from ${provider._id}. Consider workload distribution.`,
                    provider: provider._id,
                    estimatedSavings: provider.totalCost * 0.1,
                    confidenceScore: 75,
                });
            }
        }

        res.json({
            message: "Recommendations generated successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

/**
 * Fetch all recommendations
 */
exports.getRecommendations = async (req, res) => {
    try {
        const data = await Recommendation.find().sort({
            createdAt: -1,
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};
