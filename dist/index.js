"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.get("/config", (req, res) => {
    res.send({
        publishablekey: process.env.STRIPE_PUBLIC_KEY,
    });
});
app.post("/payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { amount, id }: RequestBody = req.body;
    try {
        const payment = yield stripe.paymentIntents.create({
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
    }
    catch (error) {
        console.log("Error", error);
        res.json({
            message: "payment failed",
            success: false,
        });
    }
}));
app.listen(process.env.PORT || 400, () => {
    console.log("port is listening on 400");
});
