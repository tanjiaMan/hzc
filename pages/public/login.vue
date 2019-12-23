<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				社集优选欢迎您！
			</view>
			<button v-if="state == 1" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">点击微信授权登陆</button>
			<button v-if="state == 1" type="warn" style="margin-top: 10px;" @click="cancel">取消登陆</button>
			<button v-if="state == 2" type="warn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意绑定手机号码</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex';
	
	export default{
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data(){
			return {
				state: 1,//1:没登陆，2:没绑定手机号, 3:已登陆
				cacelLogin: false,
				wxCode: null,//授权code
			}
		},
		async onLoad(){
			if(this.hasLogin){
				if(this.userInfo.firstToken && this.userInfo.firstToken == true){
					//校验token
					let ck = await this.$request.ModelUser.ckToken(this.userInfo.token);
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
			if(this.userInfo.id){
				this.state = 2;
			}else{
				this.state = 1;
			}
		},
		methods: {
			...mapMutations(['login','setToken']),
			navBack(){
				uni.navigateBack();
			},
			cancel(){
				uni.navigateBack();
			},
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
						uni.navigateBack();  
					}else{
						this.$api.msg(result.msg);
						this.logining = false;
					}
				});
			},
			async loginRequest(res){
				var that = this;
				wx.getUserInfo({
				  success: function(wxRes) {
				    console.log('wxRes',wxRes);
					
					let userInfo = res.userInfo;
					let inviteUserId = uni.getStorageSync('inviteUserId');
					let value = {encryptedData: wxRes.encryptedData,iv: wxRes.iv,code: that.wxCode,nickName: userInfo.nickName,avatarUrl: userInfo.avatarUrl,inviteUserId: inviteUserId};
					if(inviteUserId && inviteUserId != 'undefined'){
						value['inviteUserId'] = inviteUserId;
					}
					
					that.$request.ModelUser.login(value).then(result => {
						if(result.code == 'ok' && result.data){
							let data = result.data;
							let userInfoVo = {
								id: data.userId,
								mobile: data.mobile,
								nickname: userInfo.nickName,
								portrait: userInfo.avatarUrl,
								token: data.token,
								userType: data.userType
							};
							that.setToken(data.token);
							that.login(userInfoVo);
							if(data.mobile && data.mobile != '' ){
								uni.navigateBack();  
							}else{
								that.state = 2;
							}
						}else{
							that.$api.msg(result.msg);
						}
					});
				  }
				})
			},
		},
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
	uni-button{
		width: 80%;
	}
	
	button{
		width: 80%;
	}
</style>
