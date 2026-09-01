
const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [
                "HIGH_COST_SERVICE",
                "PROVIDER_CONCENTRATION",
                "FORECAST_SURGE",
                "ANOMALY_DETECTED"
            ],
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        provider: {
            type: String,
        },

        serviceName: {
            type: String,
        },

        estimatedSavings: {
            type: Number,
            default: 0,
        },

        confidenceScore: {
            type: Number, // 0–100
            default: 70,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema
);