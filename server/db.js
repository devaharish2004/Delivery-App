import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "delivery_app",
    password : "helloworld",
    port : "5432"
});

export default pool;