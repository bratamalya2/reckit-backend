const db = require('../config/db');

async function removeCollection({ collectionId }) {
    try {
        await db.query(
            `
            DELETE FROM collections
            WHERE id = ${collectionId}
            `
        );
        return {
            success: true,
            err: null
        }
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            err: 'Internal server error!'
        }
    }
}

module.exports = removeCollection;