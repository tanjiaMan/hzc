<template>
	<view class="content">
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
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
						@click="navTo('/pages/order/orderDetail?orderNum='+item.orderNum)"
					>
						<view class="i-top b-b">
							<text class="time">订单编号: {{item.orderNum}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							<!-- <text 
								@click.stop="stopPrevent"
								v-if="item.orderStatus== -10" 
								class="del-btn yticon icon-iconfontshanchu1"
								@click="deleteOrder(index)"
							></text> -->
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
						<view class="action-box b-t" v-if="item.orderStatus == 0" @click.stop="stopPrevent"> <!-- 待付款  -->
							<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
							<button class="action-btn recom" @click="payOrder(item)">立即支付</button>
						</view>
						<view class="action-box b-t" v-if="item.orderStatus == 20" @click.stop="stopPrevent"> <!-- 待发货  -->
							
						</view>
						<view class="action-box b-t" v-if="item.orderStatus == 40" @click.stop="stopPrevent"> <!-- 待收货  -->
							<button class="action-btn" @click="logistOrder(item)">查看物流</button>
							<button class="action-btn recom" @click="sureOrder(item)">确认收货</button>
						</view>
						<view class="action-box b-t" v-if="item.orderStatus == 60" @click.stop="stopPrevent"> <!-- 待评价  -->
							<button class="action-btn recom" @click="navTo('/pages/order/comment')">去评价</button>
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
	import empty from "@/components/empty";
	
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
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
					}
				],
			};
		},
		
		onLoad(options){
			this.tabCurrentIndex = options.state;
			this.loadData()
		},
		 
		methods: {
			stopPrevent(){},
			navTo(url){
				uni.navigateTo({
					url
				})  
			},
			//获取订单列表
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
				let result = await this.$request.ModelOrder.listOrder(values);
				let orderList = result.records;
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
				console.log('this.navList[index]',this.navList[index]);
			}, 

			//swiper 切换
			changeTab(e){
				if(this.tabCurrentIndex == e.target.current){
					return;
				}
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				if(this.tabCurrentIndex == index){
					return;
				}
				this.tabCurrentIndex = index;
				this.loadData('tabChange');
			},
			
			async deleteOrder(index){ //删除订单
				uni.showLoading({
					title: '请稍后'
				})
				let orderItem = this.navList[this.tabCurrentIndex].orderList[index];
				
				// await this.$request.ModelOrder
				
				this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
				console.log('delete order',orderItem);
				uni.hideLoading();
			},
			cancelOrder(item){//取消订单
				var that = this;
				uni.showModal({
				    title: '确定取消订单?',
				    success: function (res) {
				        if (res.confirm) {
							that.$request.ModelOrder.cancelOrder(item.orderNum).then(result => {
								that.loadData('tabChange');
							});
				        }
				    }
				});
			},
			payOrder(item){ //支付订单
				uni.navigateTo({
					url: '/pages/money/pay?orderNum='+item.orderNum
				})
			},
			logistOrder(item){ //查看物流
				
			},
			sureOrder(item){ //确认收货
				
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
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
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

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin: 16rpx auto 0;
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
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
