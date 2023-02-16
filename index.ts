import express, { Express, Request, response, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();

interface RequestBody {
	amount: number;
	id: number;
}
app.post("/payment", async (req: Request, res: Response) => {
	const { amount, id }: RequestBody = req.body;
	try {
		const payment = await stripe.PaymentIntents.create({
			amount,
			currency: "usd",
			description: "Faloni",
		});
	} catch (error) {}
});
app.listen(process.env.PORT || 400, () => {
	console.log("port is listening");
});
