import {Router} from "express";
import {PaymentController} from "./payment.controller";

export const paymentRouter = Router()
const paymentController = new PaymentController()

paymentRouter.post('/', paymentController.postPayment)
paymentRouter.post('/callback', paymentController.postPaymentCallback)
