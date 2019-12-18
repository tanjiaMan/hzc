<template>  
    <view class="container">
		<!-- 头部状态 待支付 -->
		<view class="header" v-if="orderStatus == 0">
			<view class="tit1">待支付</view>
			<view class="tit2">199.00</view>
			<view class="tit3">14:59</view>
		</view>
		<view class="header" v-if="orderStatus == 20">
			<view class="tit1">等待商家发货</view>
			<img class="img" src="https://pic.youx365.com/order-nofahuo.png" />
		</view>
		<view class="header" v-if="orderStatus == 40">
			<view class="tit1">商家已发货</view>
			<img class="img" src="https://pic.youx365.com/order-fahuo.png" />
		</view>
		<view class="header" v-if="orderStatus == 60">
			<view class="tit1">商品待评价</view>
			<img class="img" src="https://pic.youx365.com/order-fahuo.png" />
		</view>
		<view class="header" v-if="orderStatus == 80">
			<view class="tit1">订单已完成</view>
			<img class="img" src="https://pic.youx365.com/order-fahuo.png" />
		</view>
		
		<!-- 头部状态 -->
		<view class="line1"></view>
		<!-- 商品详情 -->
		<view class="goods-detail">
			<view class="goods-list" v-for="(item,index) in order.orderDetails" :key="index">
				<view class="uni-flex uni-row">
					<view class="flex-item">
						<image class="img" :src="item.coverPicUrl" mode="aspectFill" />
					</view>
					<view class="flex-item d_1">
						<view class="name">{{item.productName}}</view>
						<view class="num">数量：{{item.productQuantity}}</view>
					</view>
					<view class="flex-item price">￥{{item.productPrice * item.productQuantity}}</view>
				</view>
			</view>
		</view>
		<view class="line1"></view>
		<view class="order-detail">
			<!-- 快递信息 -->
			<view class="tit1">
				快递信息
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item tit2">快递公司</view>
				<view class="flex-item tit3">{{order.logisticsCompany}}</view>
			</view>
			<view class="uni-flex uni-row" v-if="order.addressInfo">
				<view class="flex-item tit2">收货人</view>
				<view class="flex-item tit3">{{order.addressInfo.linkName}} {{order.addressInfo.linkMobile}}</view>
			</view>
			<view class="uni-flex uni-row" v-if="order.addressInfo">
				<view class="flex-item tit2">配送地址</view>
				<view class="flex-item tit3">{{order.addressInfo.provinceName}}{{order.addressInfo.cityName ? order.addressInfo.cityName : ''}}{{order.addressInfo.areaName}}{{order.addressInfo.address}}</view>
			</view>
		</view>
		<view class="line1"></view>
		<view class="order-detail">
			<!-- 订单信息 -->
			<view class="tit1">
				订单信息
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item tit2">订单编号</view>
				<view class="flex-item tit3">{{order.orderNum}}</view>
			</view>
			<view class="uni-flex uni-row" v-if="order.payTime">
				<view class="flex-item tit2">下单时间</view>
				<view class="flex-item tit3">{{order.payTime}}</view>
			</view>
			<view class="uni-flex uni-row" v-if="order.payWayDesc">
				<view class="flex-item tit2">支付方式</view>
				<view class="flex-item tit3">{{order.payWayDesc}}</view>
			</view>
		</view>
		
		<view class="line1"></view>
		<view class="goods-detail">
			<view class="uni-flex uni-row price-item">
				<view class="flex-item tit1">运费</view>
				<view class="flex-item tit2">￥ {{order.logisticsPrice}}</view>
			</view>
			<view class="line2"></view>
			<view class="uni-flex uni-row price-item">
				<view class="flex-item tit1">优惠</view>
				<view class="flex-item tit2">- ￥ {{order.totalDiscountPrice}}</view>
			</view>
			<view class="line2"></view>
			<view class="d_2">
				<text class="tit3">共 {{order.orderDetails && order.orderDetails.length}} 件</text> <text class="tit3">已优惠 ￥{{order.totalDiscountPrice}}</text> <text class="tit4">合计￥{{order.totalPrice}}</text>
			</view>
		</view>
		
		<view class="d_bottom" v-if="orderStatus == 0">
			<view class="bt1" @click="cancelOrder()">取消订单</view>
			<view class="bt2" @click="payOrder()">去支付</view>
		</view>
		
		<!-- <view class="d_bottom" v-if="orderStatus == 20">
			<view class="bt1" style="margin: 0 auto !important;">取消订单</view>
		</view> -->
		
		<view class="d_bottom" v-if="orderStatus == 40">
			<view class="bt3" @click="logistOrder">查看物流信息</view>
			<view class="bt2" @click="sureOrder">确认收货</view>
		</view>
		
		<view class="d_bottom" v-if="orderStatus == 60">
			<view class="bt2" @click="navTo('/pages/order/comment?orderNum'+item.orderNum)">去评价</view>
		</view>
		
		<view style="height: 144rpx;"></view>
    </view>
