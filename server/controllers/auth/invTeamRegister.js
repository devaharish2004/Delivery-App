import pool from "../../db.js";
import bcrypt from "bcrypt";

const invTeamRegister = async (req, res) => {

    try {

        const { name, email, password } = req.body;
    
        const client = await pool.connect();

        const check_query = {
            text : "SELECT * FROM invteam WHERE email = $1",
            values : [email]
        }

        const result = await client.query(check_query);

        if(result.rows.length === 0) {

            const hashedPassword = await bcrypt.hash(password, 10);

            const query = {
                text : "INSERT INTO invteam (name, email, password) VALUES ($1, $2, $3)",
                values : [name, email, hashedPassword],
            };
    
            await client.query(query);

            res.status(200).json({message : "Welcome to the invTeam"});

        }

        else {

            res.status(409).json({message : "User already registered. Please Log In"});
        }

        client.release();        

    } catch (err) {
        res.status(500).json({message : err.message});
    }

};

export default invTeamRegister;