import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		token:null,
		//菜单缓存
		firstMenu:[]
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            });
			uni.removeStorage({  
			    key: 'token'  
			})
		},
		setToken(state, provider){
			state.token = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: provider  
			}) 
		},
		setFirstMenu(state, provider){
			state.firstMenu = provider;
		}
	},
	actions: {
	
	}
})

export default store
