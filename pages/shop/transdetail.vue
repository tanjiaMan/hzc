<template>
	<view class="container">
		<view class="d_header">
			<view class="d_item  bottom_line">
				<view class="tit1">收货人</view>
				<view class="tit2">{{info.nickName}}</view>
			</view>
			<view class="d_item">
				<view class="tit1" v-if="state == 1">转货时间</view>
				<view class="tit1" v-if="state == 2">退货时间</view>
				<view class="tit1" v-if="state == 3">发货时间</view>
				<view class="tit2">{{info.createTime}}</view>
			</view>
			<!-- <view class="d_item  bottom_line" v-if="state == 2">
				<view class="tit1">退货原因</view>
				<view class="tit2">{{info.nickName}}</view>
			</view> -->
		</view>
		<view class="d_body">
			<view class="tit_title">转货商品/个数</view>
			
			<view class="d_goods">
				<view class="d_left">
					<image class="img" :src="info.coverPicUrl"></image>
				</view>
				<view class="d_right">
					<view class="tit_name">{{info.productName}}</view>
					<view class="d_bottom">
						<view class="tit_price">￥{{info.price}}</view>
						<view class="tit_num">x {{info.quantity}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				state:1,
			}
		},
		onLoad(option){
			this.state = option.state;
			let detail = option.detail;
			this.info = JSON.parse(detail);
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.d_header{
		background-color: #FFFFFF;
		padding: 0 30rpx;
		
		.d_item{
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			
			.tit1{
				font-size:30rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(0,0,0,1);
				width: 158rpx;
			}
			
			.tit2{
				font-size:30rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
		}
		.bottom_line{
			border-bottom: solid 1px #E7E7E7;
		}
	}
	
	.d_body{
		margin-top: 16rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		
		.tit_title{
			font-size:30rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		.d_goods{
			margin-top: 40rpx;
			display: flex;
			
			.d_left{
				width:200rpx;
				height:190rpx;
				background:rgba(153,153,153,1);
				border-radius:16rpx;
				.img{
					width: 100%;
					height: 100%;
					border-radius:16rpx;
				}
			}
			
			.d_right{
				width: 446rpx;
				margin-left: 20rpx;
				.tit_name{
					font-size:28rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.d_bottom{
					display: flex;
					align-items: center;
					.tit_price{
						flex: 1;
						font-size:24rpx;
						font-family:Source Han Sans CN;
						font-weight:400;
						color:rgba(255,68,63,1);
					}
					.tit_num{
						font-size:24rpx;
						font-family:Source Han Sans CN;
						font-weight:400;
						color:rgba(153,153,153,1);
					}
				}
			}
		}
	}
</style>
