import { useStripe, Screen, Button } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";

export default function CheckoutScreen() {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [loading, setLoading] = useState(false);

	const fetchPaymentSheetParams = async () => {
		const response = await fetch("http://localhost:3000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const { paymentIntent, ephemeralKey, customer } = await response.json();

		return {
			paymentIntent,
			ephemeralKey,
			customer,
		};
	};

	const initializePaymentSheet = async () => {
		const { paymentIntent, ephemeralKey, customer, publishableKey } =
			await fetchPaymentSheetParams();

		const { error } = await initPaymentSheet({
			merchantDisplayName: "Example, Inc.",
			customerId: customer,
			customerEphemeralKeySecret: ephemeralKey,
			paymentIntentClientSecret: paymentIntent,
			// Set `allowsDelayedPaymentMethods` to true if your business can handle payment
			//methods that complete payment after a delay, like SEPA Debit and Sofort.
			allowsDelayedPaymentMethods: true,
			defaultBillingDetails: {
				name: "Jane Doe",
			},
		});
		if (!error) {
			setLoading(true);
		}
	};

	const openPaymentSheet = async () => {
		// see below
		const { error } = await presentPaymentSheet();

		if (error) {
			Alert.alert(`Error code: ${error.code}`, error.message);
		} else {
			Alert.alert("Success", "Your order is confirmed!");
		}
	};

	useEffect(() => {
		initializePaymentSheet();
	}, []);

	return (
		<Screen>
			<Button
				variant="primary"
				disabled={!loading}
				title="Checkout"
				onPress={openPaymentSheet}
			/>
		</Screen>
	);
}
