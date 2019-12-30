<template>
	<view class="content">
		<img class="showimg" src="https://pic.youx365.com/pay-success-show.png" />
		<text class="tit" v-if="orderInfo.payStatus == 20">订单成功支付 {{orderInfo.totalPrice}}元</text>
		<text class="tit" v-else-if="orderInfo.payStatus == 0">等待支付通知</text>
		<text class="tit" v-else>支付失败</text>
		
		<!-- 大转盘 -->
		<adventures />

		<view class="btn-group">
			<view>
				<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
			</view>
			<view class="bt-rule">
				抽奖规则
			</view>
		</view>
	</view>
</template>

<script>
	
	import adventures from '@/components/adventures';
	
	export default {
		components: {
			adventures
		},
		data() {
			return {
				orderInfo:{}
			}
		},
		onLoad(options) {
			let orderNum = options.orderNum;
			this.orderNum = orderNum;
			this.$request.ModelOrder.infoOder(orderNum).then(result => {
				this.orderInfo = result;
			})
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
	.btn-group{
		padding-top: 40rpx;
		padding-bottom: 73rpx;
		
		.bt-rule{
			width: 268rpx;
			height: 84rpx;
			line-height: 84rpx;
			text-align: center;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(124,124,124,1);
		}
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
