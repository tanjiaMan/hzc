<template>  
    <view class="container">
		<view class="header">
			<view class="tit1">5400.00</view>
			<view class="tit2">
				<img src="https://pic.youx365.com/money_logo.png" />
				<text>账户余额</text>
			</view>
			<view class="tit3" @click="navTo('/pages/withdraw/withdraw')">去提现</view>
		</view>
		<view class="tab_title">
			余额明细
		</view>
		<view class="tab_detail">
			<view class="tab_item uni-flex uni-row" v-for="item in 10" :key="item">
				<view class="flex-item d_1">
					<img class="img" src="https://pic.youx365.com/wazi2.JPG"  />
				</view>
				<view class="flex-item d_2">
					<view class="tit1">zhang三 分佣{{item}}</view>
					<view class="tit2">14:20:30</view>
				</view>
				<view class="flex-item d_3">
					+500
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
    </view>  
</template>  
<script>  
	
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
    export default {
		components: {
			uniLoadMore	
		},
		data(){
			return {
				loadingType: 'more',
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.$api.msg('下拉刷新');
		},
		//加载更多
		onReachBottom(){
			this.$api.msg('加载更多');
		},
        methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}, 
        }  
    }  
</script>  
<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.header{
		height: 260rpx;
		width: 100%;
		background-image: url('https://pic.youx365.com/money_bg.png');
		background-size: cover;
		text-align: center;
		position: fixed;
		background-color: #FFFFFF;
		z-index: 1;
		
		.tit1{
			font-size:55rpx;
			font-family:SourceHanSansCN;
			font-weight:bold;
			color:rgba(255,255,255,1);
			padding-top: 28rpx;
		}
		
		.tit2{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
			margin-top: -14rpx;
			
			image{
				height: 24rpx;
				width: 24rpx;
				margin-right: 17rpx;
			}
			
			img{
				height: 24rpx;
				width: 24rpx;
				margin-right: 17rpx;
			}
		}
		
		.tit3{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-shadow:0px 1px 4px rgba(209,144,0,0.71);
			width: 160rpx;
			height: 64rpx;
			line-height: 64rpx;
			background: url('https://pic.youx365.com/money_bt.png');
			background-size: cover;
			margin: 20rpx auto 0;
		}
		
	}
	
	.tab_title{
		font-size:28rpx;
		font-family:SourceHanSansCN;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding-left: 23rpx;
		position: fixed;
		margin-top: 260rpx;
		width: 100%;
		background-color: #fff;
		z-index: 1;
	}
	
	.tab_detail{
		padding: 320rpx 28rpx 28rpx 28rpx;;
		
		.tab_item{
			width: 100%;
			height: 129rpx;
			border-bottom: 1px solid #E8E8E8;
			
			.img{
				width:80rpx;
				height:80rpx;
				border-radius:50%;
				vertical-align: middle;
			}
			
			.d_1{
				width: 120rpx;
				text-align: center;
				height: 129rpx;
				line-height: 129rpx;
			}
			
			.d_2{
				width: 453rpx;
				
				.tit1{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(51,51,51,1);
					padding-top: 22rpx;
				}
				
				.tit2{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(101,101,101,1);
				}
			}
			
			.d_3{
				width: 121rpx;
				height: 129rpx;
				line-height: 129rpx;
				text-align: center;
				color: #00A390;
			}
			
			.color_red{
				color: #FF443F !important;
			}
		}
	}
	
</style>