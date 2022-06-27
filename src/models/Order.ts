import {Schema, model} from "mongoose";

interface IOrder {
    prodamus_order_id: string
    months_number:number
    price: number
    vk_user_id:number
    ok_user_id:number
    user_first_name:string
    user_last_name:string
    order_type:string
    date: Date
}

const orderSchema = new Schema<IOrder>({
    prodamus_order_id: {type:String},
    months_number: { type: Number },
    price: { type: Number },
    vk_user_id:{type:Number},
    ok_user_id:{type:Number},
    user_first_name:{type:String},
    user_last_name:{type:String},
    order_type: {type: String},
    date: {type: Date},
});

export const Order = model<IOrder>('Order', orderSchema);