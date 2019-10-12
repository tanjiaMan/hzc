<template>
	<view class="container">
		<view class="uni-flex uni-row" style="width: 100%;">
			<view class="flex-item titmy">
				可提现金额 <text style="color: #FF443F;">￥20000.00</text> 元
			</view>
			<view class="flex-item tit1">
				全部提现
			</view>
		</view>
		<view class="uni-flex uni-row d_1">
			<view class="flex-item d_2">
				<img class="img1" src="https://pic.youx365.com/withdraw_logo.png" />
			</view>
			<view class="flex-item d_3">
				<input value="" class="input" type="text" placeholder="请输入提现金额" placeholder-style="color:#CACACA;font-size:13px;" />
			</view>
			<view class="flex-item d_4">
				元
			</view>
		</view>
		<view class="tit2">
			提现须知：
		</view>
		<view class="tit3">
			本次提现金额将直接从账户余额扣除，提现的金额方式为微信零钱转账，提现申请成功后工作人员将会在1-7个工作日内进行审核操作，请耐心等待。
		</view>
		
		<view class="bt1">
			立即提现
		</view>
		<view class="bt2" @click="navTo('/pages/withdraw/record')">
			提现记录
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			};
		},
		methods:{
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}, 
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
			margin: 90rpx auto 20rpx;
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
</style>
