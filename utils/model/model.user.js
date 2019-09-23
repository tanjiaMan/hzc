import config from '../Config.js';
import request from '../Request.js';

export default{
	
	async login(data){
		let url = config.api + '/h5/auth/user/wxapp/signIn';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async bindmobile(data){
		let url = config.api + '/h5/user/bindMobile';
		let result = await request.post(url,data,{});
		return result;
	}
}