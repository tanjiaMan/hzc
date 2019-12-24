<template>
	<view class="container">
		<view class="d_item">
			<view class="d_left">已验证手机</view>
			<view class="d_right" v-if="userInfo.mobile">{{userInfo.mobile.substr(0,3) + "****" + userInfo.mobile.substr(7)}}</view>
		</view>
		<view class="d_item">
			<view class="d_left">短信验证码</view>
			<view class="d_right">
				<input v-model="verifycode" type="number" placeholder="请输入短信验证码" placeholder-class="placeholderClass" />
			</view>
			<view class="sendbt" @click="send" v-if="sendSmsdisabled == false">
				{{content}}
			</view>
			<view class="sendbtds" v-else>
				{{content}}
			</view>
		</view>
		<view class="d_bt" @click="next">
			下一步
		</view>
	</view>
</template>

<script>
	 import {mapState} from 'vuex';  
	
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				verifycode: '',
				sendSmsdisabled: false,
				
				//验证码业务倒计时
				totalTime: 60,
				content: '获取验证码',
			}
		},
		watch:{
			
		},
		methods: {
			countDown() {
				this.sendSmsdisabled = true;
				this.content = this.totalTime + 's后重新发送';
				let clock = setInterval(() => {
				  this.totalTime--;
				  this.content = this.totalTime + 's后重新发送';
				  if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
				    clearInterval(clock)
				    this.content = '重新发送验证码'
				    this.totalTime = 60;
				    this.sendSmsdisabled = false;
				  }
				},1000)
			},
			send(){
				console.log('给手机号发送验证码：',this.userInfo.mobile);
				this.countDown();
			},
			async next(){
				//验证码确认
				if(this.verifycode == null || this.verifycode == ''){
					this.$api.msg('请输入验证码');
					return;
				}
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #FFFFFF !important;
	}
	
	.d_item{
		display: flex;
		align-items: center;
		padding: 40rpx;
		border-bottom: solid 1px #E5E5E5;
	}
	.d_left{
		width: 200rpx;
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		text-align: center;
	}
	
	.d_right{
		flex: 1;
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		
		.placeholderClass{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(204,204,204,1);
		}
	}
	
	.sendbt{
		height:59rpx;
		line-height:59rpx;
		border:1px solid rgba(0,0,0,1);
		border-radius:4px;
		font-size:22rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(0,0,0,1);
		text-align: center;
		padding: 0 20rpx;
	}
	
	.sendbtds{
		height:59rpx;
		line-height:59rpx;
		border-radius:4px;
		font-size:22rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:#FFFFFF;
		text-align: center;
		padding: 0 20rpx;
		background-color: #bbbbbd;
	}
	
	.d_bt{
		width:608rpx;
		height:68rpx;
		line-height:68rpx;
		background:rgba(0,163,144,1);
		border-radius:4px;
		text-align: center;
		font-size:30rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(254,254,254,1);
		margin: 100rpx auto;
	}
</style>
