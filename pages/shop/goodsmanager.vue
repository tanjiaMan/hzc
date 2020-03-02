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
							<view class="d-check" v-if="batchOper == true">
								<view class="check-wrapper" @click.stop="stopPrevent">
									<view
										class="yticon icon-xuanzhong2 checkbox"
										:class="{checked: item.checked}"
										@click="check('item', index)"
									></view>
								</view>
							</view>
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
							<view class="price-box">
								<text class="name">库存：<text class="tit1">{{item.myStock}}</text></text>
							</view>
							<view class="ghs-box">
								<text class="name"> 供货商：</text><img class="img" :src="item.shopUserAvatarUrl" /><text class="tit1">{{item.shopUserName}}</text>
							</view>
							<view class="bt-box" @click.stop.prevent="stopPrevent">
								<view class="bt1" @click="navToTrans(item.productId)">转货</view>
								<view class="bt2" @click="navToReturn(item.productId)" v-if="transUserId == 0">退货</view>
								<view class="bt3" @click="sendGoods(item)">发货</view>
							</view>
					 	</view>
					 </view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					<view class="d-caozuoliu"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<view class="d-caozuo uni-flex uni-row">
			<view class="d-left">
				<view v-if="batchOper == false" class="bt-plcz" @click="changeBatchOper">批量操作</view>
				<view v-if="batchOper == true" class="bt-plcz" @click="navToTrans()">转货</view>
				<view v-if="batchOper == true && transUserId == 0" class="bt-th" @click="navToReturn()">退货</view>
			</view>
			<view class="d-right" v-if="transUserId == 0">
				<view @click="tranrecord(0)" class="bt-zh">转货<br/>记录</view>
				<view @click="tranrecord(1)" class="bt-zh bt-th">退货<br/>记录</view>
				<view @click="tranrecord(2)" class="bt-zh bt-th">发货<br/>记录</view>
			</view>
		</view>
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
				batchOper: false,
				transUserId:0,
			}
		},
		onLoad(options){
			this.transUserId = options.transUserId || 0; //转货
			this.loadMenu();
		},
		onShow(){
			this.loadData('tabChange');
			this.$fire.$off('refresh');	
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url
				})  
			},
			tranrecord(type){
				uni.navigateTo({
					url:`/pages/shop/transrecords?active=${type}`
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
				let result = await this.$request.ModelHome.pageAgentStock(values);
				let goodsList = result.records;
				goodsList.forEach(item=>{
					item.checked = false;
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
			stopPrevent(){},
			changeBatchOper(){
				this.batchOper = !this.batchOper;
			},
			check(type, index){
				let navItem = this.tabBars[this.tabCurrentIndex];
				
				if(type === 'item'){
					navItem.goodsList[index].checked = !navItem.goodsList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = navItem.goodsList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.tabBars[this.tabCurrentIndex] = navItem;
				this.tabBars = Object.assign({}, this.tabBars);
			},
			navToReturn(id){ //退货
				let ids = [];
				if(id){
					ids.push(id);
				}else{
					let navItem = this.tabBars[this.tabCurrentIndex];
					navItem.goodsList.forEach(item=>{
						if(item.checked){
							ids.push(item.productId);
						}
					})
				}
				if(ids.length == 0){
					return;
				}
				uni.navigateTo({
					url: `/pages/shop/goodsreturn?ids=` + JSON.stringify(ids)
				})
			},
			navToTrans(id){ //退货
				let ids = [];
				if(id){
					ids.push(id);
				}else{
					let navItem = this.tabBars[this.tabCurrentIndex];
					navItem.goodsList.forEach(item=>{
						if(item.checked){
							ids.push(item.productId);
						}
					})
				}
				if(ids.length == 0){
					return;
				}
				if(this.transUserId == 0){
					uni.navigateTo({
						url: `/pages/shop/goodstransaccount?ids=` + JSON.stringify(ids)
					})
				}else{
					uni.navigateTo({
						url: `/pages/shop/goodstransconfirm?transUserId=${this.transUserId}&ids=`+JSON.stringify(ids)
					})
				}
			},
			sendGoods(item){
				if(item.myStock <= 0){
					this.$api.msg('没有库存,不可发货');
					return;
				}
				let orderProducts = [];
				orderProducts.push({
					productId: item.productId,
					productSpecId: item.productSpecId,
					quantity: 1
				})
				uni.navigateTo({
					url: '/pages/order/createOrder?source=agent&order=' + JSON.stringify(orderProducts)
				});
				//监听数据
				var that = this;
				this.$fire.$on('refresh', function (data) {
				 	console.log('refresh - '+data);
					that.$fire.$off('refresh');
					that.loadData('tabChange');
				});
			},
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
			display: flex;
			
			.bt1{
				width:106rpx;
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
			
			.bt2{
				width:106rpx;
				height:52rpx;
				line-height:52rpx;
				text-align: center;
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,163,144,1);
				border:2rpx solid rgba(0,163,144,1);
				border-radius:6rpx;
				margin-left: 6rpx;
			}
			
			.bt3{
				width:106rpx;
				height:52rpx;
				line-height:52rpx;
				text-align: center;
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:#FF443F;
				border:2rpx solid #FF443F;
				border-radius:6rpx;
				margin-left: 6rpx;
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
			
			.tit1{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(1,1,1,1);
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
	
	.d-check{
		.check-wrapper{
			.checked{
				color: #00A390 !important;
			}
			
			.checkbox{
				font-size: 44rpx;
				line-height: 70rpx;
				text-align: center;
				color: $font-color-disabled;
			}
		}
	}
	.d-caozuoliu{
		height: 109rpx;
	}
	.d-caozuo{
		width: 750rpx;
		height: 109rpx;
		background-color: #F1F1F1;
		position: fixed;
		left: 0;
		bottom: 0;
			
		.d-left{
			flex: 1;
			display: flex;
			padding-left: 40rpx;
			align-items: center;
			
			.bt-plcz{
				width: 150rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				background-color: #FF443F;
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				border-radius: 50rpx;
			}
			
			.bt-th{
				margin-left: 25rpx;
				width:150rpx;
				height:56rpx;
				line-height:56rpx;
				text-align: center;
				border:2rpx solid rgba(255,68,63,1);
				border-radius:28rpx;
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
			}
		}
		
		.d-right{
			display: flex;
			align-items: center;
			
			.bt-zh{
				width:80rpx;
				height:80rpx;
				background:rgba(255,255,255,1);
				box-shadow:0px 7px 18px 0px rgba(178, 178, 178, 0.35);
				border-radius:50%;
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				text-align: center;
				line-height: 1.2;
				padding-top: 15rpx;
			}
			
			.bt-th{
				margin-left: 30rpx;
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
