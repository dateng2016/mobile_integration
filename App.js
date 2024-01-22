import { StripeProvider } from "@stripe/stripe-react-native";
import CheckoutScreen from "./CheckoutScreen";

function App() {
	return (
		<StripeProvider
			publishableKey="pk_test_51OaNliHTSWlvjOpcc3d9JLG2IbDRBGBm2aG5ITA6VyCTtJBB3saEGBs3CcH5FC4mesDQz7zpDCcnxDc0xYiH0lkc00PuRVUimv"
			// urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
			// merchantIdentifier="merchant.com.{{'YOUR_APP_NAME'}}" // required for Apple Pay
			merchantIdentifier="merchant.com.stripe.react.native"
			threeDSecureParams={{
				backgroundColor: "#FFF",
				timeout: 5,
			}}
		>
			// Your app code here
			<CheckoutScreen />
		</StripeProvider>
	);
}
