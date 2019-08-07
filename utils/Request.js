import store from '../store'
import config from './Config.js';

const requestPost = (url, data, opt) => {
	if(opt.silence != true){
		uni.showLoading({
			title: '加载中'
		});
	}
	let token = store.state.token;
	let header = {
		'shopId': config.shopId,
		'content-type': 'application/json',
		'accept': 'application/json',
	};
	if(token != null){
		header['token'] = token.toString();
	}
	
	return new Promise(resolve => {
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			data: data,
			method: 'POST',
			header: header,
			success: (res) => {
				uni.hideLoading();
				resolve(res.data);
			},
			fail: (res) => {
				uni.hideLoading();
				resolve(res);
			},
		});
	});
};

export default {
	requestPost,
}
