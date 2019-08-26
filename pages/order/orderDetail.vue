<template>  
    <view class="container">
		<!-- 头部状态 待支付 -->
		<view class="header" v-if="orderStatus == 0">
			<view class="tit1">待支付</view>
			<view class="tit2">199.00</view>
			<view class="tit3">14:59</view>
			<view class="uni-flex uni-row" style="margin: 92rpx 0 39rpx 0;">
				<view class="bt1">取消订单</view>
				<view class="bt2">去支付</view>
			</view>
		</view>
		<view class="header" v-if="orderStatus == 1">
			<view class="tit1">等待商家发货</view>
			<img class="img" src="https://pic.youx365.com/order-nofahuo.png" />
			<view class="uni-flex uni-row" style="margin: 92rpx 0 39rpx 0;">
				<view class="bt1" style="margin: 0 auto !important;">取消订单</view>
			</view>
		</view>
		<view class="header" v-if="orderStatus == 2">
			<view class="tit1">商家已发货</view>
			<img class="img" src="https://pic.youx365.com/order-fahuo.png" />
			<view class="uni-flex uni-row" style="margin: 92rpx 0 39rpx 0;">
				<view class="bt3">查看物流信息</view>
				<view class="bt2">确认收货</view>
			</view>
		</view>
		
		<!-- 头部状态 -->
		<view class="line1"></view>
		<!-- 商品详情 -->
		<view class="goods-detail">
			<view class="goods-list" v-for="item in 3" :key="item">
				<view class="price">￥29.8</view>
				<view class="uni-flex uni-row">
					<view class="flex-item">
						<image class="img" src="https://pic.youx365.com/wazi2.JPG" mode="aspectFill" />
					</view>
					<view class="flex-item d_1">
						<view class="name">联想 310S-15 i5-7200U</view>
						<view class="num">数量：1</view>
					</view>
				</view>
			</view>
			<view class="line2"></view>
			<view class="uni-flex uni-row price-item">
				<view class="flex-item tit1">运费</view>
				<view class="flex-item tit2">￥ 10</view>
			</view>
			<view class="line2"></view>
			<view class="uni-flex uni-row price-item">
				<view class="flex-item tit1">优惠</view>
				<view class="flex-item tit2">- ￥ 25</view>
			</view>
			<view class="line2"></view>
			<view class="d_2">
				<text class="tit3">已优惠 ￥25</text> <text class="tit4">合计￥199.00</text>
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
				<view class="flex-item tit3">顺丰</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item tit2">收货人</view>
				<view class="flex-item tit3">张三 13202125263</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item tit2">配送地址</view>
				<view class="flex-item tit3">湖南省长沙市岳麓区麓谷企业广场F4栋3楼</view>
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
				<view class="flex-item tit3">45212566522212</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item tit2">下单时间</view>
				<view class="flex-item tit3">2019.05.24 13:03:12</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item tit2">支付方式</view>
				<view class="flex-item tit3">在线支付</view>
			</view>
			
			<view style="height: 144rpx;"></view>
		</view>
    </view>
</template>  
<script>  
	
    export default {
		data(){
			return {
				orderStatus:2
			}
		},
        methods: {
			 
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
</style>