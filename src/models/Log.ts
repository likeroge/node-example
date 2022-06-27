import { Schema, model } from "mongoose";

interface ILog {
    title: string
    msg:string
    raw: string
    vk_user_id:number
    date:Date
    type:string
}
const LogSchema = new Schema<ILog>({
    title: { type: String },
    msg: { type: String },
    raw:{type: String},
    vk_user_id:{type:Number},
    date: {type: Date},
    type: { type: String }, // or type: Number
});

export const Log = model<ILog>('Log', LogSchema);

