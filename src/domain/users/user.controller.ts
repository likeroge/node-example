import { Request, Response } from "express";
import axios from "axios";
import { config } from "../../../config/config";
import { OK } from "../../utils/OK";
import { User } from "../../models/User";

export class UserController {
  async getUserInfo(req: Request, res: Response) {
    // return res.status(200).send({})
    const { vk_user_id, ok_user_id } = req.query;

    console.log("user_id", vk_user_id, ok_user_id);

    const user_vk = await User.findOne({ vk_user_id: vk_user_id }).lean();
    const user_ok = await User.findOne({ ok_user_id: ok_user_id }).lean();

    console.log(user_vk, user_ok);

    if (user_vk === null && user_ok === null) {
      return res.status(400).json({});
    }
    const user = user_vk !== null ? user_vk : user_ok;
    res.status(200).json({ ...user });
  }
}
