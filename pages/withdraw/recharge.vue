<template>
	<view class="container">
		<view class="uni-flex uni-row" style="width: 100%;">
			<view class="flex-item titmy">
				充值金额
			</view>
		</view>
		<view class="uni-flex uni-row d_1">
			<view class="flex-item d_2">
				<img class="img1" src="https://pic.youx365.com/withdraw_logo.png" />
			</view>
			<view class="flex-item d_3">
				<input value="" class="input" type="number" placeholder="请输入充值金额" placeholder-style="color:#CACACA;font-size:13px;" />
			</view>
			<view class="flex-item d_4">
				元
			</view>
		</view>
		
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<img src="https://pic.youx365.com/wx-pay.png" />
				<view class="con">
					<text class="tit">微信支付</text>
					<text>亿万用户的选择，更快更安全</text>
				</view>
				<view
					class="yticon icon-xuanzhong2 checkbox"
					:class="payType == 1? 'checked':''"
				></view>
			</view>
			<!-- <view class="type-item" @click="changePayType(3)">
				<img src="https://pic.youx365.com/pay-yue.png" />
				<view class="con">
					<text class="tit">余额支付（¥198.5）</text>
				</view>
				<view
					class="yticon icon-xuanzhong2 checkbox"
					:class="payType == 3? 'checked':''"
				></view>
			</view> -->
		</view>
		
		<view class="bt1">
			立即充值
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				payType: 1,
			};
		},
		methods:{
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	
	.container{
		width: 700rpx;
		height: 941rpx;
		margin: 51rpx auto 0;
		background-color: #FFFFFF;
		
		.titmy{
			width: 50%;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height: 70rpx;
			padding-left: 44rpx;
		}
		
		.tit1{
			width: 50%;
			text-align: right;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:#00A390;
			line-height: 70rpx;
			padding-right: 45rpx;
		}
		
		.d_1{
			width: 624rpx;
			margin: 0 auto;
			border-bottom: 1px solid #DCDCDC;
			height: 118rpx;
			line-height: 118rpx;
		}
		
		.d_2{
			vertical-align: middle;
			width: 100rpx;
			line-height: 118rpx;
			height: 118rpx;
			
			.img1{
				width: 46rpx;
				height: 46rpx;
				vertical-align: middle;
			}
		}
		
		.d_3{
			vertical-align: middle;
			width: 424rpx;
			line-height: 118rpx;
			height: 118rpx;
			
			.input{
				line-height: 118rpx;
				height: 118rpx;
			}
		}
		
		.d_4{
			text-align: center;
			width: 100rpx;
			line-height: 118rpx;
			height: 118rpx;
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		.tit2{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
			margin-top: 73rpx;
			margin-left: 38rpx;
		}
		
		.tit3{
			padding: 38rpx;
			font-size:22rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(144,144,144,1);
			line-height:48rpx;
		}
		
		.bt1{
			width: 656rpx;
			height: 108rpx;
			line-height: 100rpx;
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			background-image: url('https://pic.youx365.com/withdraw_bt.png');
			background-size: cover;
			text-align: center;
			margin: 140rpx auto 20rpx;
		}
		
		.bt2{
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,102,102,1);
			width: 656rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			margin: 0 auto;
		}
	}
	
	.pay-type-list {
		background-color: #fff;
		padding-left: 30rpx;
		margin-top: 104rpx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			position:relative;
			font-size:32rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			
			img{
				height: 56rpx;
				width: 64rpx;
				margin-right: 33rpx;
			}
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size:20rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(130,130,130,1);
		}
		
		.checkbox{
			font-size: 56rpx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
			height: 100%;
		}
		.checkbox.checked{
			color: #00A390;
		}
	}
</style>
