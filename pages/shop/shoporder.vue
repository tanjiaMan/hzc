<template>
	<view class="container">
		<view class="static">
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
				<view class="flex-item d-3" @click="search">查询</view>
			</view>
		</view>
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex == index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<view class="order-count" v-if="tabItem.orderList.length > 0">{{tabItem.total}}个</view>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
						@click="navTo('/pages/order/orderDetail')"
					>
						<view class="i-top b-b">
							<text class="time">订单编号: {{item.orderNum}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
						</view>
						
						<scroll-view v-if="item.orderDetails.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.orderDetails" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.coverPicUrl" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.orderDetails.length == 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.orderDetails" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.coverPicUrl" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.productName}}</text>
								<text class="attr-box">{{goodsItem.specificationName != null? goodsItem.specificationName:''}}  x {{goodsItem.productQuantity}}</text>
								<text class="price">{{goodsItem.productPrice}}</text>
							</view>
						</view>
						<view class="price-box">
							共
							<text class="num">{{item.totalQuantity}}</text>
							件商品 合计
							<text class="price">{{item.totalPrice}}</text>
						</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
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
				//时间选择
				dayTabCur:0,
				dayTabBars:[{name: '全部',id:0},{name: '昨天',id:1},{name: '今天',id:2},{name: '近七天',id:3}],
				
				//订单状态选择
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: [],
						payState: null,
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: [],
						payState: 0,
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'more',
						orderList: [],
						payState: 20,
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'more',
						orderList: [],
						payState: 40,
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 4,
						text: '待评价',
						loadingType: 'more',
						orderList: [],
						payState: 60,
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 5,
						text: '退款',
						loadingType: 'more',
						orderList: [],
						payState: 80,
						pageSize: 10,
						pageIndex: 1
					}
				],
				
				startDate: null,
				endDate: null,
			};
		},
		onShow(){
			this.loadData()
		},
		methods: {
			stopPrevent(){},
			navTo(url){
				uni.navigateTo({
					url
				})  
			},
			bindStartDateChange: function(e) {
				this.startDate = e.target.value;
				this.dayTabCur = -1;
			},
			bindEndDateChange: function(e) {
				this.endDate = e.target.value
				this.dayTabCur = -1;
			},
			funData(aa){
				var date1 = new Date();
				var time1 = date1.getFullYear()+ "-" + (date1.getMonth()+1) + "-" + date1.getDate();
				if(aa == 0){
					return time1;
				}
				var date2 = new Date(date1);
				date2.setDate(date1.getDate() + aa);
				var time2 = date2.getFullYear() + "-" + (date2.getMonth()+1) + "-" + date2.getDate();
				return time2;
			},
			//菜单切换
			dayTabSelect(e){
				if(this.dayTabCur == e.currentTarget.dataset.id){
					return;
				}
				this.dayTabCur = e.currentTarget.dataset.id;
				if(this.dayTabCur == 1){ //今天
					this.startDate = this.funData(-1);
					this.endDate = this.funData(-1);
				}else if(this.dayTabCur == 2){ //昨天
					this.startDate = this.funData(0);
					this.endDate = this.funData(0);
				}else if(this.dayTabCur == 3){ //近7天
					this.endDate = this.funData(0);
					this.startDate = this.funData(-7);
				}else{ //全部
					this.startDate = null;
					this.endDate = null;
				}
				this.loadData('tabChange');
			},
			tabClick(index){
				if(this.tabCurrentIndex == index){
					return;
				}
				this.tabCurrentIndex = index;
				this.loadData('tabChange');
			},
			search(){ //时间查询
				this.loadData('tabChange');
			},
			changeTab(e){
				if(this.tabCurrentIndex == e.target.current){
					return;
				}
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			async loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				if(source === 'tabChange'){ //切换重新刷新
					navItem.pageIndex = 1;
					navItem.orderList = [];
					navItem.loadingType = 'more';
				}
				
				if(navItem.loadingType == 'noMore'){
					return;
				}
				
				navItem.loadingType = 'loading';
				
				let values = {pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
				if(navItem.payState != null){
					values['orderStatus'] = navItem.payState;
				}
				if(this.startDate){
					values['startT'] = this.startDate + ' 00:00:00';
				}
				if(this.endDate){
					values['endT'] = this.endDate + ' 23:23:23';
				}
				let result = await this.$request.ModelOrder.listOrderMsg(values);
				let orderList = result.records || {};
				navItem.total = result.total || 0;
				orderList.forEach(item=>{
					item = Object.assign(item, this.orderStateExp(item.orderStatus));
					navItem.orderList.push(item);
				})
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if(orderList.length < navItem.pageSize){
					navItem.loadingType = 'noMore';
				}else{
					navItem.loadingType = 'more'; 
				}
				
				navItem.pageIndex = navItem.pageIndex + 1;
				this.navList[index] = navItem;
			},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case -10:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
					case 0:
						stateTip = '待付款';break;
					case 20:
						stateTip = '待发货'; break;
					case 40:
						stateTip = '待收货'; break;
					case 60:
						stateTip = '已收货';break;
					case 80:
						stateTip = '待评价';break;
					//更多自定义
				}
				return {stateTip, stateTipColor};
			}
		}
	}
</script>

<style lang='scss'>
	page, .container{
		background: $page-color-base;
		height: 100%;
	}
	
	.container{
		display: flex;
		flex-direction: column;
	}
	
	.static{
		background-color: #fff;
		z-index: 1;
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
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			position: relative;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(68,68,68,1);
			
			&.current{
				color: #00A390;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #00A390;
				}
			}
		}
	}
	
	.swiper-box{
		background-color: #EFEFEF;
		flex: 1;
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.order-count{
		width: 696rpx;
		margin: 18rpx auto 0;
		font-size:24rpx;
		font-family:Adobe Heiti Std;
		font-weight:normal;
		color:rgba(255,68,63,1);
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin: 18rpx auto 0;
		width: 710rpx;
		border-radius: 10rpx;
		
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(237,35,35,1);
					&:before{
						content: '￥';
						font-size: 24rpx;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
</style>
