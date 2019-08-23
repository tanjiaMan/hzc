<template>
	<view class="container">
		<view id="tab-bar" class="d-nav-tab flex-item">
			<scroll-view class="nav" scroll-with-animation>
				<view class="cu-item" v-for="(item,index) in tabBars" 
					:class="index == tabCur ? 'text-white cur':''" @tap="tabSelect" :key="item.id" :id="item.id" :data-id="index">
						{{item.name}}
				</view>
			</scroll-view>
		</view>
		
		<view class="swiper-box">
			<view class="tab_item uni-flex uni-row" v-for="record in 10" :key="record">
				<view class="flex-item d_1">
					<img class="img" src="https://pic.youx365.com/withdraw_money.png"  />
				</view>
				<view class="flex-item d_2">
					<view class="tit1">余额提现{{record}}</view>
					<view class="tit2">2017-02-06</view>
				</view>
				<view class="flex-item d_3">
					-500
				</view>
			</view>
			
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				tabCur: 0,
				tabBars:[{
					name: '待审核',
					id: 0
				},{
					name: '已提现',
					id: 1
				}]
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
			//菜单切换
			async tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
			},
			async changeTab(e) {
				let index = e.target.current;
				this.tabCur = index;
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.container{
		height: 100vh;
	}
	
	.d-nav-tab{
		width:100%;
		height: 79rpx;
		position: fixed;
		z-index: 1;
		
		.nav{
			height: 100%;
		}
		
		.cu-item{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			background:rgba(238,238,238,1);
			width: 375rpx;
			margin: 0 !important;
			padding: 0 !important;
			text-align: center;
			border-bottom: 0 !important;
			height: 79rpx;
			line-height: 79rpx;
		}
		
		.text-white{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
			background-color: #00A390 !important;
		}	
	}
	
	.swiper-box{
		height: 100%;
		padding-top: 79rpx;
	}
	
	.tab_item{
		width: 100%;
		height: 143rpx;
		border-bottom: 1px solid #E8E8E8;
		
		.img{
			width:80rpx;
			height:80rpx;
			border-radius:50%;
			vertical-align: middle;
		}
		
		.d_1{
			width: 140rpx;
			text-align: center;
			height: 143rpx;
			line-height: 143rpx;
		}
		
		.d_2{
			width: 433rpx;
			
			.tit1 {
				font-size:30rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				padding-top: 22rpx;
			}
			
			.tit2 {
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(136,136,136,1);
			}
		}
		
		.d_3{
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			width: 121rpx;
			height: 143rpx;
			line-height: 143rpx;
			text-align: center;
			color: #FF443F;
		}
	}
</style>
