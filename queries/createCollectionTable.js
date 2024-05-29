const db = require('../config/db');

async function createCollectionTable() {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS collections (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            user_id INT4 NOT NULL,
            recommendation_ids INT4[] NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = createCollectionTable;