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
	
}