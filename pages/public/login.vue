<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<!-- <view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="mobile" 
						value="" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view> -->
			<button v-if="needLogin == true" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
			<button v-if="needGetMobile == true" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意绑定手机号码</button>
			<button type="primary" open-type="contact" @contact="handleContact">微信客服</button>
			<!-- <button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button> -->
		</view>
		<!-- <view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view> -->
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false,
				
				//微信登陆
				wxCode: null,
				userInfo:{},
				needLogin:true,
				needGetMobile:false,
			}
		},
		onLoad(){
			// 获取微信code 并且请求链接
			var that = this;
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				that.wxCode = loginRes.code;
			  }
			});
		},
		methods: {
			...mapMutations(['login','setToken']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			async toLogin(){
				this.logining = true;
				
				const {mobile, password} = this;
				/* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
				const sendData = {
					mobile,
					password
				};
				const result = await this.$api.json('userInfo');
				if(result.status === 1){
					this.login(result.data);
                    uni.navigateBack();  
				}else{
					this.$api.msg(result.msg);
					this.logining = false;
				}
			},
			handleContact(e){
				console.log(e.path)
				console.log(e.query)
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
				let userInfo = res.userInfo
				let value = {code: this.wxCode,encryptedData: res.encryptedData,iv: res.iv};
				let result = await this.$request.ModelUser.login(value);
				if(result.code == 'ok' && result.data){
					this.needLogin = false;
					let data = result.data;
					let userInfoVo = {
						id: data.userId,
						mobile: data.mobile,
						nickname: userInfo.nickName,
						portrait: userInfo.avatarUrl,
						token: data.token
					};
					this.userInfo = userInfoVo;
					this.setToken(data.token);
					if(data.mobile && data.mobile != '' ){
						this.login(userInfoVo);
						uni.navigateBack();  
					}else{
						this.needGetMobile = true;
					}
				}else{
					this.needLogin = true;
					this.$api.msg(result.msg);
					this.logining = false;
				}
			}
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
</style>
