import bcrypt from "bcrypt";
import pool from "../../db.js";
import jwt from "jsonwebtoken";


const invTeamLogin = async (req, res) => {
    
    try {

        const { email, password } = req.body;

        const client = await pool.connect();

        const query = {
            text : "SELECT * FROM invteam WHERE email = $1",
            values : [email]
        };

        const result = await client.query(query);

        if(result.rows.length === 0) {
            
            res.status(404).json({message : "No registered user found. Please Register"});
        
        }

        else {

            const employee = result.rows[0];

            //check if passwords are same
            const compare = await bcrypt.compare(password, employee.password);

            if(compare) {

                //token generation
                const token = jwt.sign({id : employee.id, team : "inventory_team"}, process.env.SECRET, {expiresIn : '15m'});

                delete employee.password;

                res.status(200).json({ token, employee });

            }   
            else {
                res.status(401).json({message : "Passwords do not match. Try again"});
            }

        }

    } catch (err) {
        res.status(500).json({message : err.message});
    }

};  

export default invTeamLogin;