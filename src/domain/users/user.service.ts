import {User} from "../../models/User";
import {IPayment, IPaymentCallback} from "../payment/payment.types";

export class UserService {
    async updateUserState(body: IPaymentCallback) {
        const days = +body._param_month * 30

        //the same body.vk_user_id for both:
        const user_vk = await User.findOne({vk_user_id: body.vk_user_id})
        const user_ok = await User.findOne({ok_user_id: body.vk_user_id})
        if (user_vk === null && user_ok === null) {
            //new user
            const user_candidate = new User({
                first_name: body._param_first_name,
                last_name: body._param_last_name,
                tariff: body._param_tariff_title,
                is_active: true,
                days_remain: days
            })
            if (+body._param_ok_user_id !== 0) {
                user_candidate.ok_user_id = +body._param_ok_user_id
            } else {
                user_candidate.vk_user_id = +body.vk_user_id
            }

            try {
                await user_candidate.save()
                return true
            } catch (err) {
                return false
            }
        } else {
            //user already exist in DB
            let user = user_vk !== null ? user_vk : user_ok !
            user.tariff = body._param_tariff_title
            user.is_active = true
            user.days_remain = user.days_remain + days
            user.is_chat_approved = !!body._param_tariff_is_chat_approved
            try {
                await user.save()
                return true
            } catch (err) {
                return false
            }
        }
    }

    async testAddUserToDB(payment_data: IPayment) {
        const days_remain = payment_data._param_month * 30
        const user_in_DB = await User.findOne({vk_user_id: payment_data.vk_user_id})
        if (user_in_DB === null) {
            const user_candidate = new User({
                first_name: payment_data._param_first_name,
                last_name: payment_data._param_last_name,
                vk_user_id: payment_data.vk_user_id,
                tariff: payment_data._param_tariff_title,
                is_active: true,
                days_remain
            })
            await user_candidate.save()
            return false
        } else {
            return true
        }
    }
}