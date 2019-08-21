<template>
	<view class="content">
		<img class="showimg" src="https://pic.youx365.com/pay-success-show.png" />
		<text class="tit">订单成功支付 199.00元</text>
		<view class="tit1">
			<text>恭喜您获得</text>
			<text style="color: #FF443F !important;">1</text>
			<text>次抽奖机会</text>
		</view>
		
		<view class="btn-group">
			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="flex-item" style="width: 50%;">
					<navigator url="/pages/order/order?state=0" open-type="redirect" class="mix-btn">查看订单</navigator>
				</view>
				<view class="flex-item" style="width: 50%;">
					<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>		
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #fff !important;
		
	}
	
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.showimg{
		margin-top: 50rpx;
		height: 302rpx;
		width: 302rpx;
	}
	
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size:38rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(0,0,0,1);
		margin-top: 40rpx;
	}
	.tit1{
		font-size:26rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(152,152,152,1);
		margin-top: 28rpx;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 240rpx;
		height: 88rpx;
		font-size: $font-lg;
		color: #fff;
		border-radius: 0rpx;
		margin: 0px 15rpx 0px 15rpx;
		background: url(https://pic.youx365.com/bt_red.png);
		background-size: contain;
		
		&.hollow{
			background: url(https://pic.youx365.com/bt_blue.png);
			background-size: contain;
		}
	}
</style>
