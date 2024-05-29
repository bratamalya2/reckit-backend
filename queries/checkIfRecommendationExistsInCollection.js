const db = require('../config/db');

async function checkIfRecommendationExistsInCollection({ collectionId, recommendationId }) {
    try {
        const x = await db.query(`SELECT * from collections WHERE id = ${collectionId} AND ${recommendationId} IN (
            SELECT UNNEST (recommendation_ids)
        )`);
        return {
            success: x.rows.length > 0,
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

module.exports = checkIfRecommendationExistsInCollection;