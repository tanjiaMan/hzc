<template>
	<view class="container">
		<view class="goods-item" v-for="(item,index) in 2" :key="index">
			<view class="d-header">
				<img class="img-header" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
				<text class="tit-header">韩梅梅与李雷雷</text>
			</view>
			<view class="d-goods">
				<img class="img-goods" src="https://pic.youx365.com/shop1.png" />
				<view class="d-right">
					<view class="tit-title">颜值在线！旅游、出行、上班！轻便实 用大容量，进口尼龙双肩背包进口尼龙双肩背包进口尼龙双肩背包</view>
					<view class="tit-static">已销 25 剩余 128</view>
					<view class="uni-flex uni-row">
						<view class="d-lsj">零售价：<text class="priceicon">￥</text><text class="price">14.9</text></view>
						<view class="d-lsj">进货价：<text class="priceicon">￥</text><text class="price">14.9</text></view>
					</view>
				</view>
			</view>
			<view class="d-input uni-flex uni-row">
				<view class="tittitle">
					退货理由
				</view>
				<view class="d-inputitem">
					<input class="inputclass" placeholder="请输入退货理由" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="d-input uni-flex uni-row">
				<view class="tittitle">
					退货数量
				</view>
				<view class="d-inputitem">
					<input class="inputclass" placeholder="请输入需要退货的数量" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="d-input uni-flex uni-row">
				<view class="tittitle">
					退货金额
				</view>
				<view class="d-inputitem">
					<text class="tit-1">¥</text><text class="tit-2">14.9</text>
				</view>
			</view>
		</view>
		<view class="d-bt">
			<view class="bt">提交申请</view>
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
	
	.goods-item{
		width: 750rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		padding: 0 20rpx;
		
		.d-header{
			height: 142rpx;
			display: flex;
			align-items: center;
			
			.img-header{
				width:70rpx;
				height:70rpx;
				border-radius:50%;
			}
			.tit-header{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				margin-left: 24rpx;
			}
		}
		
		.d-goods{
			display: flex;
			
			.img-goods{
				width: 216rpx;
				height: 187rpx;
				margin-right: 34rpx;
			}
			
			.d-right{
				flex: 1;
				
				.tit-title{
					word-break: break-all;
					display: -webkit-box;
					overflow: hidden;
					line-height:1.5;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					font-size:26rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					margin-bottom: 20rpx;
				}
				
				.tit-static{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
				
				.d-lsj{
					width: 50%;
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(153,153,153,1);
					
					.priceicon{
						font-size:22rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,68,63,1);
					}
					
					.price{
						font-size:26rpx;
						font-family:SourceHanSansCN;
						font-weight:500;
						color:rgba(255,68,63,1);
					}
				}
			}
		}
	}
	
	.d-input{
		margin-top: 30rpx;
		
		.tittitle{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			width: 30%;
			line-height: 70rpx;
			text-align: center;
		}
		
		.d-inputitem{
			flex: 1;
			line-height: 70rpx;
			
			.tit-1{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
			}
			
			.tit-2{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,68,63,1);
			}
		}
		
		.inputclass{
			font-size:26rpx;
			height: 70rpx;
			border: solid 1px #E7E7E7;
			border-radius:3rpx;
			padding-left: 20rpx;
		}
		
		.placeholder{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:#999999;
			background:rgba(250,250,250,1);
			border-radius:3rpx;
			height: 70rpx;
			line-height: 73rpx;
			padding-left: 20rpx;
			width: 553rpx;
			margin-left: -20rpx;
		}
	}
	
	.d-bt{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		height: 264rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.bt{
			/* margin: 84rpx auto 0; */
			width: 712rpx;
			height: 96rpx;
			line-height: 96rpx;
			background-color: #00A390;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			border-radius: 5rpx;
			text-align: center;
		}
	}
	
</style>
