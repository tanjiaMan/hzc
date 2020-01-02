<template>
	<view class="container">
		<view class="goods-item" v-for="(item,index) in products" :key="index">
			<view class="d-header">
				<img class="img-header" :src="item.shopUserAvatarUrl" />
				<text class="tit-header">{{item.shopUserName}}</text>
			</view>
			<view class="d-goods">
				<img class="img-goods" :src="item.coverPicUrl" />
				<view class="d-right">
					<view class="tit-title">{{item.productName}}</view>
					<!-- <view class="tit-static">已销 25 剩余 128</view> -->
					<view class="uni-flex uni-row">
						<view class="d-lsj">零售价：<text class="priceicon">￥</text><text class="price">{{item.productPrice}}</text></view>
						<view class="d-lsj">进货价：<text class="priceicon">￥</text><text class="price">{{item.agentPrice}}</text></view>
					</view>
				</view>
			</view>
			<view class="d-input uni-flex uni-row">
				<view class="tittitle">
					退货理由
				</view>
				<view class="d-inputitem">
					<input class="inputclass" v-model="item.reason" placeholder="请输入退货理由" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="d-input uni-flex uni-row">
				<view class="tittitle">
					退货数量
				</view>
				<view class="d-inputitem">
					<input class="inputclass" v-model="item.number" type="number" placeholder="请输入需要退货的数量" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="d-input uni-flex uni-row">
				<view class="tittitle">
					退货金额
				</view>
				<view class="d-inputitem">
					<text class="tit-1">¥</text><text class="tit-2">{{item.agentPrice}}</text>
				</view>
			</view>
		</view>
		<view class="d-bt">
			<view class="bt" @click="submit">提交申请</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products:[],
			}
		},
		onLoad(option){
			this.$request.ModelHome.getAgentProductByIds(option.ids).then(result => {
				this.products = result;
				this.products.forEach(item => {
					item.reason = '';
					item.number = item.myStock;
				})
			})
		},
		methods: {
			submit(){
				let values = [];
				var that = this;
				this.products.forEach(item => {
					if(item.number > 0){
						values.push({
							productId: item.productId,
							quantity: item.number,
							reason:item.reason
						});
					}
				})
				uni.showModal({
				    content: '确定退货',
				    success: function (res) {
				        if (res.confirm) {
				            that.$request.ModelHome.withdrawStock(values).then(result => {
								if(result.code == 'ok'){
									that.$api.msg('退货成功');
									uni.navigateBack({delta: 1});
								}else{
									that.$api.msg(result.msg);
								}
							});
				        }
				    }
				});
			}
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
