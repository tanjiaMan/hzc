<template>
	<view class="container">
		<view class="header">
			<view>
				<view class="tit1">1</view>
				<view class="tit2">选择商品</view>
			</view>
			<view>
				<view class="tit1">2</view>
				<view class="tit2">邀请砍价</view>
			</view>
			<view>
				<view class="tit1">3</view>
				<view class="tit2">低价购买</view>
			</view>
		</view>
		<view class="d-onkj">
			<view class="d-status">
				<img class="img" src="https://pic.youx365.com/kj-onjk.png" />
				<text class="tit1">正在进行中...</text>
			</view>
			<view class="d-goods">
				<view class="goods-item uni-flex uni-row" v-for="(item,index) in 1" :key="index">
					<view class="flex-item dright">
						<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
					</view>
					<view class="flex-item dleft">
						<view class="tit1">
							已砍 <text style="color: #FF3C00;">254</text> 元，还可砍 <text style="color: #FF3C00;">500</text> 元
						</view>
						<view class="s-header">
							<text class="hour timer">23</text>
							<text class="minute timer">15</text>
							<text class="second timer">23</text>
							<text class="tip">后结束</text>
						</view>
						<view class="d-bt">
							<view class="bt" @click="navTo('/pages/index/kjdetail')">继续砍价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="d-list">
			<view class="list-header">
				<img src="https://pic.youx365.com/split-1.png" />
				<text>砍价列表</text>
				<img src="https://pic.youx365.com/split-1.png" />
			</view>
			<view class="goods-list uni-flex uni-row" v-for="(item,index) in records" :key="index">
				<view class="flex-item dleft">
					<img class="img" :src="item.coverPicUrl" />
				</view>
				<view class="flex-item dright">
					<view class="tit3">{{item.productName}}</view>
					<view class="uni-flex uni-row price">
						<view style="width: 50%;">
							<text class="tit1">¥</text><text class="tit2">{{item.productPrice}}</text>
						</view>
						<view style="width: 50%;">
							<view class="bt1" @click="navToDetailPage(item.productId,'bargain')">我要砍价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classifyPid: 0,
				records:[],
			}
		},
		onLoad(option){
			this.classifyPid = option.classifyPid;
			this.init();
		},
		methods: {
			init(){
				this.$request.ModelHome.getBargin({classifyPid: this.classifyPid,pageSize: 20}).then(res => {
					if(res.records && res.records.length>0){
						this.records = res.records;
					}
				})
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			//详情页
			navToDetailPage(id, source) {
				source = source? source:'';
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&source=${source}`
				})
			},
		}
	}
</script>

<style lang='scss'>
	.header{
		width: 100%;
		height: 176rpx;
		background-image: url('https://pic.youx365.com/kj-bg.png');
		background-size: cover;
		display: flex;
		flex-flow: row;
		justify-content: space-around;
		
		.tit1{
			width:64rpx;
			height:64rpx;
			line-height:64rpx;
			background-image: url('https://pic.youx365.com/kj-1.png');
			background-size: cover;
			text-align: center;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,163,144,1);
			margin: 31rpx auto 0;
		}
		
		.tit2{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
	
	.d-onkj{
		margin-top: 20rpx;
		
		.d-status{
			height: 88rpx;
			width: 100%;
			background-color: #00A390;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.img{
				width: 32rpx;
				height: 32rpx;
			}
			
			.tit1{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,255,255,1);
				margin-left: 12rpx;
			}
		}
		
		.d-goods{
			border-radius:7rpx;
			width: 711rpx;
			margin: 0 auto;
			background-color: #FFFFFF;
			
			.goods-item{
				height: 226rpx;
				width: 677rpx;
				margin: 0 auto;
				padding-top: 25rpx;
				
				.dright{
					width: 290rpx;
					
					.img{
						width: 260rpx;
						height: 160rpx;
					}
				}
				
				.dleft{
					.tit1{
						font-size:26rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:#333333;
					}
					
					.s-header{
						display:flex;
						align-items:center;
						
						.tip{
							margin:0 6rpx 0 6rpx;
							font-size:22rpx;
							font-family:Microsoft YaHei;
							font-weight:400;
							color:rgba(70,70,70,1);
						}
						.timer{
							display:inline-block;
							width:40rpx;
							height:31rpx;
							text-align:center;
							line-height:31rpx;
							margin-right:14rpx;
							font-size:22rpx;
							font-family:Microsoft YaHei;
							color:#FFFFFF;
							border-radius:3rpx;
							background:#464646;
						}
					}
				}
				
				.d-bt{
					margin-top: 20rpx;
					.bt{
						font-size:24rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,255,255,1);
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						width: 168rpx;
						background-color: #FF443F;
						border-radius: 4rpx;
					}
				}
			}
		}
	}
	
	.d-list{
		.list-header{
			text-align: center;
			font-size:32rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			padding: 40rpx 0 30rpx 0;
			
			
			img{
				height: 48rpx;
				width: 48rpx;
				vertical-align: middle;
				padding: 0px 5px 0 5px;
			}
		}
		
		.goods-list{
			width: 711rpx;
			height: 203rpx;
			border-radius: 7rpx;
			background-color: #FFFFFF;
			margin: 15rpx auto 0;
			
			.dleft{
				width: 276rpx;
				display: flex;
				align-items: center;
				
				.img{
					width: 180rpx;
					height: 180rpx;
					margin-left: 40rpx;
				}
			}
			
			.dright{
				width: 435rpx;
				padding-right: 30rpx;
				
				.tit3{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size:26rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-top: 28rpx;
				}
				
				.price{
					display: flex;
					align-items: center;
					height: 120rpx;
					line-height: 120rpx;
					
					.tit1{
						font-size:26rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(255,68,63,1);
					}
					
					.tit2{
						font-size:34rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(255,68,63,1);
					}
					
					.bt1{
						font-size:24rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,255,255,1);
						width:118rpx;
						height:49rpx;
						line-height:49rpx;
						background:rgba(0,163,144,1);
						border-radius:4px;
						text-align: center;
						float: right;
					}
				}
			}
		}
	}
</style>
