```javascript
import { useEffect, useState } from "react";

import {
    getTotalBilling,
    getBillingByProvider,
    getBillingByService,
} from "../api/billing.api";

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import "../styles/layout.css";
import "../styles/billing.css";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const Billing = () => {
    const [total, setTotal] = useState(0);
    const [byProvider, setByProvider] = useState([]);
    const [byService, setByService] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const totalRes = await getTotalBilling();
                const providerRes = await getBillingByProvider();
                const serviceRes = await getBillingByService();

                setTotal(totalRes.totalCost);

                // Normalize data for charts
                setByProvider(
                    providerRes.map((item) => ({
                        name: item._id ?? item.provider,
                        value: item.totalCost ?? item.cost ?? 0,
                    }))
                );

                setByService(
                    serviceRes.map((item) => ({
                        name: item._id ?? item.service,
                        value: item.totalCost ?? item.cost ?? 0,
                    }))
                );
            } catch (err) {
                console.error("Billing fetch failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBilling();
    }, []);

    if (loading) return <h3>Loading billing data...</h3>;

    return (
        <div className="page-container">
            <h1 className="page-title">Billing Overview</h1>

            {/* TOTAL COST */}
            <div className="billing-card">
                <h3>Total Cost</h3>
                <h2>${total}</h2>
            </div>

            {/* COST BY PROVIDER */}
            <div className="billing-card">
                <h3>Cost by Provider</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={byProvider}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {byProvider.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* COST BY SERVICE */}
            <div className="billing-card">
                <h3>Cost by Service</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={byService}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Billing;