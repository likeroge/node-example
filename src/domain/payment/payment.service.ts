import { Hmac } from "../../utils/Hmac";
import { config } from "../../../config/config";
import { QueryBuilder } from "../../utils/QueryBuilder";
import axios from "axios";
import { UserService } from "../users/user.service";
import { Order } from "../../models/Order";
import { IPayment, IPaymentCallback } from "./payment.types";
import { User } from "../../models/User";

export class PaymentService {
  async doPayment(paymentData: IPayment) {
    const linkToProdamus = config.payment.PRODAMUS_URL;
    let _param_type = "sale";
    let user = await User.findOne({
      vk_user_id: paymentData.vk_user_id,
    }).lean();
    if (user === null) {
      _param_type = "sale_first";
    } else {
      if (user.is_active === false) {
        _param_type = "sale";
      }
      if (user.is_active === true) {
        _param_type = "prolong";
      }
    }
    let demo_mode: number = 0;

    if (typeof +paymentData.phoneNumber !== "number") {
      paymentData.phoneNumber = +(
        "7000" + Math.round(Math.random() * 100000000)
      );
    } else {
      let delta = paymentData.phoneNumber.toString().length - 12;
      if (delta < 0) {
        let additionalDigits = Math.round(
          Math.random() * 10 ** Math.abs(delta)
        );
        let updated_phone_number = +(
          paymentData.phoneNumber.toString() + additionalDigits.toString()
        );
        paymentData.phoneNumber = updated_phone_number;
      }
    }
    let payment_user_id: number | undefined;
    let _param_ok_user_id = 0;
    if (paymentData.vk_user_id) {
      payment_user_id = paymentData.vk_user_id;
    } else {
      payment_user_id = paymentData.ok_user_id;
      _param_ok_user_id = paymentData.ok_user_id!;
    }
    let data: any = {
      customer_phone: paymentData.phoneNumber,
      // demo_mode: demo_mode,
      demo_mode: demo_mode,
      products: [
        {
          price: paymentData.totalPrice,
          name: "Оплата доступа к компьютерному программному обеспечению",
          quantity: 1,
        },
      ],
      vk_user_id: payment_user_id,
      _param_month: paymentData._param_month,
      _param_ok_user_id: _param_ok_user_id,
      _param_first_name: paymentData._param_first_name,
      _param_last_name: paymentData._param_last_name,
      _param_tariff_title: paymentData._param_tariff_title,
      _param_tariff_is_chat_approved:
        paymentData._param_tariff_is_chat_approved,
      urlSuccess: "",
      do: "link",
    };

    data.signature = Hmac.create(data, config.payment.PRODAMUS_SECRET_KEY);
    let queryString = QueryBuilder.http_build_query(data);
    const link = `${linkToProdamus}?${queryString}`;
    console.log("hash", Hmac.create(data, config.payment.PRODAMUS_SECRET_KEY));

    try {
      const res = await axios.get(link);
      const paymentLink = await res.data;
      console.log(link);
      console.log("paymentLink", paymentLink);
      return paymentLink;
    } catch (error) {
      return console.log("Сервис онлайн платежей недоступен");
    }
  }

  async addNewOrderToDB(callbackPaymentData: any) {
    const order = await Order.findOne({
      prodamus_order_id: callbackPaymentData.order_id,
    });
    if (order !== null) {
      return;
    }
    ////////
    const new_order = new Order({
      prodamus_order_id: callbackPaymentData.order_id,
    });
  }

  async confirmPayment(body: IPaymentCallback) {}
}
