import express, { Express, Request, response, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface RequestBody {
	amount: number;
	id: number;
}
app.get("/config", (req: Request, res: Response) => {
	res.send({
		publishablekey: process.env.STRIPE_PUBLIC_KEY,
	});
});

app.post("/payment", async (req: Request, res: Response) => {
	// const { amount, id }: RequestBody = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount: 4099,
			currency: "USD",
			description: "Faloni",
			// payment_method: id,
			// confirm: true,
			automatic_payment_methods: {
				enabled: true,
			},
		});
		res.send({
			clientSecret: payment.client_secret,
			message: "backend dey work oo",
			success: true,
		});

		// res.json({

		// });
	} catch (error) {
		console.log("Error", error);
		res.json({
			message: "payment failed",
			success: false,
		});
	}
});
app.listen(process.env.PORT || 400, () => {
	console.log("port is listening on 400");
});
