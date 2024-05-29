const db = require('../config/db');

async function checkIfRecommendationExistsForUser({ userId, recommendationId }) {
    try {
        const x = await db.query(`Select * from recommendations where id = ${recommendationId} and user_id = ${userId}`);
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

module.exports = checkIfRecommendationExistsForUser;