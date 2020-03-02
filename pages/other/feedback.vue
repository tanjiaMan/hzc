<template>
	<view class="container">
		<view class="d_content">
			<view class="tit1">请详细描述您的投诉/建议</view>
			<view>
				<textarea v-model="data.content" class="textareaclas" placeholder="请输入内容" placeholder-class="placeholderClass" />
			</view>
			<view class="d_input">
				<view class="d_name">您的姓名</view>
				<view class="d_input1"><input v-model="data.contact" class="uni-input" placeholder-class="placeholderClass1" placeholder="请输入您的真实姓名" /></view>
			</view>
			<!-- <view class="d_input">
				<view class="d_name">手机号码</view>
				<view class="d_input1"><input v-model='mobile' class="uni-input" type="number" placeholder-class="placeholderClass1" placeholder="请输入您的手机号码" /></view>
			</view>
			<view class="d_input">
				<view class="d_name">验证码</view>
				<view class="d_input1"><input class="uni-input" type="number" placeholder-class="placeholderClass1" placeholder="请输入验证码" /></view>
				<view :class="sendSmsdisabled?'bt_verify dis':'bt_verify'" @click="send">{{content}}</view>
			</view> -->
		</view>
		
		<view class="bt_submit" @click="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				verifycode: '',
				
				//验证码业务倒计时
				sendSmsdisabled: false,
				totalTime: 60,
				content: '获取验证码',
				
				data:{
					content: null,
					contact: null,
				}
			}
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
				console.log('给手机号发送验证码：',this.mobile);
				this.countDown();
			},
			submit(){
				this.$request.ModelUser.addSuggestion(this.data).then(res => {
					this.$api.msg('提交成功');
					this.data = {
						content: null,
						contact: null,
					};
				})
			}
		}
	}
</script>

<style lang='scss'>
	.container{
		background-color: #FFFFFF;
		height: 100vh;
	}
	
	.placeholderClass{
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(191,191,191,1);
	}
	
	.d_content{
		padding: 40rpx;
	}
	
	.tit1{
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(0,0,0,1);
	}
	
	.textareaclas{
		padding: 20rpx;
		width:661rpx;
		height:344rpx;
		background:rgba(255,255,255,1);
		border:1px solid rgba(220,220,220,1);
		border-radius:10rpx;
		margin-top: 31rpx;
	}
	
	.d_input{
		display: flex;
		margin-top: 20rpx;
		align-items: center;
		
		.d_name{
			width: 160rpx;
			font-size:28rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		.d_input1{
			flex: 1;
		}
		
		.uni-input{
			height: 71rpx;
			line-height: 71rpx;
			border-radius: 10rpx;
			border: 1px solid #DCDCDC;
		}
		
		.placeholderClass1{
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(191,191,191,1);
			height: 71rpx;
			line-height: 71rpx;
		}
		
		.bt_verify{
			height: 71rpx;
			line-height: 71rpx;
			border-radius: 10rpx;
			background-color: #00A390;
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			margin-left: 20rpx;
			padding: 0 20rpx;
		}
		
		.dis{
			background-color: #bbbbbd !important;
		}
	}

	.bt_submit{
		width:706rpx;
		height:106rpx;
		line-height:106rpx;
		background:rgba(255,75,56,1);
		border-radius:10rpx;
		text-align: center;
		font-size:35rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		margin: 20rpx auto;
	}
</style>