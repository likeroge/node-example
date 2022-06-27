import {config} from "../../config/config";
import axios from "axios";
import crypto from 'crypto'

export class OK {
    api_url = 'https://api.ok.ru/fb.do'

    async getCurrentUserInfo(access_token:string){
        const method = encodeURI('users.getCurrentUser')
         access_token = encodeURI(access_token)
        const application_key = encodeURI(config.passport.CLIENT_PUBLIC)
        let secret_key = crypto.createHash('md5').update(access_token + config.passport.CLIENT_SECRET).digest('hex')
        let sign_str = `application_key=${config.passport.CLIENT_PUBLIC}method=users.getCurrentUser${secret_key}`
        let sig = encodeURI(crypto.createHash('md5').update(sign_str).digest('hex'))
        const {data} = await axios.post(this.api_url, null, {params:{
                method, access_token,sig,application_key
            }})
        console.log(data)
        return data
    }
}