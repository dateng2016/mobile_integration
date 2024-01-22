import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.json());
import stripePackage from "stripe";

const stripe = stripePackage(
	"sk_test_51OaNliHTSWlvjOpcCkNXIu1U7PDrGmKshX0to0Ly25qSRObNnE7j9tiSk1CUyhFXP4TBNJ859qQP3vddxwGEa9hc0084Iy5E2X"
);
// const stripe = require("stripe")(
// 	"sk_test_51OaNliHTSWlvjOpcCkNXIu1U7PDrGmKshX0to0Ly25qSRObNnE7j9tiSk1CUyhFXP4TBNJ859qQP3vddxwGEa9hc0084Iy5E2X"
// );
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post("/payment-sheet", async (req, res) => {
	// Use an existing Customer ID if this is a returning customer.
	const customer = await stripe.customers.create();
	const ephemeralKey = await stripe.ephemeralKeys.create(
		{ customer: customer.id },
		{ apiVersion: "2023-10-16" }
	);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 1099,
		currency: "usd",
		customer: customer.id,
		// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.json({
		paymentIntent: paymentIntent.client_secret,
		ephemeralKey: ephemeralKey.secret,
		customer: customer.id,
		publishableKey:
			"pk_test_51OaNliHTSWlvjOpcc3d9JLG2IbDRBGBm2aG5ITA6VyCTtJBB3saEGBs3CcH5FC4mesDQz7zpDCcnxDc0xYiH0lkc00PuRVUimv",
	});
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
