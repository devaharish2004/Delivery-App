import pool from "../../db.js";

const updateGoods = async (req, res) => {

    try {

        const id = req.params.id;

        const { name, category, sender_mobile_no, receiver_mobile_no, delivery_address, taken_for_delivery, expected_delivery_date, expiry_date, damaged, agent_id } = req.body;

        const client = await pool.connect();

        const query = {
            text : `UPDATE goods SET name = $1, category = $2, sender_mobile_no = $3, receiver_mobile_no = $4, delivery_address = $5, taken_for_delivery = $6, expected_delivery_date = $7, expiry_date = $8, damaged = $9, agent_id = $10 WHERE id = $11`,
            values : [name, category, sender_mobile_no, receiver_mobile_no, delivery_address, taken_for_delivery, expected_delivery_date, expiry_date, damaged, agent_id, id]
        };

        await client.query(query);

        client.release();

        res.status(200).json( {message : "Good has been updated successfully"} );

    } catch (err) {
        res.status(500).json({ message : err.message });
    }

};

export default updateGoods;