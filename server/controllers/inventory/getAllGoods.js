import pool from "../../db.js"

const getAllGoods = async (req, res) => {

    try {

        const query = "SELECT * FROM goods";

        const client = await pool.connect();

        const result = await client.query(query);

        res.status(200).json({ message : result.rows });

    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

export default getAllGoods;