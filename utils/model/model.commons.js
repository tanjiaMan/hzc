import config from '../Config.js';
import request from '../Request.js';
import store from '../../store'

export default{
	
	async getOssConfig(data){
		let url = config.api + '/h5/config/getQiniuToken';
		let userInfo = store.state.userInfo;
		data['userId'] = userInfo.id;
		let result = await request.post(url,data,{});
		return result;
	},
	
	async getDoc(type){
		let url = config.api + '/h5/config/doc?type='+type;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async sendVerify(mobile,type){
		let url = config.api + '/h5/common/send-verifycode?mobile='+mobile+'&type='+type;
		let result = await request.get(url,{});
		return result;
	}
}