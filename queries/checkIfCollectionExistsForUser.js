const db = require('../config/db');

async function checkIfCollectionExistsForUser({ userId, collectionId }) {
    try {
        const x = await db.query(
            `SELECT * from collections
            WHERE user_id = ${userId}
            AND id = ${collectionId}`
        );
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

module.exports = checkIfCollectionExistsForUser;