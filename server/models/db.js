const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.PG_URI,
  });

module.exports = {
    query: async (text, params) => {
        try {
            console.log('Executed query', text);
            const res = await pool.query(text, params);
            return res;
        } catch (err) {
            console.error('Error executing query', text, err);
            throw err;
        }
    },
};