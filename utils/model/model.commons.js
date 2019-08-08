import config from '../Config.js';
import request from '../Request.js';
import store from '../../store'

export default{
	
	async getOssConfig(data){
		let url = config.api + '/h5/config/getQiniuToken';
		let userInfo = store.state.userInfo;
		data['userId'] = userInfo.id;
		let result = request.post(url,data,{});
		return result;
	}
}