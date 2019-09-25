import config from '../Config.js';
import request from '../Request.js';

export default{
	
	async getCategoryAll(pid){
		let url = config.api + '/h5/index/goods/category/all';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getCategoryByPid(pid){
		let url = config.api + '/h5/index/goods/category/get?pid=' + pid;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getBanner(classfyId){
		let url = config.api + '/h5/index/banner/list?classifyId='+classfyId;
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