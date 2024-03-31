import pool from "../../db.js";

const deleteGoods = async (req, res) => {

    try {

        const id = req.params.id;

        const query = {
            text : "DELETE FROM goods WHERE id = $1",
            values : [id]
        }

        const client = await pool.connect();

        await client.query(query);

        client.release();

        res.status(200).json({ message : "Good has been deleted successfully " });

    } catch (err) {
        res.status(500).json({ message : err.message });
    }

};


export default deleteGoods;