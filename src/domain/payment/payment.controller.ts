import { Response, Request } from "express";
import { PaymentService } from "./payment.service";
import { User } from "../../models/User";
import { UserService } from "../users/user.service";
import { IPayment, IPaymentCallback } from "./payment.types";
import { Order } from "../../models/Order";
import { OrderService } from "../order/order.service";
import { Hmac } from "../../utils/Hmac";
import { config } from "../../../config/config";
import { Log } from "../../models/Log";

export class PaymentController {
  async postPayment(req: Request, res: Response) {
    const body: IPayment = req.body;
    const paymentService = new PaymentService();
    const paymentLink = await paymentService.doPayment(body);
    res.status(200).json({ msg: paymentLink });
  }

  async postPaymentCallback(req: Request, res: Response) {
    const body: IPaymentCallback = req.body;
    const sign = req.body.Sign;
    console.log("SIGN ", sign);
    console.log("HEADERS ", req.headers);
    console.log("body ", req.body);
    if (Object.keys(body).length === 0) {
      return res.status(200).send("success");
    }
    if (body._param_project !== "ok_tren") {
      return res.status(200).send("success");
    }
    try {
      if (!req) {
        throw new Error("POST is empty");
        // } else if (!req.headers.sign) {
      } else if (!req.body.Sign) {
        console.log("SIGN", sign);
        throw new Error("signature not found");
      }

      if (body.payment_status === "success") {
        let duplicateInDB = await Order.findOne({
          prodamus_order_id: body.order_id,
        });
        if (duplicateInDB !== null) {
          return res.status(200).send("success");
        }
        // add user to DB - update User state
        const userService = new UserService();
        const isUserStateUpdated = await userService.updateUserState(body);
        if (isUserStateUpdated === true) {
          const orderService = new OrderService();
          await orderService.createNewOrder(body);
        }
      } else {
        return res.status(200).send("success");
      }
    } catch (err: any) {
      let log = new Log();
      log.title = "Payment not accept";
      log.msg = "Payment was not accepted by Prodamus";
      log.date = new Date();
      log.vk_user_id = +body.vk_user_id;
      log.raw = err.message;
      log.type = "Payment";
      await log.save();
      console.log(err.message);
      return res.status(400);
    }
  }
}
