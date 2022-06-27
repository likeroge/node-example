import {Schema, model} from "mongoose";

interface IUser {
    vk_user_id: number
    ok_user_id: number
    tariff: string
    days_remain:number
    first_name?:string
    last_name?:string
    is_active:boolean
    is_chat_approved:boolean
}

const userSchema = new Schema<IUser>({
    vk_user_id: { type: Number },
    ok_user_id: { type: Number },
    tariff: {type:String,default:''},
    days_remain:{type:Number, default:0},
    first_name:{type:String, default:''},
    last_name:{type:String, default:''},
    is_active:{type:Boolean, default:false},
    is_chat_approved:{type:Boolean, default:false}
});

export const User = model<IUser>('User', userSchema);