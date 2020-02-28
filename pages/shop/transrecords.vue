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
					>
						<view class="d_header">
							<image class="img" :src="item.avatarUrl" mode="aspectFill"></image>
							<view class="tit1">{{item.nickName}}</view>
						</view>
						<view class="d_goods">
							<scroll-view class="goods_item" scroll-x>
								<view class="scoll-wrapper">
									<view 
										v-for="(subpic, subin) in item.pics" :key="subin"
										class="goods_item_image"
									>
										<image class="img" :src="subpic" mode="aspectFill"></image>
										<view class="d_num">x {{item.quantity}}</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="d_bottom">
							<view v-if="tabItem.state == 1" class="tit2">转货时间 : {{item.createTime}}</view>
							<view v-if="tabItem.state == 2" class="tit2">退货时间 : {{item.createTime}}</view>
							<view v-if="tabItem.state == 3" class="tit2">发货时间 : {{item.createTime}}</view>
							<view class="bt1" @click="transDetail(item,tabItem.state)">查看详情</view>
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
						state: 1,
						text: '转货记录',
						loadingType: 'more',
						orderList: [],
						pageSize: 20,
						pageIndex: 1
					},
					{
						state: 2,
						text: '退货记录',
						loadingType: 'more',
						orderList: [],
						pageSize: 20,
						pageIndex: 1
					},
					{
						state: 3,
						text: '发货记录',
						loadingType: 'more',
						orderList: [],
						pageSize: 20,
						pageIndex: 1
					},
				],
			}
		},
		onLoad(options){
			this.tabCurrentIndex=options.active;
			this.loadData();
		},
		methods: {
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
				
				let orderList = [];
				let values = {pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
				if(navItem.state == 1){ //转货记录
					values.type = 5;
				}else if(navItem.state == 2){ //退货记录
					values.type = 3;
				}else if(navItem.state == 3){ //发货记录
					values.type = 8;
				}
				let result = await this.$request.ModelHome.getTransStockLog(values);
				result = result || {};
				orderList = result.records || [];
				orderList.forEach(item=>{
					if(item.couponInfo && item.couponInfo.expireDate){
						item.couponInfo.expireDate = item.couponInfo.expireDate.split(' ')[0];
					}
					item.pics = [];
					item.pics.push(item.coverPicUrl);
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
			transDetail(item,state){
				uni.navigateTo({
					url: `/pages/shop/transdetail?state=${state}&detail=`+JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang='scss'>
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.order-item{
		width:694rpx;
		background:rgba(255,255,255,1);
		border-radius:6rpx;
		margin: 13rpx auto;
		padding: 0 20rpx;
		
		.d_header{
			height: 94rpx;
			border-bottom: solid 1px #EBEBEB;
			display: flex;
			align-items: center;
			
			.img{
				height: 58rpx;
				width: 58rpx;
			}
			
			.tit1{
				font-size:30rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(0,0,0,1);
				margin-left: 20rpx;
			}
		}
		
		.d_goods{
			.scoll-wrapper{
				display:flex;
				align-items: flex-start;
			}
			.goods_item{
				padding-top: 20rpx;
				white-space: nowrap;
				width: 100%;
				
				.goods_item_image{
					width: 208rpx;
					margin-right: 16rpx;
					position: relative;
					
					.img{
						width:208rpx;
						height:161rpx;
						border-radius:10px;
					}
					
					.d_num{
						position: absolute;
						bottom: 0;
						left: 0;
						width:100%;
						height:39rpx;
						background:rgba(0,0,0,1);
						opacity:0.4;
						border-radius:0px 0px 10px 10px;
						font-size:26rpx;
						font-family:Source Han Sans CN;
						font-weight:400;
						color:rgba(255,255,255,1);
						text-align: center;
						line-height: 39rpx;
					}
				}
			}
		}
		.d_bottom{
			display: flex;
			padding: 20rpx 0;
			
			.tit2{
				flex: 1;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
			
			.bt1{
				width:140rpx;
				height:44rpx;
				line-height:44rpx;
				background:rgba(0,163,144,1);
				border-radius:22rpx;
				text-align: center;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.uni-swiper-item{
		height: auto;
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
