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
	
	async getMediaCategoryByPid(pid){
		let url = config.api + '/h5/index/media-classifys?mediaType=' + pid;
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
	
	async getGoodsDetail(id,source){
		let url = config.api + '/h5/product/detail?id='+id;
		if(source != null && source != ''){
			url = url + '&source=' + source;
		}
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
	
	//agent
	async pageAgentProduct(data){
		let url = config.api + '/h5/agent/page-agent-product';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async pageAgentStock(data){
		let url = config.api + '/h5/agent/page-agent-stock';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getAgentProduct(productId){
		let productIds = [];productIds.push(productId);
		let url = config.api + '/h5/agent/agent-product-detail';
		let result = await request.post(url,JSON.stringify(productIds),{});
		return result && result.data;
	},
	
	async getAgentProductByIds(data){
		let url = config.api + '/h5/agent/agent-product-detail';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async purchaseStock(data){
		let url = config.api + '/h5/agent/purchase-stock';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async purchaseStockBatch(data){
		let url = config.api + '/h5/agent/purchase-stock-batch';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async pageReceipt(data){
		let url = config.api + '/h5/agent/page-receipt';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async receipt(data){
		let url = config.api + '/h5/agent/receipt';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async transStock(data){//转货
		let url = config.api + '/h5/agent/transfer-stock-batch';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async withdrawStock(data){//退货
		let url = config.api + '/h5/agent/withdraw-stock-batch';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async getTransStockLog(data){//转货记录
		let url = config.api + '/h5/agent/transfer-stock-log';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async transStock(id){//转入库存
		let url = config.api + '/h5/agent/shift-order-stock?orderId=' + id;
		let result = await request.get(url,{});
		return result;
	},
	
	//团队
	async pageAgentTeam(data){
		let url = config.api + '/h5/agent/agent-team';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getAgentInfo(userId){
		let url = config.api + '/h5/agent/agent-info?userId=' + userId;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	//文章
	async getArticeList(classifyId){
		let url = config.api + '/h5/index/artice/list?classifyId='+classifyId;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async pageArtice(data){
		let url = config.api + '/h5/index/media/page';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getArticeInfo(id){
		let url = config.api + '/h5/index/media/detail?mediaId=' + id;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	//优惠活动
	async getCouponRedPackage(type,status){
		let url = config.api + '/h5/act/discounts/my-coupons?type=' + type + '&status=' + status;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async infoCouponRedPackage(couponId){
		let url = config.api + '/h5/act/discounts/info?couponId=' + couponId;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async transCouponRedPackage(data){
		let url = config.api + '/h5/act/transfer-coupon';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async logCouponRedPackage(data){
		let url = config.api + '/h5/act/transfer-coupon-log';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
}