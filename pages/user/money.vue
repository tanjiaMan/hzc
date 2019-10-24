<template>  
    <view class="container">
		<view class="header">
			<view class="tit1">{{userAmount.userBalance || 0}}</view>
			<view class="tit2">
				<img src="https://pic.youx365.com/money_logo.png" />
				<text>代金券</text>
			</view>
		</view>
		<view class="button uni-flex uni-row">
			<view class="flex-item" style="width: 33%;">
				<view class="bt bt1" @click="navTo('/pages/withdraw/transaccount')">转账</view>
			</view>
			<view class="flex-item" style="width: 33%;">
				<view class="bt bt2" @click="navTo('/pages/withdraw/recharge')">充值</view>
			</view>
			<view class="flex-item" style="width: 33%;">
				<view class="bt bt3" @click="navTo('/pages/withdraw/withdraw')">提现</view>
			</view>
		</view>
		<view class="tab_title">
			代金券明细
		</view>
		<view class="tab_detail">
			<view class="tab_item uni-flex uni-row" v-for="(item,index) in records" :key="index">
				<view class="flex-item d_1">
					<img class="img" src="https://pic.youx365.com/wazi2.JPG"  />
				</view>
				<view class="flex-item d_2">
					<view class="tit1">{{item.userId}} 购买</view>
					<view class="tit2">{{item.createTime}}</view>
				</view>
				<view class="flex-item d_3">
					{{item.amountBalance}}
				</view>
			</view>
		</view>
		<uni-load-more :status="query.loadingType"></uni-load-more>
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
				userAmount:{}, //账户金额
				query:{
					pageIndex: 1,
					pageSize: 10,
					loadingType: 'more',
				},
				records:[],
			}
		},
		onShow(){
			//账户金额
			this.$request.ModelUser.getAmount().then(result => {
				this.userAmount = result || {};
			});
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		onLoad(){
			this.getAmountFlow();
		},
		//下拉刷新
		onPullDownRefresh(){
			this.getAmountFlow('refresh');
		},
		//加载更多
		onReachBottom(){
			this.getAmountFlow('more');
		},
        methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			async getAmountFlow(type){
				if(this.query.loadingType == 'noMore'){
					return;
				}
				if(type == 'more'){
					this.query.pageIndex = this.query.pageIndex + 1;
				}else if(type == 'refresh'){
					this.query.pageIndex = 1;
				}
				this.query.loadingType = 'loading';
				let result = await this.$request.ModelUser.getAmountFlow(this.query);
				let moneylist = result.records;
				
				if(moneylist.length < this.query.pageSize){
					this.query.loadingType = 'noMore';
				}else{
					this.query.loadingType = 'more'; 
				}
				
				moneylist.forEach(item=>{
					this.records.push(item);
				})
			}
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
	
	.button{
		position: fixed;
		margin-top: 200rpx;
		background-color: #fff;
		z-index: 1;
		height: 128rpx;
		width: 100%;
		
		.bt{
			width: 212rpx;
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
			border-radius: 10rpx;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin: 30rpx auto 0;
		}
		
		.bt1{
			background-color: #7D6EFF;
		}
		
		.bt2{
			background-color: #FE9637;
		}
		
		.bt3{
			background-color: #FF443F;
		}
	}
	
	.tab_title{
		font-size:28rpx;
		font-family:SourceHanSansCN;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding-left: 23rpx;
		position: fixed;
		margin-top: 328rpx;
		width: 100%;
		background-color: #fff;
		z-index: 1;
	}
	
	.tab_detail{
		padding: 388rpx 28rpx 28rpx 28rpx;;
		
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