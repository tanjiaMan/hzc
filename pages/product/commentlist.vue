<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex == index}"
				@click="tabClick(index)"
			>
				{{item.text}}({{item.total}})
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
						class="eva-box uni-flex uni-row"
					>
						<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
						<view class="right">
							<view style="display: flex;">
								<text class="name">Leo yo</text>
								<text class="time">2019-08-25 13:20</text>
							</view>
							<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
							<scroll-view class="floor-list" scroll-x>
								<view class="scoll-wrapper">
									<view 
										v-for="(item, index) in 6" :key="index"
										class="floor-item"
									>
										<image src="https://pic.youx365.com/shop1.png" mode="aspectFill"></image>
									</view>
								</view>
							</scroll-view>
							<!-- <view class="bot">
								<text class="attr">购买类型：XL 红色</text>
								<text class="time">2019-04-01 19:21</text>
							</view> -->
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
				productId:0,
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1,
						total:10,
					},{
						state: 1,
						text: '最新',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1,
						total:10,
					},
					{
						state: 2,
						text: '有图',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1,
						total:4,
					}
				],
			}
		},
		onLoad(options){
			this.productId = options.id;
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
				
				let values = {flowType: 2,balanceFlow: navItem.balanceFlow,pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
				let orderList = [{},{},{}];
				orderList.forEach(item=>{
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
		}
	}
</script>

<style lang='scss'>
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	.tab-content{
		padding: 40rpx;
		background-color: #FFFFFF;
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 64rpx;
			height: 64rpx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26rpx;
			
			.time{
				font-size:25rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(155,155,155,1);
			}
			
			.name{
				flex: 1;
			}
			
			.name span{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.con{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(102,102,102,1);
				padding: 20rpx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
			
			.floor-list{
				white-space: nowrap;
				width: 560rpx;
			}
			.scoll-wrapper{
				display:flex;
				align-items: flex-start;
			}
			.floor-item{
				width: 168rpx;
				margin-right: 26rpx;
				
				image{
					width: 168rpx;
					height: 168rpx;
					border-radius: 10rpx;
				}
				
				img{
					width: 168rpx;
					height: 168rpx;
					border-radius: 10rpx;
				}
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
