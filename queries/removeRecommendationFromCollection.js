const db = require('../config/db');

async function removeRecommendationFromCollection({ collectionId, recommendationId }) {
    try {
        await db.query(
            `UPDATE collections
            SET recommendation_ids = array_remove(recommendation_ids, ${recommendationId})
            WHERE id = ${collectionId}`
        );
        return {
            success: true,
            err: null
        };
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            err: 'Internal server error!'
        };
    }
}

module.exports = removeRecommendationFromCollection;