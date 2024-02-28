import express from "express";
import addGoods from "../controllers/inventory/addGoods.js";
import updateGoods from "../controllers/inventory/updateGoods.js";
import verifyToken from "../middleware/verifyToken.js";
import deleteGoods from "../controllers/inventory/deleteGoods.js";
import getAllGoods from "../controllers/inventory/getAllGoods.js";

const app = express.Router();

app.post('/add', verifyToken(["inventory_team"]), addGoods);

app.put('/update/:id', verifyToken(["inventory_team"]), updateGoods);

app.delete('/delete/:id', verifyToken(["inventory_team"]), deleteGoods);

app.get('/', verifyToken(["inventory_team"]), getAllGoods);

export {app as invRouter};