<template>
	<view class="container">
		<view class="header">
			<img class="img" :src="transUser.avatarUrl" />
			<view class="header-tit1">
				{{transUser.nickName}}
			</view>
			<view class="header-tit2">
				{{transUser.mobile}}
			</view>
			<view class="header-tit3">转货商品/个数</view>
		</view>
		
		<view class="order-list uni-flex uni-row" v-for="(item,index) in products" :key="index">
			<view class="d-left">
				<img class="img" :src="item.coverPicUrl" />
			</view>
			<view class="d-center">
				<view class="tit1">{{item.productName}}</view>
				<view class="tit2 tit2marign">
					<text class="tit-1">零售价</text>
					<text class="tit-2">￥</text>
					<text class="tit-3">{{item.productPrice}}</text>
				</view>
				<view class="tit2">
					<text class="tit-1">进货价</text>
					<text class="tit-2">￥</text>
					<text class="tit-3">{{item.agentPrice}}</text>
				</view>
			</view>
			<view class="d-right">
				<!-- <view class="tit-1">已销 25 剩余 127</view> -->
				<view class="tit-2">
					<uni-number-box
						class="step"
						:min="0"
						:value="item.number"
						:index="index"
						@eventChange="numberChange"
					></uni-number-box>
				</view>
			</view>
		</view>
		
		<view class="bt1" @click="trans">
			提交
		</view>
	</view>
</template>

<script>

	import uniNumberBox from '@/components/uni-number-box.vue'

	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				transUserId: 0,
				transUser:{},
				products:[],
			};
		},
		onLoad(option){
			this.transUserId = option.transUserId;
			this.$request.ModelUser.searchUser({userId: this.transUserId}).then(result => {
				if(result.records == null || result.records.length == 0){
					this.$api.msg('用户不存在!');
					return;
				}
				this.transUser = result.records[0];
			})
			this.$request.ModelHome.getAgentProductByIds(option.ids).then(result => {
				this.products = result;
				this.products.forEach(item => {
					item.number = 0;
				})
			})
		},
		methods:{
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			async trans(){
				let values = [];
				var that = this;
				this.products.forEach(item => {
					if(item.number > 0){
						values.push({
							productId: item.productId,
							quantity: item.number,
							toUserId:this.transUserId
						});
					}
				})
				if(values.length == 0){
					this.$api.msg('转货数量必须大于0');
					return;	
				};
				uni.showModal({
				    content: '确定转货',
				    success: function (res) {
				        if (res.confirm) {
				            that.$request.ModelHome.transStock(values).then(result => {
								if(result.code == 'ok'){
									that.$api.msg('转货成功');
								}else{
									that.$api.msg(result.msg);
								}
							});
				        }
				    }
				});
			},
			//数量
			numberChange(data){
				this.products[data.index].number = data.number
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	
	.header{
		text-align: center;
		padding-top: 40rpx;
		background-color: #FFFFFF;
		
		.img{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}
		
		.header-tit1{
			font-size:34rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		
		.header-tit2{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(119,119,119,1);
		}
		
		.header-tit3{
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-top: 85rpx;
			text-align: left;
			padding-left: 31rpx;
			padding-bottom: 25rpx;
		}
	}
	
	.order-list{
		width: 711rpx;
		margin: 20rpx auto 0;
		background-color: #FFFFFF;
		
		.d-left{
			display: flex;
			align-items: center;
			width: 200rpx;
			
			.img{
				width: 140rpx;
				height: 131rpx;
				margin-left: 20rpx;
			}
		}
		
		.d-center{
			width: 320rpx;
			
			.tit1{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.tit2marign{
				margin-top: 14rpx;
			}
			.tit2{
				line-height: 1.2;
				
				.tit-1{
					font-size:20rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(96,96,96,1);
				}
				.tit-2{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,68,63,1);
				}
				.tit-3{
					font-size:28rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,68,63,1);
				}
			}
		}
		
		.d-right{
			.tit-1{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(96,96,96,1);
				padding-top: 6rpx;
			}
			
			.tit-2{
				position:relative;
				margin-top: 32rpx;
				
				/* 加减 */
				.uni-numbox{
					position: relative !important;
					height: 50rpx !important;
					line-height: 50rpx;
					background: #fff;
					left: 0 !important;
					
					/deep/ .uni-numbox-minus{
						border: 1px solid #999999;
						width: 38rpx;
						height: 38rpx;
						background-color: #fff;
						line-height: 32rpx;
						border-radius: 50%;
					}
					
					/deep/ .uni-numbox-plus{
						border: 1px solid #00A390;
						width: 38rpx;
						height: 38rpx;
						background-color: #00A390;
						line-height: 32rpx;
						border-radius: 50%;
						
						.yticon{
							color: #FFFFFF;
						}
					}
					
					/deep/ .uni-numbox-value{
						background: #fff;
					}
					
					/deep/ .yticon{
						font-size: 12px;
						font-weight: bold;
					}
					
					.uni-numbox-minus{
						border: 1px solid #999999;
						width: 38rpx;
						height: 38rpx;
						background-color: #fff;
						line-height: 32rpx;
						border-radius: 50%;
					}
					
					.uni-numbox-plus{
						border: 1px solid #00A390;
						width: 38rpx;
						height: 38rpx;
						background-color: #00A390;
						line-height: 32rpx;
						border-radius: 50%;
						
						.yticon{
							color: #FFFFFF;
						}
					}
					
					.uni-numbox-value{
						background: #fff;
					}
					
					.yticon{
						font-size: 12px;
						font-weight: bold;
					}
				}
			}
		}
	}
	
	.container{
		width: 100%;
		height: 100vh;
		
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
			margin: 140rpx auto 20rpx;
		}
	}
</style>
