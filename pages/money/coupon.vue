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
						:class="tabItem.state == 1 ? 'order-item uni-flex uni-row':'order-item uni-flex uni-row gray'"
					>
						<view class="flex-item v1">
							<view class="v11"><text class="tit2">{{item.couponInfo.discountPrice}}</text><text class="tit1">元</text></view>
							<view class="tit3">满{{item.couponInfo.priceThreshold}}可用</view>
						</view>
						<view class="flex-item v2">
							<view class="tit4">
								{{item.couponInfo.name}}<span class="tit4_1">平台</span>
							</view>
							<view class="v2-2">
								<view class="v2-2left">
									<view class="tit5">使用分类：商品</view>
									<view class="tit5">有效期至：{{item.couponInfo.expireDate?item.couponInfo.expireDate:'-'}}</view>
								</view>
								<view class="v2-2right">
									<view class="bt_2" v-if="tabItem.state == 1">
										<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">立即使用</navigator>
									</view>
								</view>
							</view>
							<view class="d_status" v-if="tabItem.state == 2 || tabItem.state == 0">
								<view class="titstatus">{{tabItem.state == 2?'已使用':'已过期'}}</view>
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
				navList: [{
						state: 1,
						text: '未使用',
						loadingType: 'more',
						orderList: [],
						pageSize: 100,
						pageIndex: 1
					},
					{
						state: 2,
						text: '已使用',
						loadingType: 'more',
						orderList: [],
						pageSize: 100,
						pageIndex: 1
					},
					{
						state: 0,
						text: '已过期',
						loadingType: 'more',
						orderList: [],
						pageSize: 100,
						pageIndex: 1
					},
				],
			}
		},
		onLoad(options){
			this.loadData()
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
				
				let result = await this.$request.ModelHome.getCouponRedPackage(1,navItem.state);
				let orderList = result;
				orderList.forEach(item=>{
					if(item.couponInfo.expireDate){
						item.couponInfo.expireDate = item.couponInfo.expireDate.split(' ')[0];
					}
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
	
	.gray{
		filter: grayscale(100%);
		opacity: 0.7;
	}
	
	.order-item{
		background: #FF443F;
		margin: 34rpx auto 0;
		width: 696rpx;
		height: 166rpx;
		
		.tit1{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.tit2{
			font-size:70rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.tit3{
			font-size:25rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.v1{
			width: 206rpx;
			text-align: center;
			
			.v11{
				line-height: 1;
				margin-top: 37rpx;
			}
		}
		
		.v2{
			width: 490rpx;
			padding-left: 37rpx;
			background-color: #F9F5F0;
			position: relative;
			
			.d_status{
				position: absolute;
				top: 32rpx;
				right: 48rpx;
				width: 133rpx;
				height: 105rpx;
				background-image: url('https://pic.youx365.com/couponStatusBg.png');
				background-size: cover;
				
				.titstatus{
					width: 100%;
					height: 100%;
					text-align: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #B0B0B0;
					transform: rotate(-30deg);
					padding-top: 28rpx;
				}
				
				.img-status{
					width: 100%;
					height: 100%;
				}
			}
			
			.tit4{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(51,51,51,1);
				height: 78rpx;
				vertical-align: bottom;
				display: table-cell;
			}
			
			.tit4_1{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				background:rgba(255,68,63,1);
				margin-left: 9rpx;
				padding: 4rpx 9rpx;
				border-radius: 2rpx;
			}
			
			.btzz{
				width: 104rpx;
				height: 48rpx;
				background-color: #FFC22F;
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				text-align: center;
				float: right;
				margin-right: 30px;
				border-radius: 12rpx;
			}
			
			.tit5{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(176,176,176,1);
			}
			
			.v2-2{
				display: flex;
				align-items: flex-end;
				
				.v2-2left{
					width: 290rpx;
				}
				
				.v2-2right{
					flex: 1;
					
					.bt_2{
						width:134rpx;
						height:51rpx;
						line-height:51rpx;
						background:rgba(0,163,144,1);
						border-radius: 50rpx;
						font-size:22rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(255,255,255,1);
						text-align: center;
					}
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
	
	.tab-content{
		background-color: #FFFFFF;
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
