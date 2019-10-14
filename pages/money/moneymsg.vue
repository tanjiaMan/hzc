<template>
	<view class="container">
		<view class="static">
			<view class="d-nav-tab flex-item">
				<scroll-view class="nav" scroll-with-animation>
					<view class="cu-item" v-for="(item,index) in tabBars" 
						:class="index == tabCur ? ('text-white '+ (index == 0?'cur1':'cur2')):'' " @tap="tabSelect" :key="item.id" :id="item.id" :data-id="index">
							{{item.name}}
					</view>
				</scroll-view>
			</view>
		
			<view class="d-count uni-flex uni-row" v-if="tabCur == 0">
				<view class="flex-item d-1">
					<view class="tit1">88866.24</view>
					<view class="tit2">总收入</view>
				</view>
				<view class="flex-item line1"></view>
				<view class="flex-item d-1">
					<view class="tit1">15248</view>
					<view class="tit2">退货</view>
				</view>
				<view class="flex-item line1"></view>
				<view class="flex-item d-1">
					<view class="tit1">63215</view>
					<view class="tit2">代理进货</view>
				</view>
			</view>
			<view class="d-count uni-flex uni-row" v-else>
				<view class="flex-item d-1">
					<view class="tit1">88866.24</view>
					<view class="tit2">总收入</view>
				</view>
				<view class="flex-item line1"></view>
				<view class="flex-item d-1">
					<view class="tit1">15248</view>
					<view class="tit2">补货</view>
				</view>
				<view class="flex-item line1"></view>
				<view class="flex-item d-1">
					<view class="tit1">63215</view>
					<view class="tit2">进货</view>
				</view>
			</view>
			
			<view class="day-nav-tab flex-item">
				<scroll-view class="nav" scroll-with-animation>
					<view class="cu-item" v-for="(item,index) in dayTabBars" 
						:class="index == dayTabCur ? 'text-white cur':''" @tap="dayTabSelect" :key="item.id" :id="item.id" :data-id="index">
							{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="day-selectd uni-flex uni-row">
				<view class="flex-item d-1">
					<picker mode="date" :value="startDate" @change="bindStartDateChange">
						<text class="tit">{{startDate != null?startDate: '开始时间'}}</text>
						<img class="img" src="https://pic.youx365.com/calendar-logo.png" />
					</picker>
				</view>
				<view class="flex-item d-2">至</view>
				<view class="flex-item d-1">
					<picker mode="date" :value="endDate" @change="bindEndDateChange">
						<text class="tit">{{endDate != null?endDate: '结束时间'}}</text>
						<img class="img" src="https://pic.youx365.com/calendar-logo.png" />
					</picker>
				</view>
				<view class="flex-item d-3">查询</view>
			</view>
			
			<view class="line1"></view>
			<view class="detail-header">资金明细</view>
		</view>
		
		<view class="swiper-box">
			<view class="tab_item uni-flex uni-row" v-for="record in 10" :key="record">
				<view class="flex-item d_1">
					<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg"  />
				</view>
				<view class="flex-item d_2">
					<view class="uni-flex uni-row">
						<view class="tit1">陈小明{{record}}</view>
						<view class="tit3">进货</view>
					</view>
					<view class="tit2">商品名称 *10</view>
					<view class="tit2">商品名称 *10</view>
				</view>
				<view class="flex-item d_3">
					<view class="tit3">2019-08-10</view>
					<view class="tit4">+100</view>
					<view class="tit4">+300</view>
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
				tabBars:[{name: '收入',id: 0},{name: '支出',id: 1}],
				dayTabCur:0,
				dayTabBars:[{name: '全部',id:0},{name: '昨天',id:1},{name: '今天',id:2},{name: '近七天',id:3}],
				loadingType: 'more',
				
				startDate: null,
				endDate: null,
			};
		},
		onLoad(options) {
			
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
			bindStartDateChange: function(e) {
				this.startDate = e.target.value
			},
			bindEndDateChange: function(e) {
				this.endDate = e.target.value
			},
			//菜单切换
			async tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
			},
			async dayTabSelect(e){
				this.dayTabCur = e.currentTarget.dataset.id;
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.line1{
		width:750rpx;
		height:20rpx;
		background:rgba(238,238,238,1);
	}
	
	.static{
		position: fixed;
		background-color: #fff;
		z-index: 1;
	}
	
	.d-nav-tab{
		width:100%;
		height: 96rpx;
		
		.nav{
			height: 100%;
			background:#F1F1F1;
		}
		
		.cu-item{
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(68,68,68,1);
			background:#F1F1F1;
			width: 375rpx;
			margin: 0 !important;
			padding: 0 !important;
			text-align: center;
			border-bottom: 0 !important;
			height: 100rpx;
			line-height: 100rpx;
		}
		
		.text-white{
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
			/* background:rgba(255,255,255,1) !important; */
		}
			
		.cur1{
			background-image: url('https://pic.youx365.com/mmsg-bg1.png');
			background-size: cover;
			width: 390rpx !important;
		}
		
		.cur2{
			background-image: url('https://pic.youx365.com/mmsg-bg2.png');
			background-size: cover;
			width: 390rpx !important;
		}
	}

	.d-count{
		width: 100%;
		height: 146rpx;
		border-bottom: 1px solid #EBEBEB;
		
		.d-1{
			width: 33.33%;
			height: 100%;
			line-height: 146rpx;
			
			.tit1{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				text-align: center;
				margin-top: 22rpx;
			}
			
			.tit2{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				text-align: center;
			}
		}
		
		.line1{
			width:1px;
			height:60rpx;
			background:rgba(232,232,232,1);
			margin-top: 50rpx;
		}
	}

	.day-nav-tab{
		border-bottom: 1px solid #EEEEEE;
		background-color: #FFFFFF;
		width: 100%;
		
		.cu-item{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			width: 25%;
			text-align: center;
			margin: 0;
			padding: 0;
		}
		
		.text-white{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
		}	
	}
	
	.day-selectd{
		width: 100%;
		height: 146rpx;
		padding: 34rpx 0 0 20rpx;
		
		.d-1{
			width:260rpx;
			height:70rpx;
			background:rgba(250,250,250,1);
			border:1px solid rgba(231,231,231,1);
			border-radius:3rpx;
			line-height: 70rpx;
			text-align: center;
			
			.img{
				width: 32rpx;
				height: 32rpx;
				margin-left: 16rpx;
				vertical-align: middle;
			}
			
			.tit{
				vertical-align: middle;
			}
		}
		
		.d-2{
			width: 64rpx;
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: center;
			line-height: 70rpx;
		}
		
		.d-3{
			width:113rpx;
			height:70rpx;
			background:rgba(255,68,63,1);
			border-radius:3rpx;
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-align: center;
			line-height: 70rpx;
			margin-left: 13rpx;
		}
	}
	
	.detail-header{
		font-size:30rpx;
		font-family:SourceHanSansCN;
		font-weight:500;
		color:rgba(0,0,0,1);
		padding: 30rpx 0 0 19rpx;
	}
	
	.swiper-box{
		height: 100%;
		padding-top: 600rpx;
	}
	
	.tab_item{
		width: 100%;
		border-bottom: 1px solid #E7E7E7;
		
		.img{
			width:84rpx;
			height:84rpx;
			border-radius:50%;
			vertical-align: middle;
		}
		
		.d_1{
			width: 130rpx;
			text-align: center;
			height: 151rpx;
			line-height: 151rpx;
		}
		
		.d_2{
			width: 445rpx;
			padding-bottom: 28rpx;
			
			.tit1 {
				font-size:30rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				padding-top: 22rpx;
			}
			
			.tit2 {
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
			
			.tit3{
				height:30rpx;
				line-height: 30rpx;
				background:#00A390;
				border-radius:15rpx;
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(254,254,254,1);
				text-align: center;
				margin: 32rpx 0px 0px 20rpx;
				padding: 0px 20rpx 0 20rpx;
			}
		}
		
		.d_3{
			
			.tit3{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(153,153,153,1);
				text-align: center;
				padding-top: 22rpx;
			}
			
			.tit4{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
				text-align: right;
			}
		}
	}
</style>
