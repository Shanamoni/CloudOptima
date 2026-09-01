
const express = require("express");

const router = express.Router();

const permission = require("../../middleware/permission.middleware");
const authMiddleware = require("../../middleware/auth.middleware");

const {
    generateRecommendations,
    getRecommendations,
} = require("./recommendation.controller");

router.post(
    "/generate",
    authMiddleware,
    permission("GENERATE_RECOMMENDATIONS"),
    generateRecommendations
);

router.get(
    "/",
    authMiddleware,
    permission("VIEW_RECOMMENDATIONS"),
    getRecommendations
);

module.exports = router;
