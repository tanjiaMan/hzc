import config from '../Config.js';
import request from '../Request.js';

export default{
	//分类
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
	
	//首页
	async getConfig(classfyId){
		let url = config.api + '/h5/index/config-facade?classifyId='+classfyId;
		let result = await request.get(url,{silence: true});
		return result && result.data;
	},
	
	async getBanner(classfyId){
		let url = config.api + '/h5/index/banner/list?classifyId='+classfyId;
		let result = await request.get(url,{silence: true});
		return result && result.data;
	},
	
	async getSeckill(data){
		let url = config.api + '/h5/index/goods/seckill';
		let result = await request.post(url,data,{silence: true});
		return result && result.data;
	},
	
	async getGroupBuy(data){
		let url = config.api + '/h5/index/goods/groupbuy';
		let result = await request.post(url,data,{silence: true});
		return result && result.data;
	},
	
	async getBargin(data){
		let url = config.api + '/h5/index/goods/bargain';
		let result = await request.post(url,data,{silence: true});
		return result && result.data;
	},
	
	//商品相关
	async getGoodsList(data){
		let url = config.api + '/h5/index/goods/list';
		let result = await request.post(url,data,{silence: true});
		return result && result.data;
	},
	
	async getGoodsDetail(id){
		let url = config.api + '/h5/product/detail?id='+id;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getGoodsSpecificat(id){ //获取某个商品的规格列表
		let url = config.api + '/h5/product/specification?productId='+id;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getGoodsSellSpecificat(id){ //获取某个商品的规格库存信息
		let url = config.api + '/h5/product/specification-list?productId='+id;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getGoodsRecommend(){ //获取推荐商品
		let url = config.api + '/h5/index/goods/recommend';
		let result = await request.post(url,{},{});
		return result && result.data;
	},
}