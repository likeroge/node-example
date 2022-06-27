import axios from "axios";

interface IResponse{
    data?:Object
}

export class VKapi {
    async sendMessageToUser(userId:number, text:string, token:string, attachment = "") {
        let response:IResponse = {};
        let vkApiSendMessageLink = "";
        let random = encodeURI(String(Date.now()));

        token = encodeURI(token);
        text = encodeURI(text);
        // let userId:string = encodeURI(vk_user_id);
        attachment = encodeURI(attachment);

        if (attachment !== "") {
            vkApiSendMessageLink = `https://api.vk.com/method/messages.send?user_id=${userId}&random_id=${random}&message=${text}&attachment=${attachment}&access_token=${token}&v=5.131`;
        } else {
            vkApiSendMessageLink = `https://api.vk.com/method/messages.send?user_id=${userId}&random_id=${random}&message=${text}&access_token=${token}&v=5.131`;
        }

        try {
            response = await axios.get(vkApiSendMessageLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response.data;
    }

    async getChatMembers(chat_id:number, token:string) {
        let response:IResponse = {};
        // let response = "";
        token = encodeURI(token);
        // const peer_id = encodeURI(chat_id);
        const peer_id = chat_id
        const vkApiGetConversationMembersLink = `https://api.vk.com/method/messages.getConversationMembers?peer_id=${peer_id}&access_token=${token}&v=5.131`;
        try {
            response = await axios.get(vkApiGetConversationMembersLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response.data;
    }

    // async sendMessageToChat(vk_user_id, chat_id, message, token){
    async sendMessageToChat( chat_id:number, message:string, token:string){

        let response:IResponse = {};
        let vkApiLink =''
        let random = encodeURI(String(Date.now()));
        // let userId = encodeURI(vk_user_id);
        message = encodeURI(message).replace(/#/,"%23").replace(/&/, '%26').replace(/@/, '%40');
        // chat_id = chat_id - 2000000000
        // chat_id = chat_id + 2000000000
        // chat_id = encodeURI(chat_id);
        token = encodeURI(token);

        // vkApiLink= `https://api.vk.com/method/messages.send?user_id=${userId}&chat_id=${chat_id}&random_id=${random}&message=${message}&access_token=${token}&v=5.131`;

        // vkApiLink= `https://api.vk.com/method/messages.send?chat_id=${chat_id}&random_id=${random}&message=${message}&access_token=${token}&v=5.131`;
        vkApiLink= `https://api.vk.com/method/messages.send?peer_id=${chat_id}&random_id=${random}&message=${message}&access_token=${token}&v=5.131`;

        try {
            response = await axios.get(vkApiLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response.data

    }

    async removeUserFromChat(chat_id:number, vk_user_id:number, token:string) {
        chat_id = chat_id - 2000000000
        let response:IResponse = {};
        token = encodeURI(token);
        // chat_id = encodeURI(chat_id);
        // vk_user_id = encodeURI(vk_user_id);
        const vkApiGetConversationMembersLink = `https://api.vk.com/method/messages.removeChatUser?chat_id=${chat_id}&user_id=${vk_user_id}&access_token=${token}&v=5.131`;
        try {
            response = await axios.get(vkApiGetConversationMembersLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response.data;
    }

    async sendMessageToManyUsers(usersIdArray:any, text:string, token:string, attachment = "") {
        let response:IResponse = {};
        let vkApiSendMessageLink = "";
        let random = encodeURI(String(Date.now()));
        token = encodeURI(token);
        text = encodeURI(text);
        usersIdArray = encodeURI(usersIdArray);
        attachment = encodeURI(attachment);

        if (attachment !== "") {
            vkApiSendMessageLink = `https://api.vk.com/method/messages.send?peer_ids=${usersIdArray}&random_id=${random}&message=${text}&attachment=${attachment}&access_token=${token}&v=5.131`;
        } else {
            vkApiSendMessageLink = `https://api.vk.com/method/messages.send?peer_ids=${usersIdArray}&random_id=${random}&message=${text}&access_token=${token}&v=5.131`;
        }

        try {
            response = await axios.get(vkApiSendMessageLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response.data;
    }

    async isUserWallClosed(vk_user_id:any, token:string ){
        let vkApiMethodLink = "";
        let response:IResponse = {}
        token = encodeURI(token);
        let user_ids = encodeURI(vk_user_id);
        vkApiMethodLink = `https://api.vk.com/method/users.get?user_ids=${user_ids}&access_token=${token}&v=5.131`;
        try {
            response = await axios.get(vkApiMethodLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response;
    }

    async addPostToWall(owner_id:any, wallpost:any, token:string){
        let response:IResponse = {};
        let vkApiAddPostLink = "";
        token = encodeURI(token);
        owner_id = encodeURI(owner_id);

        let message = encodeURI(wallpost.message).replace(/#/,"%23")
        let attachment = encodeURI(wallpost.attachments);

        vkApiAddPostLink = `https://api.vk.com/method/wall.post?owner_id=${owner_id}&from_group=1&message=${message}&attachment=${attachment}&access_token=${token}&v=5.131`;

        console.log(vkApiAddPostLink)

        // if (attachment !== "") {
        //     vkApiSendMessageLink = `https://api.vk.com/method/wall.post?user_id=${userId}&random_id=${random}&message=${text}&attachment=${attachment}&access_token=${token}&v=5.81`;
        // } else {
        //     vkApiSendMessageLink = `https://api.vk.com/method/wall.post?user_id=${userId}&random_id=${random}&message=${text}&access_token=${token}&v=5.81`;
        // }

        try {
            response = await axios.get(vkApiAddPostLink);
        } catch (err:any) {
            response = err.toString();
        }
        return response.data;
    }

}