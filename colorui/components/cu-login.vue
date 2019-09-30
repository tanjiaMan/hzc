<template>
	<view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view>
				<button v-if="state == 1" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">同意授权微信登陆</button>
				<button v-if="state == 2" type="warn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意绑定手机号</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	
	import {mapMutations,mapState} from 'vuex';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	
	export default {
		components: {
			uniPopup
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		props: {
			inviteUserId:null,
		},
		data() {
			return {
				state: 1,//1:没登陆，2:没绑定手机号, 3:已登陆
				wxCode: null,//授权code
			};
		},
		name: 'cu-login',
		async mounted() { //初始化信息
			if(this.hasLogin){
				if(this.userInfo.firstToken && this.userInfo.firstToken == true){
					//校验token
					let ck = await this.$request.ModelUser.ckToken(this.userInfo.token);
					console.log('ck token',ck);
					if(ck.code == 'ok' && ck.message == 'true'){
						this.userInfo.firstToken = false;
						this.login(this.userInfo);
						this.state = 3;
						return;
					}else{
						this.state = 1;
						return;
					}
				}else{
					this.state = 3;
					return;
				}
			}

			//没登陆
			var that = this;
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				that.wxCode = loginRes.code;
			  }
			});
			this.$refs['popup'].open();
			if(this.userInfo.id){
				this.state = 2;
			}else{
				this.state = 1;
			}
		},
		methods: {
			...mapMutations(['login','setToken']),
			bindGetUserInfo(e){
				let res = e.detail;
				if(res.errMsg != 'getUserInfo:ok'){
					return;
				}
				this.loginRequest(e.detail);
			},
			getPhoneNumber (e) {
				let res = e.detail;
				if(res.errMsg != 'getPhoneNumber:ok'){
					return;
				}
				let value = {encryptedData: res.encryptedData,iv: res.iv};
				this.$request.ModelUser.bindmobile(value).then(result => {
					if(result.code == 'ok' && result.data){
						let data = result.data;
						if(data.mobile == null || data.mobile == ''){
							this.$api.msg('获取手机号码异常，请重新授权登陆');
							return;
						}
						let userInfo = this.userInfo;
						userInfo['mobile'] = data.mobile;
						this.login(userInfo);
						this.$refs['popup'].close();
					}else{
						this.$api.msg(result.msg);
					}
				});
			},
			async loginRequest(res){
				let userInfo = res.userInfo
				let value = {code: this.wxCode,nickName: userInfo.nickName,avatarUrl: userInfo.avatarUrl,inviteUserId: this.inviteUserId};
				let result = await this.$request.ModelUser.login(value);
				if(result.code == 'ok' && result.data){
					let data = result.data;
					let userInfoVo = {
						id: data.userId,
						mobile: data.mobile,
						nickname: userInfo.nickName,
						portrait: userInfo.avatarUrl,
						token: data.token
					};
					this.setToken(data.token);
					this.login(userInfoVo);
					if(data.mobile && data.mobile != '' ){
						this.state = 3;
						this.$refs['popup'].close();
					}else{
						this.state = 2;
					}
				}else{
					this.$api.msg(result.msg);
				}
			}
		}
	}
</script>

<style>
	
</style>
