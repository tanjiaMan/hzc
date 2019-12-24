import config from '../Config.js';
import request from '../Request.js';

export default{
	
	//购物车
	async addShopCar(data){
		let url = config.api + '/h5/oper/add-shop-car';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async getShopCar(){
		let url = config.api + '/h5/oper/get-shop-car-info';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async delShopCar(data){
		let url = config.api + '/h5/oper/remove-by-ids';
		let result = await request.post(url,data,{});
		return result;
	},
	
	//收货地址
	async addOrUpdateAddress(data){
		let url = config.api + '/h5/user/shopping-address/addOrUpdate';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async delAddress(id){
		let url = config.api + '/h5/user/shopping-address/delete?id='+id;
		let result = await request.post(url,{},{});
		return result;
	},
	
	async infoAddress(id){
		let url = config.api + '/h5/user/shopping-address/detail?id='+id;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async listAddress(){
		let url = config.api + '/h5/user/shopping-address/list?pageIndex=1&pageSize=20';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async defaultAddress(){
		let url = config.api + '/h5/user/shopping-address/my';
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async getLogistics(orderDetailId){
		let url = config.api + '/h5/oper/logistics?orderDetailId='+orderDetailId;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	//评论
	async comment(data){
		let url = config.api + '/h5/oper/post-product-eval';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async listComment(data){
		let url = config.api + '/h5/oper/evaluation';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	//售后
	async applySale(data){
		let url = config.api + '/h5/oper/apply-post-sale';
		let result = await request.post(url,data,{});
		return result;
	},
	
	//订单
	async getOrderCaculate(data){ // 计算订单信息
		let url = config.api + '/h5/order/order-template';
		let result = await request.post(url,data,{});
		return result;
	},
	
	async createOrder(data){ //创建订单
		let url = config.api + '/h5/order/create';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async infoOder(ordernum){ //订单详情
		let url = config.api + `/h5/order/detail?orderNum=${ordernum}`;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async infoOrderTemp(ordernum){ //订单详情
		let url = config.api + `/h5/order/detail-template?orderNum=${ordernum}`;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async infoOrderPD(orderDetailId){ //订单详情
		let url = config.api + `/h5/order/detail-pd-template?orderDetailId=${orderDetailId}`;
		let result = await request.get(url,{});
		return result && result.data;
	},
	
	async confirmOrder(orderDetailId){ //取消订单
		let url = config.api + `/h5/order/confirm?orderDetailId=${orderDetailId}`;
		let result = await request.post(url,{},{});
		return result;
	},
	
	async cancelOrder(ordernum){ //取消订单
		let url = config.api + `/h5/order/close?orderNum=${ordernum}`;
		let result = await request.post(url,{},{});
		return result;
	},
	
	async listOrder(data){ //订单列表
		let url = config.api + `/h5/order/page-template`;
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	async getOrderCoupons(data){ //优惠券列表
		let url = config.api + '/h5/order/coupons-can-use';
		let result = await request.post(url,data,{});
		return result && result.data;
	},
	
	//支付相关
	async getPayInfo(ordernum){ //预支付
		let url = config.api + '/h5/pay/wxapp?orderNum=' + ordernum;
		let result = await request.post(url,{},{});
		return result;
	},
	
	// 现金券支付
	async payBalance(ordernum){
		let url = config.api + '/h5/pay/balance-pay?orderNum=' + ordernum;
		let result = await request.post(url,{},{});
		return result;
	},
	
	//微信支付入金
	async wxDeposit(amount){ //预支付
		let url = config.api + '/h5/pay/wx-deposit?amount=' + amount;
		let result = await request.post(url,{},{});
		return result;
	},
}