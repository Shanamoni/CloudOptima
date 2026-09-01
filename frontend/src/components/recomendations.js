
import { useEffect, useState } from "react";

import { getRecommendations } from "../api/recommendations.api";

import "../styles/recommendations.css";

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecs = async () => {
            const data = await getRecommendations();
            setRecommendations(data);
        };

        fetchRecs();
    }, []);

    return (
        <div className="reco-container">
            <h1 className="page-title">Recommendations</h1>

            {recommendations.length === 0 && (
                <p>No recommendations available.</p>
            )}

            {recommendations.map((rec) => (
                <div className="reco-card" key={rec._id}>
                    <div className="reco-title">{rec.title}</div>
                    <div className="reco-desc">{rec.description}</div>
                </div>
            ))}
        </div>
    );
};

export default Recommendations;