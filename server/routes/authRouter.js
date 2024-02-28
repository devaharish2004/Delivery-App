import express from "express";
import invTeamLogin from "../controllers/auth/invTeamLogin.js";
import dlvTeamLogin from "../controllers/auth/dlvTeamLogin.js";
import invTeamRegister from "../controllers/auth/invTeamRegister.js";
import dlvTeamRegister from "../controllers/auth/dlvTeamRegister.js";

const app = express.Router();


app.post('/invTeamLogin', invTeamLogin);

app.post('/dlvTeamLogin', dlvTeamLogin);

app.post('/invTeamRegister', invTeamRegister);

app.post('/dlvTeamRegister', dlvTeamRegister);


export {app as authRouter};