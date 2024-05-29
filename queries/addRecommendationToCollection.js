const db = require('../config/db');

async function addRecommendationToCollection({ userId, collectionId, recommendationId }) {
    try {
        const x = await db.query(`Select recommendation_ids from collections where user_id=${userId} and id=${collectionId}`);
        if (x.rows[0].recommendation_ids.length === 0) {
            //no recommendations exist
            await db.query(
                `UPDATE collections
                SET recommendation_ids = '{${recommendationId}}'
                WHERE id = ${collectionId}
                AND user_id = ${userId}
                `);
        }
        else {
            //recommendations already exist
            await db.query(
                `UPDATE collections
                SET recommendation_ids = array_append(recommendation_ids, ${recommendationId})
                WHERE id = ${collectionId}
                AND user_id = ${userId}
                `);
        }
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

module.exports = addRecommendationToCollection;