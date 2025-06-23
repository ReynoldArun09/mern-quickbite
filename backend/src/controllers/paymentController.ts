import { type Request, type Response } from "express";
import Stripe from "stripe";
import { ParsedEnvVariables } from "../configs";
import { HttpStatusCode } from "../constants";
import { clearCartAfterPaymentService } from "../services/paymentService";
import { sendApiResponse } from "../utils";
import { customAsyncWrapper } from "../utils/customAsyncWrapper";
import { cartItemsSchema } from "../validations";

const stripe = new Stripe(ParsedEnvVariables.STRIPE_KEY);

export const createCheckoutSessionApi = customAsyncWrapper(async (request: Request, response: Response) => {
  const cartItems = cartItemsSchema.parse(request.body.cartItems);

  let totalAmount = 0;

  const lineItems = cartItems.map((item: any) => {
    const unitAmount = Math.round(item.product.price * 100);
    const quantity = item.count || 1;

    totalAmount += unitAmount * quantity;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: unitAmount,
      },
      quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${ParsedEnvVariables.CORS_ORIGIN}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ParsedEnvVariables.CORS_ORIGIN}/purchase-cancel`,
    metadata: {
      userId: request.ctx?._id?.toString() || "unknown",
      products: JSON.stringify(
        cartItems.map((item: any) => ({
          productId: item.product._id,
          quantity: item.count,
          price: item.product.price,
        }))
      ),
      totalAmountCents: totalAmount,
    },
  });

  return response.status(200).json({
    success: true,
    id: session.id,
  });
});

/**
 * Handles the request to clear cart items after successful payment.
 *
 * Calls `clearCartAfterPaymentService` clears the cart of logged in user.
 *
 * @function clearCartAfterPayment
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 *
 * @returns Send a response of HTTP 200 status.
 */
export const clearCartAfterPayment = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.ctx._id;

  await clearCartAfterPaymentService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});
