import {Schema, model} from "mongoose";

interface ITariff {
    title: string
    is_chat_approved:boolean

}

const tariffSchema = new Schema<ITariff>({
    title: {type:String,default:''},
    is_chat_approved:{type:Boolean, default:false}
});

export const Tariff = model<ITariff>('Tariff', tariffSchema);