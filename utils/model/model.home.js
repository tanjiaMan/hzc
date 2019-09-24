import config from '../Config.js';
import request from '../Request.js';

export default{
	
	async getCategoryByPid(pid){
		let url = config.api + '/h5/index/goods/category/all?pid=' + pid;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getSeckill(data){
		let url = config.api + '/h5/index/goods/seckill';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getGroupBuy(data){
		let url = config.api + '/h5/index/goods/groupbuy';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getGoodsList(data){
		let url = config.api + '/h5/index/goods/list';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getGoodsDetail(id){
		let url = config.api + '/h5/product/detail?id='+id;
		let result = await request.get(url,{});
		return result && result.data;
	}
}