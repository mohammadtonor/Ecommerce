import { CardElement, useStripe } from "@stripe/react-stripe-js";

const CardElementData = () => {
  const stripe = useStripe();

  return (
    <CardElement 
        id="payment-element"
        className="border rounded-md p-2 textsm"
    />
  )
}

export default CardElementData