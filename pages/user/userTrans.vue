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
					
					<!-- 转货 -->
					<view class="tans-item" v-for="(item,index) in tabItem.orderList" :key="index" v-if="tabItem.state == 0">
						<view class="zh-item uni-flex uni-row">
							<view class="pic flex-item">
								<img class="img" :src="item.coverPicUrl" />
							</view>
							<view class="desc flex-item">
								<view class="tit1">{{item.productName}}</view>
								<view class="tit4">零售价<text class="tit2">￥</text><text class="tit3">{{item.productPrice}}</text></view>
								<view class="tit4">进货价<text class="tit2">￥</text><text class="tit3">{{item.price}}</text></view>
							</view>
							<view class="num flex-item">
								<!-- 已销 25 剩余 127 -->
							</view>
						</view>
						<view class="tit-border-none tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-num.png" />转账金额：{{item.price * item.quantity}}
						</view>
						<view class="tit-border-none tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-people.png" />收账人：<img class="header" :src="item.avatarUrl" /> {{item.nickName}} {{item.mobile}}
						</view>
						<view class="tit-border-none tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-time.png" />转账时间：{{item.createTime}}
						</view>
					</view>
					
					<!-- 转账 -->
					<view class="tans-item" v-for="(item,index) in tabItem.orderList" :key="index" v-if="tabItem.state == 1">
						<view class="tit-num tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-num.png" />转账金额：{{item.amountBalance * -1}}
						</view>
						<view class="tit-name tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-people.png" />收账人：<img class="header" :src="item.avatarUrl" /> {{item.nickName}} {{item.mobile || ''}}
						</view>
						<view class="tit-border-none tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-time.png" />转账时间：{{item.createTime}}
						</view>
					</view>
					
					<!-- 转红包 -->
					<view class="tans-item" v-for="(item,index) in tabItem.orderList" :key="index" v-if="tabItem.state == 2">
						<view class="order-item uni-flex uni-row">
							<view class="flex-item v1">
								<view class="v11"><text class="tit1">¥</text><text class="tit2">{{item.couponInfo.discountPrice}}</text></view>
								<!-- <view class="tit3">剩余 {{item.couponInfo.leftStock}} 个</view> -->
							</view>
							<view class="flex-item v2">
								<view class="tit4">
									 满{{item.couponInfo.priceThreshold>0?item.couponInfo.priceThreshold:item.couponInfo.discountPrice}}可用
								</view>
								<view>
									<text class="tit5">有效期至：{{item.couponInfo.expireDate}}</text>
								</view>
							</view>
						</view>
						<view class="tit-num tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-num.png" />转赠数量：{{item.num}}
						</view>
						<view class="tit-name tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-people.png" />受赠人：<img class="header" :src="item.refAvatarUrl" /> {{item.refNickName}}
						</view>
						<view class="tit-border-none tit-item">
							<img class="logo" src="https://pic.youx365.com/utrans-time.png" />受赠时间：{{item.createTime}}
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
				transUserId: 0,
				navList: [{
						state: 0,
						text: '转货',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 1,
						text: '转账',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 2,
						text: '转红包',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1
					},
				],
			}
		},
		onLoad(options){
			this.transUserId = options.transUserId;
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
				
				let orderList = [{},{},{}];
				if(navItem.state == 0){ //转货记录
					let values = {refUserId: this.transUserId,pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
					let result = await this.$request.ModelHome.getTransStockLog(values);
					result = result || {};
					orderList = result.records || [];
				}else if(navItem.state == 1){ //转账记录
					let values = {refUserId: this.transUserId,pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
					let result = await this.$request.ModelUser.pageTransLog(values);
					result = result || {};
					orderList = result.records || [];
				}else if(navItem.state == 2){ //转红包记录
					let values = {refUserId: this.transUserId,pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
					let result = await this.$request.ModelHome.logCouponRedPackage(values);
					result = result || {};
					orderList = result.records || [];
				}
				
				orderList.forEach(item=>{
					if(item.couponInfo && item.couponInfo.expireDate){
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
	
	.tans-item{
		background-color: #FFFFFF;
		width: 712rpx;
		margin: 24rpx auto 0;
		border-radius:4rpx;
	}
	
	.tit-item{
		font-size:22rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(51,51,51,1);
		width: 651rpx;
		margin: 0 auto;
		height: 64rpx;
		line-height: 64rpx;
		border-bottom: solid 1px #DDDDDD;
		display: flex;
		align-items: center;
		
		.logo{
			width: 24rpx;
			height: 24rpx;
			margin-right: 20rpx;
		}
		
		.header{
			width: 32rpx;
			height: 32rpx;
			border-radius:50%;
			margin-right: 20rpx;
		}
	}
		
	.tit-border-none{
		border-bottom: none !important;
	}
	
	.zh-item{
		height: 169rpx;
		width: 651rpx;
		margin: 0 auto;
		border-bottom: solid 1px #DDDDDD;
		
		.pic{
			display: flex;
			align-items: center;
			.img{
				width: 105rpx;
				height: 108rpx;
				margin-left: 20rpx;
				margin-right: 30rpx;
			}
		}
		
		.desc{
			.tit1{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				margin-top: 20rpx;
				margin-bottom: 4rpx;
				width: 300rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.tit4{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(96,96,96,1);
				line-height: 1.4;
			}
			.tit2{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
			}
			.tit3{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
			}
		}
		
		.num{
			font-size:22rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(96,96,96,1);
			margin-top: 20rpx;
		}
	}
	
	.order-item{
		background: #fff;
		width: 712rpx;
		height: 156rpx;
		border-radius: 10rpx;
		background-image: url('https://pic.youx365.com/rp-bg.png');
		background-size: cover;
		
		.tit1{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.tit2{
			font-size:68rpx;
			font-family:SourceHanSansCN;
			font-weight:bold;
			color:rgba(255,255,255,1);
			margin-left: 20rpx;
		}
		
		.tit3{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.v1{
			width: 224rpx;
			text-align: center;
			
			.v11{
				line-height: 1;
				margin-top: 37rpx;
			}
		}
		
		.v2{
			width: 488rpx;
			padding-left: 40rpx;
			
			.tit4{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				height: 78rpx;
				vertical-align: bottom;
				display: table-cell;
			}
			
			.tit5{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height: 78rpx;
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
