import {IPaymentCallback} from "../payment/payment.types";
import {Order} from "../../models/Order";

export class OrderService {
    async createNewOrder(body: IPaymentCallback) {
        const order = new Order()
        order.date = new Date()
        order.months_number = Number(body._param_month);
        order.order_type = body._param_type;
        order.price = Number(body.sum)
        order.prodamus_order_id = body.order_id
        order.vk_user_id = Number(body.vk_user_id)
        order.user_first_name = body._param_first_name
        order.user_last_name = body._param_last_name
        await order.save()
    }
}