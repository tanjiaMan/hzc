<template>
	<view>
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<view class="cen" v-if="addressData.id">
					<view class="address-box">
						<view class="moren" v-if="addressData.useDefault == 1">默认</view>
						<text class="address">{{addressData.provinceName}} {{addressData.cityName}} {{addressData.areaName}}</text>
					</view>
					<view class="address1">{{addressData.address}}</view>
					<view class="top">
						<text class="name">{{addressData.linkName}}</text>
						<text class="mobile">{{addressData.linkMobile}}</text>
					</view>
				</view>
				<view class="cen" v-else style="font-weight:500;color:black;">
					请选择收货地址
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</navigator>

		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item,index) in productInfos" :key="index">
				<image v-if="item.picUrlList && item.picUrlList.length >0" :src="item.picUrlList[0]"></image>
				<view class="right">
					<text class="title clamp">{{item.name}}</text>
					<view class="uni-flex uni-row" style="width: 100%;">
						<view style="width: 50%;" class="flex-item">
							<text class="price">￥{{item.price}}</text>
						</view>
						<view style="width: 50%;text-align: right;" class="flex-item">
							<text class="price">{{item.specificationName}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">￥{{data.logisticsPrice}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{data.totalOriginPrice}}</text>
			</view>
			<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥35</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<!-- <view class="cell-icon">
					券
				</view> -->
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip">
					选择优惠券 >
				</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">红包</text>
				<text class="cell-tip">暂无红包</text>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>总计</text>
				<text class="price-tip">￥</text>
				<text class="price">{{data.totalPrice}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
		
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<view v-if="couponList.length == 0" style="text-align:center;padding-top: 30rpx;">
					暂无可用优惠券
				</view>
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2019-06-30</text>
						</view>
						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满30可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				couponList: [], //优惠券列表
				
				addressData: {}, //地址信息
				data:{}, //价格信息
				productInfos:[], //商品信息
				
				productparam:{}
			}
		},
		onLoad(option){
			//商品数据
			let data = JSON.parse(option.order);
			this.productparam.orderProducts = data;
		},
		onShow(){
			this.calute();
		},
		methods: {
			async calute(){
				if(this.addressData.id){
					this.productparam.addressId = this.addressData.id;
				}
				let result = await this.$request.ModelOrder.getOrderCaculate(this.productparam);
				if(result.productInfos){
					this.productInfos = result.productInfos;
					this.addressData = result.addressInfo || {};
					this.data = result.priceInfo;
				}
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			async submit(){
				if(!this.addressData.id){
					this.$api.msg('请选择收货地址');
					return;
				}
				this.productparam.addressId = this.addressData.id;
				let result = await this.$request.ModelOrder.createOrder(this.productparam);
				if(result.orderNum){
					uni.redirectTo({
						url: '/pages/money/pay?orderNum='+result.orderNum
					})
				}else{
					this.$api.msg('创建订单失败');
				}
			},
			stopPrevent(){}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
			width: 710rpx;
			margin: 0 auto;
			
			.top{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			
			.address1{
				font-size:36rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				padding: 20rpx 0 16rpx 0;
			}
			
			.moren{
				background-color: #00A390;
				float: left;
				width: 68rpx;
				height: 32rpx;
				line-height: 32rpx;
				border-radius: 10rpx;
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				text-align: center;
				margin-right: 20rpx;
			}
			
			.address-box{
				height: 32rpx;
				line-height: 32rpx;
			}
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			margin-right: 24upx;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 20rpx 20rpx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:bold;
				color:rgba(0,0,0,1);
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			margin-right: 10upx;
		}

		.cell-tip {
			font-size:22rpx;
			font-family:SourceHanSansCN;
			font-weight:bold;
			color:rgba(255,68,63,1);

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
			
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
		}
		.price-tip{
			margin-left: 8upx;
		}
		.price{
			
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: #FF443F;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
