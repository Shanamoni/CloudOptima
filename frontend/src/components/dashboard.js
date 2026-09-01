
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboard.api";
import "../styles/layout.css";
import "../styles/dashboard.css";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await getDashboardSummary();
                setData(res);
            } catch (err) {
                console.error("Dashboard fetch failed", err);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) return <h3>Loading dashboard...</h3>;

    if (!data) return <h3>No dashboard data available.</h3>;

    return (
        <div className="page-container">
            <h1 className="page-title">Dashboard Overview</h1>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h3>Total Cost</h3>
                    <p>
                        ${Number(data.totalCost || 0).toFixed(2)}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Forecasted Cost</h3>
                    <p>
                        ${Number(data.forecastedCost || 0).toFixed(2)}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Active Alerts</h3>
                    <p>
                        {data.alerts || 0}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Recommendations</h3>
                    <p>
                        {data.recommendations || 0}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
```