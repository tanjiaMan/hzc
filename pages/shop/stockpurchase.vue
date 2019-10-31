<template>
	<view class="content">
		<view id="tab-bar" class="flex-item d-nav-tab">
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" v-for="(item,index) in tabBars" 
					:class="index == tabCurrentIndex ? 'text-white cur':''" 
					:key="item.id" :id="item.id" @tap="tabClick" :data-id="index">
						{{item.name}}
				</view>
			</scroll-view>
		</view>
		
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in tabBars" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.goodsList.length === 0"></empty>
					
					 <view class="goods-list">
					 	<view 
					 		v-for="(item, index) in tabItem.goodsList" :key="index"
					 		class="goods-item"
					 		@click="navToDetailPage(item)"
					 	>
					 		<view class="image-wrapper">
					 			<image :src="item.coverPicUrl" mode="aspectFill"></image>
					 		</view>
							<text class="title clamp">{{item.name}}</text>
					 		<view class="price-box">
					 			<text class="name">零售价：<text class="price">{{item.productPrice}}</text></text>
					 			<!-- <text>已销 {{item.orderNums}}</text> -->
					 		</view>
							<view class="price-box">
								<text class="name">进货价：<text class="price">{{item.agentPrice}}</text></text>
								<!-- <text>剩余 {{item.orderNums}}</text> -->
							</view>
							<view class="ghs-box">
								<text class="name"> 供货商：</text><img class="img" :src="item.shopUserAvatarUrl" /><text class="tit1">{{item.shopUserName}}</text>
							</view>
							<view class="bt-box" @click.stop.prevent="stopPrevent" @click="navTo('/pages/shop/stockpsconfirm?productId='+item.productId)">
								<view class="bt1">进货</view>
							</view>
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
				scrollLeft:0,
				tabBars:[],
			}
		},
		onLoad(options){
			this.loadMenu();
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url
				})  
			},
			async loadMenu() {
				//加载一级分类
				this.$request.ModelHome.getCategoryByPid(0).then(result => {
					if(result != null && result.length > 0){
						this.tabBars = result;
						//加载第一个菜单的数据 TODO
						this.loadData('tabChange');
					}
				})
			},
			//获取订单列表
			async loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.tabBars[index];
				
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				if(source === 'tabChange'){ //切换重新刷新
					navItem.pageIndex = 1;
					navItem.pageSize = 10;
					navItem.goodsList = [];
					navItem.loadingType = 'more';
				}
				
				if(navItem.loadingType == 'noMore'){
					return;
				}
				
				navItem.loadingType = 'loading';
				
				let values = {classifyPid:navItem.id,pageSize:navItem.pageSize,pageIndex: navItem.pageIndex};
				let result = await this.$request.ModelHome.pageAgentProduct(values);
				let goodsList = result.records;
				goodsList.forEach(item=>{
					navItem.goodsList.push(item);
				})
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if(goodsList.length < navItem.pageSize){
					navItem.loadingType = 'noMore';
				}else{
					navItem.loadingType = 'more'; 
				}
				
				navItem.pageIndex = navItem.pageIndex + 1;
				this.tabBars[index] = navItem;
				this.tabBars = Object.assign({}, this.tabBars);
				console.log('this.tabBars',this.tabBars[index]);
			}, 
			
			//swiper 切换
			changeTab(e){
				let index = e.target.current;
				if(this.tabCurrentIndex == index){
					return;
				}
				this.scrollLeft = (index - 1) * 60;
				this.tabCurrentIndex = index;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(e){
				let index = e.currentTarget.dataset.id;
				if(this.tabCurrentIndex == index){
					return;
				}
				this.scrollLeft = (index - 1) * 60;
				this.tabCurrentIndex = index;
				this.loadData('tabChange');
			},
			//详情
			navToDetailPage(item){
				let id = item.productId;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			stopPrevent(){}
		}
	}
</script>

<style lang='scss'>
	page, .content{
		background: #FFFFFF;
		height: 100%;
	}
	
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		line-height: 60rpx;
		
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			margin-top: 24rpx;
		}
		
		.ghs-box{
			display: flex;
			align-items: center;
			
			.name{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
			
			.img{
				width: 25rpx;
				height: 25rpx;
				border-radius: 50%;
			}
			
			.tit1{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(1,1,1,1);
				margin-left: 16rpx;
			}
		}
		
		.bt-box{
			margin-top: 20rpx;
			
			.bt1{
				width:158rpx;
				height:52rpx;
				line-height:52rpx;
				text-align: center;
				background:rgba(0,163,144,1);
				border-radius:6rpx;
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
		}
		
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10rpx;
			
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(153,153,153,1);
			line-height: 44rpx;
			
			.name{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
		}
		.price{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,68,63,1);
			
			&:before{
				content: '￥';
				font-size: 24rpx;
			}
		}
	}
	
	.d-nav-tab{
		display: flex;
		width:710rpx;
		margin: 0 auto;
		padding-bottom: 20rpx;
		
		.nav .cu-item{
			height:50rpx !important;
			line-height:50rpx !important;
			color:#000000;
			font-size:25rpx;
		}
		
		.text-white{
			font-size:28rpx !important;
			font-family:SourceHanSansCN-Bold;
			font-weight:bold;
		}
		
		.nav .cu-item.cur {
		    border-bottom: none !important;
			position: relative;
			
			&:after{
				content: " ";
				width: 36rpx;
				height: 5rpx;
				background: #00A390;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);//居中处理
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
