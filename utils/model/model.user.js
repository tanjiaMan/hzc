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
	
	async searchUser(data){
		let url = config.api + '/h5/user/search-user';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async followUserId(followUserId){
		let url = config.api + '/h5/user/follow?followUserId='+followUserId;
		let result = await request.get(url,{});
		return result;
	},
	
	async cancelFollowUserId(followUserId){
		let url = config.api + '/h5/user/cancel-follow?followUserId='+followUserId;
		let result = await request.get(url,{});
		return result;
	},
	
	async pageFollow(data){
		let url = config.api + '/h5/user/page-my-follow';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async pageFans(data){
		let url = config.api + '/h5/user/page-my-fans';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	//签到
	async signToday(){
		let url = config.api + '/h5/user/sign';
		let result = await request.get(url,{});
		return result;
	},
	
	//店铺申请
	async applyShop(data){
		let url = config.api + '/h5/user/apply-shop';
		let result = await request.post(url,data,{});
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
	},
	
	async getAmountSts(data){
		let url = config.api + '/h5/user/account-flow-sts';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async transAmount(data){ //转账
		let url = config.api + '/h5/user/balance-transfer';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async pageTransLog(data){ //转账记录
		let url = config.api + '/h5/user/balance-transfer-log';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getTransLog(type){ // 获取转货记录人员
		let url = config.api + '/h5/user/transfer-log?type=' + type;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async widthdraw(amount){ //提现
		let url = config.api + '/h5/user/withdraw?amount=' + amount;
		let result = await request.post(url,{},{});
		return result;
	},
	
	async widthdrawLog(status){ //提现记录
		let url = config.api + '/h5/user/withdraw-log?status='+status;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	//消息
	async getUserMsg(msgType,pageIndex,pageSize){
		let url = config.api + '/h5/user/user-msg?msgType='+msgType+'&pageIndex='+pageIndex+'&pageSize='+pageSize;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async readMsg(data){
		let url = config.api + '/h5/user/read-msg';
		let result = await request.post(url ,data ,{});
		return result;
	},
	
	//统计报表
	async getSts(){ //提现记录
		let url = config.api + '/h5/user/sts-page';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getStsProduct(query){
		let url = config.api + '/h5/user/sts-product-sale';
		let result = await request.post(url ,query ,{});
		return result && result.data;
	},
	
	//密码
	async setPwd(pwd,mobile,verifyCode){
		let url = config.api + `/h5/user/set-bank-pwd?pwd=${pwd}&mobile=${mobile}&verifyCode=${verifyCode}`;
		let result = await request.get(url ,{});
		return result;
	},
	
	async ckPwd(pwd){
		let url = config.api + '/h5/user/check-bank-pwd?pwd='+pwd;
		let result = await request.post(url ,{} ,{});
		return result && result.data;
	},
	
	async addSuggestion(data){
		let url = config.api + '/h5/user/add-suggestion';
		let result = await request.post(url ,data ,{});
		return result;
	},
}