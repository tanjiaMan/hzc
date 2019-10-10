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
	
	//订单
	async getOrderCaculate(data){ // 计算订单信息
		let url = config.api + '/h5/order/order-template';
		let result = await request.post(url,data,{});
		return result && result.data;
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
	
	async cancelOrder(ordernum){ //取消订单
		let url = config.api + `/h5/order/close?orderNum=${ordernum}`;
		let result = await request.post(url,{},{});
		return result;
	},
	
	async listOrder(data){ //订单列表
		let url = config.api + `/h5/order/page`;
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
}