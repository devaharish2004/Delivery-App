import pool from "../../db.js";

const addGoods = async (req, res) => {

    try {

        const {name, category, sender_mobile_no, receiver_mobile_no, delivery_address, taken_for_delivery, expected_delivery_date, expiry_date, damaged } = req.body;

        const client = await pool.connect();

        const query = {
            text : "INSERT INTO goods (name, category, sender_mobile_no, receiver_mobile_no, delivery_address, taken_for_delivery, expected_delivery_date, expiry_date, damaged) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            
            values : [name, category, sender_mobile_no, receiver_mobile_no, delivery_address, taken_for_delivery, expected_delivery_date, expiry_date, damaged]
        };

        await client.query(query);

        client.release();

        res.status(200).json({ message : "Good has been registered successfully in the inventory" });        

    } catch (err) {
        res.status(500).json({message : err.message});
    }

};

export default addGoods;