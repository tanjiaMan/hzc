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
	},
	
	async ckToken(token){
		let url = config.api + '/h5/auth/user/check-token?token='+token;
		let result = await request.get(url,{});
		return result;
	},
	
	//获取用户详情
	async getUser(){
		let url = config.api + '/h5/user/detail';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getFullUser(){
		let url = config.api + '/h5/user/full-info';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	//签到
	async signToday(){
		let url = config.api + '/h5/user/sign';
		let result = await request.get(url,{});
		return result;
	},
	
	//用户资金情况
	async getAmount(){
		let url = config.api + '/h5/user/account';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getAmountFlow(data){
		let url = config.api + '/h5/user/account-flow';
		let result = await request.post(url,data,{});
		return result && result.data;
	}
}