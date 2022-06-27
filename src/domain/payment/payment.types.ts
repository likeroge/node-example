export interface IPayment{
    phoneNumber:number
    vk_user_id?:number
    ok_user_id?:number
    totalPrice:number
    first_name?:string
    last_name?:string
    _param_month:number
    _param_first_name?:string
    _param_last_name?:string
    _param_type?: string
    _param_tariff_title?:string
    _param_tariff_is_chat_approved?:string
}

export interface IPaymentCallback {
    order_id:string
    sum:string
    customer_phone:string
    vk_user_id:string
    _param_first_name:string
    _param_last_name:string
    _param_project:string
    _param_tariff_title:string
    _param_type: string
    _param_ok_user_id:string
    _param_tariff_is_chat_approved:string
    payment_status:string
    date:string
    _param_month:string
}