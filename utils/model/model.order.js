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
		return result;
	},
	
	async delShopCar(ids){
		let url = config.api + '/h5/oper/remove-by-ids?ids='+ids;
		let result = await request.post(url,{},{});
		return result;
	}
	
	//订单
	
}