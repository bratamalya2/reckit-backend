const db = require('../config/db');

async function addNewCollection({ name, description, userId }) {
    try {
        await db.query(
            `INSERT INTO collections
            (name, description, user_id, recommendation_ids)
            VALUES
            ('${name}', '${description}', ${userId}, '{}')
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
            err: 'Wrong input provided!'
        }
    }
}

module.exports = addNewCollection;
