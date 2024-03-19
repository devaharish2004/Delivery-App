import jwt from "jsonwebtoken";

const verifyToken = (allowedTeams) => async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        const token = authHeader && authHeader.split(' ')[1];

        if(!token)
        {
            return res.status(401).json({message : "Unauthorized"});
        }

        else
        {
            jwt.verify(token, process.env.SECRET, (err, user) => {
            
                if (err || !allowedTeams.includes(user.team) ) {
                  return res.status(403).json({ message: 'Forbidden' });
                }
    
                req.user_id = user.id;
    
                req.user_team = user.team;
                
                next();

            });
        }        

    } catch(err) {
        res.status(500).json({message : err.message});
    }

};

export default verifyToken;