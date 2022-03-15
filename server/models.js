const { Pool } = require('pg');

const PG_URI = 'postgres://lygfkwyc:HRg2yzOYuGm1OnBY-yih8Jrtxud2_tAZ@kashin.db.elephantsql.com/lygfkwyc'

const pool = new Pool ({
    connectionString: PG_URI
})

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query: ', text);
        return pool.query(text, params, callback);
    }
};