</template>  
<script>
	
    export default {
		data(){
			return {
				orderStatus:2,
				orderNum: 0,
				order:{}
			}
		},
		onLoad(option){
			this.orderStatus = option.orderStatus;
			
			if(this.orderStatus < 40){
				this.$request.ModelOrder.infoOrderTemp(option.id).then(result => {
					this.order = result;
					this.orderNum = result.orderNum;
				})
			}else{
				this.$request.ModelOrder.infoOrderPD(option.id).then(result => {
					this.order = result;
					this.orderNum = result.orderNum;
				})
			}
		},
        methods: {
			navTo(url){
				uni.navigateTo({url})  
			},
			 cancelOrder(){//取消订单
			 	var that = this;
			 	uni.showModal({
			 	    title: '确定取消订单?',
			 	    success: function (res) {
			 	        if (res.confirm) {
			 				that.$request.ModelOrder.cancelOrder(that.orderNum).then(result => {
								uni.redirectTo({
									url: '/pages/order/order?state=1'
								})({url})  
			 				});
			 	        }
			 	    }
			 	});
			 },
			 payOrder(){ //支付订单
			 	uni.navigateTo({
			 		url: '/pages/money/pay?orderNum='+this.orderNum
			 	})
			 },
			 logistOrder(){ //查看物流
			 	
			 },
			 sureOrder(){ //确认收货
			 	
			 },
        }  
    }  
</script>  
<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.line1{
		width: 100%;
		height:15rpx;
		background:rgba(246,246,246,1);
	}
	
	.line2{
		width: 100%;
		height:1px;
		background:rgba(196,196,196,1);
		opacity:0.43;
	}
	
	.header{
		text-align: center;
		padding-bottom: 45rpx;
		
		.img{
			width: 408rpx;
			height: 108rpx;
			margin-top: 52rpx;
		}
		
		.tit1{
			width: 100%;
			text-align: right;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			padding-right: 44rpx;
		}
		.tit2{
			width: 100%;
			text-align: center;
			font-size:70rpx;
			font-family:SourceHanSansCN;
			font-weight:bold;
			color:rgba(0,0,0,1);
		}
		.tit3{
			width: 100%;
			text-align: center;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(139,139,139,1);
		}
	}
	
	.bt1{
		font-size:26rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(165,165,165,1);
		width:163rpx;
		height:65rpx;
		line-height:65rpx;
		background:rgba(238,238,238,1);
		border-radius:33rpx;
		text-align: center;
		margin-left: 192rpx;
	}
	.bt2{
		font-size:26rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(255,255,255,1);
		width:163rpx;
		height:65rpx;
		line-height:65rpx;
		background:rgba(255,68,63,1);
		border-radius:33rpx;
		text-align: center;
		margin-left: 36rpx;
	}
	.bt3{
		font-size:26rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:#FFFFFF;
		width:184rpx;
		height:65rpx;
		line-height:65rpx;
		background:#00A390;
		border-radius:33rpx;
		text-align: center;
		margin-left: 174rpx;
	}
	
	.goods-detail{
		padding-top: 30rpx;
		
		.goods-list{
			.price{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(255,68,63,1);
				text-align: right;
				padding-right: 30rpx;
			}
			
			.img{
				width: 182rpx;
				height: 155rpx;
				margin-left: 50rpx;
			}
			
			.d_1{
				padding-left: 19rpx;
			}
			
			.name{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 400rpx;
			}
			
			.num{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(156,156,156,1);
			}
		}
		
		.price-item{
			width: 100%;
			height: 82rpx;
			line-height: 82rpx;
			padding: 0 30rpx 0 30rpx;
			
			.tit1{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				width: 50%;
				text-align: left;
				height: 82rpx;
				line-height: 82rpx;
			}
			
			.tit2{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				width: 50%;
				text-align: right;
				height: 82rpx;
				line-height: 82rpx;
			}
		}
		
		.d_2{
			text-align: right;
			padding-right: 30rpx;
			height: 110rpx;
			line-height: 110rpx;
			
			.tit3{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#333333;
				margin-right: 40rpx;
			}
			
			.tit4{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#FF443F;
			}
		}
	}

	.order-detail{
		padding: 0 30rpx 0 30rpx;
		
		.tit1{
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(0,163,144,1);
			line-height: 60rpx;
			margin-top: 30rpx;
		}
		
		.tit2{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(58,58,58,1);
			text-align: left;
			width: 50%;
			line-height: 60rpx;
		}
		
		.tit3{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(58,58,58,1);
			text-align: right;
			width: 50%;
			line-height: 60rpx;
		}
	}
	
	.d_bottom{
		justify-content: flex-end;
		display: flex;
		padding-right: 42rpx;
		display: flex;
		margin-top: 42rpx;
	}
</style>