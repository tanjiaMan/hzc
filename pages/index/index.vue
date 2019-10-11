<template>
	<view class="container uni-tab-bar">
		<!-- 登陆校验 -->
		<cu-login :inviteUserId = "inviteUserId"></cu-login>
		<!-- 头部导航 -->
		<view class="carousel-section">
			<cu-search bgColor="bg-gradual-header"></cu-search>
			
			<!-- 头部导航 -->
			<view class="uni-flex uni-row d-nav">
                <view id="tab-bar" class="flex-item d-nav-tab">
					<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
						<view class="cu-item" v-for="(item,index) in tabBars" 
							:class="index == TabCur ? 'text-white cur':''" 
							:key="item.id" :id="item.id" @tap="tabSelect" :data-id="index">
								{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="flex-item d-nav-more" @click="navToCategory">
					<text class="lg text-white cuIcon-unfold"></text>
				</view>
               <view class="flex-item d-nav-notice">
				   <view class="uni-flex uni-row" @click="navToLogin('/pages/notice/message')">
					   <view class="flex-item d-avatar">
						   <img  src='https://pic.youx365.com/notice.png' />
						   <view class="cu-tag badge">1</view>
					   </view>
					   <view class="flex-item d_title">
						   消息
					   </view>
				    </view>
				</view>
            </view>
		</view>
		
		<!-- 详细内容 -->
		<swiper :current="TabCur" class="swiper-box" @change="changeTab">
			<swiper-item v-for="(item,index) in tabBars" :key="index">
				<scroll-view class="list" scroll-y>
					<!-- 头部广告 -->
					<view class="v-ad" v-if="newsitems[TabCur] && newsitems[TabCur].banner && newsitems[TabCur].banner.length > 0">
						<swiper class="carousel" circular 
						indicator-dots='true' indicator-active-color="#00A08E" indicator-color="#fff" 
						autoplay="true" interval="3000" duration="1000">
							<swiper-item v-for="(item, index) in newsitems[TabCur].banner" :key="index" class="carousel-item" @click="navToDetailPage(item.id)">
								<image :src="item.picUrl" />
							</swiper-item>
						</swiper>
					</view>
					
					<!-- 中部分类菜单 -->
					<scroll-view class="cate-section1" scroll-x >
						<view class="scoll-wrapper" v-if="newsitems[TabCur] && newsitems[TabCur].menu && newsitems[TabCur].menu.length > 0">
							<view class="cate-item" @click="navTo('/pages/product/list?id='+item.id + '&name='+item.name)" v-for="(item,index) in newsitems[TabCur].menu" :key="index">
								<image :src="item.picUrl"></image>
								<text>{{item.name}}</text>
							</view>
						</view>
					</scroll-view>
					
					
					<!-- 今日头条 -->
					<view class="d-toutiao uni-flex uni-row">
					    <view class="flex-item d-title">
							<img src='https://pic.youx365.com/toutiao_1.png' />
							<img src='https://pic.youx365.com/toutiao_2.png' />
							<img src='https://pic.youx365.com/toutiao_3.png' />
						</view>
						<view class="flex-item d-news" @click="getnewsMore">
							<uni-notice-bar :show-get-more="true" :single="true" 
							text="年末大礼：uni-app1.4 新增百度、支付宝小程序。插件市场重磅上线！"></uni-notice-bar>
						</view>
					</view>
					
					<!-- 秒杀楼层 -->
					<view class="seckill-section" v-if="newsitems[TabCur] && newsitems[TabCur].seckill && newsitems[TabCur].seckill.length > 0">
						<view class="s-header_1">
							<img class='s-h-img' src="https://pic.youx365.com/ms_header.png" />
						</view>
						<view class="s-header">
							<img src='https://pic.youx365.com/time.png' />
							<text class="tip">距离结束时间：</text>
							<text class="hour timer">07</text>
							<text class="minute timer">13</text>
							<text class="second timer">55</text>
						</view>
						<scroll-view class="floor-list" scroll-x>
							<view class="scoll-wrapper">
								<view 
									v-for="(item, index) in newsitems[TabCur].seckill" :key="index"
									class="floor-item"
									@click="navToDetailPage(item.productId)"
								>
									<image :src="item.coverPicUrl" mode="aspectFill"></image>
									<text class="title clamp">{{item.productName}}</text>
									<view class="uni-flex uni-row">
										<view class="flex-item">
											<text class="price">￥{{item.seckillPrice}}</text>		
										</view>
										<view class="flex-item">
											<text class="price_gray">￥{{item.productPrice}}</text>
										</view>
									</view>
									<view class="goods_rate uni-flex uni-row">
										<view class='goods_rate_1 flex-item'>已抢{{item.seckillQuantity}}件</view>
										<view class="goods_rate_2 flex-item">{{item.seckillRate}}%</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					
					<!-- start 砍价专区 -->
					<!-- <view class="f-header" v-if="newsitems[TabCur] && newsitems[TabCur].groupbuy && newsitems[TabCur].groupbuy.length > 0">
						<view class="tit-frame">
							<text class="tit">砍价专区</text>
							<text class="tit1">|</text>
							<text class="tit2">亲友砍价，免费拿</text>
						</view>
						<img src="https://pic.youx365.com/goods.png" />
						<view class="tit-frame">
							<text class="tit3">更多</text>
						</view>
					</view>
					<view class="tg-floor" v-if="newsitems[TabCur] && newsitems[TabCur].groupbuy && newsitems[TabCur].groupbuy.length > 0">
						<uni-swiper-dot :info="newsitems[TabCur].groupbuy" :current="tgCurrent" mode="long" :dots-styles="dotsStyles" field="content">
							<swiper :style="tgFrameHeight" class="swiper-box-tg" @change="tgSwitch">
								<swiper-item v-for="(item, index) in newsitems[TabCur].groupbuy" :key="index">
									<view class="tg-list">
										<view class="tg-goods-item uni-flex uni-row" v-for="o in item" :key="o.id" @click="navToDetailPage(o.id)">
											<view class="tg-img flex-item">
												<img :src="o.coverPicUrl" />
											</view>
											<view class="tg-text flex-item">
												<view class="tit1">{{o.productName}}</view>
												<view class="uni-flex uni-row">
													<view class="flex-item tit2">￥ {{o.groupbuyPrice}}</view>
													<view class="flex-item tit3">已拼{{o.joinOpenedCount}}件</view>
												</view>
												<view class="uni-flex uni-row">
													<view class="flex-item pic1">
														<view class="cu-avatar round" v-for="(item,index) in o.latestJoinedAvatars" :key="index" :style="[{ backgroundImage:'url(' + item + ')' }]"></view>
													</view>
													<view class="flex-item tit4">等购买了此商品</view>
												</view>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view> -->
					<!-- end 砍价专区 -->
					
					<!-- start 团购优惠 -->
					<view class="f-header" v-if="newsitems[TabCur] && newsitems[TabCur].groupbuy && newsitems[TabCur].groupbuy.length > 0">
						<view class="tit-frame">
							<text class="tit">团购优惠</text>
							<text class="tit1">|</text>
							<text class="tit2">拼团抢购 实惠到家</text>
						</view>
						<img src="https://pic.youx365.com/goods.png" />
						<view class="tit-frame">
							<text class="tit3">更多</text>
						</view>
					</view>
					<view class="tg-floor" v-if="newsitems[TabCur] && newsitems[TabCur].groupbuy && newsitems[TabCur].groupbuy.length > 0">
						<uni-swiper-dot :info="newsitems[TabCur].groupbuy" :current="tgCurrent" mode="long" :dots-styles="dotsStyles" field="content">
							<swiper :style="tgFrameHeight" class="swiper-box-tg" @change="tgSwitch">
								<swiper-item v-for="(item, index) in newsitems[TabCur].groupbuy" :key="index">
									<view class="tg-list">
										<view class="tg-goods-item uni-flex uni-row" v-for="o in item" :key="o.id" @click="navToDetailPage(o.productId)">
											<view class="tg-img flex-item">
												<img :src="o.coverPicUrl" />
											</view>
											<view class="tg-text flex-item">
												<view class="tit1">{{o.productName}}</view>
												<view class="uni-flex uni-row">
													<view class="flex-item tit2">￥ {{o.groupbuyPrice}}</view>
													<view class="flex-item tit3">已拼{{o.joinOpenedCount}}件</view>
												</view>
												<view class="uni-flex uni-row">
													<view class="flex-item pic1">
														<view class="cu-avatar round" v-for="(item,index) in o.latestJoinedAvatars" :key="index" :style="[{ backgroundImage:'url(' + item + ')' }]"></view>
													</view>
													<view class="flex-item tit4">等购买了此商品</view>
												</view>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view>
					<!-- end 团购优惠 -->
					
					<!-- start 爆款推荐 -->
					<view class="f-header" v-if="newsitems[TabCur] && newsitems[TabCur].bkgoods && newsitems[TabCur].bkgoods.length > 0">
						<view class="tit-frame">
							<text class="tit">爆款推荐</text>
							<text class="tit1">|</text>
							<text class="tit2">超值优惠 物超所值</text>
						</view>
						<img src="https://pic.youx365.com/goods.png" />
						<view class="tit-frame">
							<text class="tit3">更多</text>
						</view>
					</view>
					<view class="hot-floor" v-if="newsitems[TabCur] && newsitems[TabCur].bkgoods && newsitems[TabCur].bkgoods.length > 0">
						<view class="floor-img-box">
							<image class="floor-img" src="https://pic.youx365.com/5@2x.png" mode="scaleToFill"></image>
						</view>
						<uni-swiper-dot :info="newsitems[TabCur].bkgoods" :current="bkCurrent" mode="long" :dots-styles="dotsStyles" field="content">
							<swiper @change="bkSwitch" style="height: 350rpx;">
								<swiper-item v-for="(item, index) in newsitems[TabCur].bkgoods" :key="index">
									<view class="bk-list">
										<view class="uni-flex uni-row">
										    <view class="flex-item bk_frame" v-for="o in item" :key="o.id" @click="navToDetailPage(o.id)">
												<view :class="'bk_index bk_index_' + (o.index%3) "></view>
												<text class="bk_index_text">{{o.index}}</text>
												<image :src="o.coverPicUrl" mode="aspectFill"></image>
												<text class="title clamp">{{o.name}}</text>
												<text class="price">￥{{o.price}}</text>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view>
					<!-- end 爆款推荐 -->
					
					<!-- 热销单品 -->
					<view class="rx_header m-t" v-if="newsitems[TabCur] && newsitems[TabCur].rxgoods && newsitems[TabCur].rxgoods.length > 0">
						<image src="https://pic.youx365.com/rx_img.png"></image>
						<view class="tit-frame" style="width: 430rpx;">
							<text class="tit1">|</text>
							<text class="tit2">精彩商品不容错过</text>
						</view>
						<view class="tit-frame">
							<text class="tit3">更多</text>
						</view>
					</view>
					<view class="guess-section" v-if="newsitems[TabCur] && newsitems[TabCur].rxgoods && newsitems[TabCur].rxgoods.length > 0">
						<view 
							v-for="(item, index) in newsitems[TabCur].rxgoods" :key="index"
							class="guess-item"
							@click="navToDetailPage(item.id)"
						>
							<view class="image-wrapper">
								<image :src="item.coverPicUrl" mode="aspectFill"></image>
							</view>
							 <view class="uni-flex uni-row" style="width: 100%;">
							    <view class="flex-item" style="width: 50%;">
									<text class="price">￥{{item.price}}</text>
								</view>
							    <view class="flex-item" style="width: 50%;text-align: right;">
									<text class="buysum">{{item.orderNums}}人已付款</text>
								</view>
							 </view>
							<text class="title clamp">{{item.name}}</text>
						</view>
					</view>
					<view style="height: 60rpx;"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>

	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import {mapState,mapMutations} from 'vuex';  

	export default {
		components: {
			uniNoticeBar,uniSwiperDot
		},
		computed: {
			...mapState(['hasLogin','userInfo','firstMenu'])
		},
		data() {
			return {
				dotsStyles: {
					backgroundColor: '#DBDBDB',
					border: '1px #DBDBDB solid',
					color: '#fff',
					selectedBackgroundColor: '#00A390',
					selectedBorder: '1px #00A390 solid'
				},
				
				//高度 3个： 760,2: 520, 1:  140 rpx
				tgFrameHeight: 'height: 520rpx !important;',
				
				//团购
				tgCurrent: 0,
				
				//爆款
				bkCurrent: 0,	
					
				
				//头部菜单
				isClickChange: false,
				TabCur: 0,
				scrollLeft: 0,
				newsitems: [], //每页加载的数据
				tabBars: this.firstMenu,
				
				inviteUserId:null,
			};
		},
		methods: {
			...mapMutations(['setFirstMenu']),
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {				
				//加载一级分类
				this.$request.ModelHome.getCategoryByPid(0).then(result => {
					if(result != null && result.length > 0){
						this.setFirstMenu(result);
						this.tabBars = result;
						//加载第一个菜单的数据
						this.loadSubData(result[0].id);
					}
				})
			},
			async loadSubData(pid){ //pid 一级分类ID
				let subData = this.newsitems[this.TabCur];
				if(subData == null){
					subData = {};
				}
				
				//加载子菜单
				let menu = await this.$request.ModelHome.getCategoryByPid(pid);
				subData.menu = menu;
				
				//加载banner
				let banner = await this.$request.ModelHome.getBanner(pid);
				subData.banner = banner;
				
				//获取秒杀
				let seckill = await this.$request.ModelHome.getSeckill({classifyPid: pid});
				if(seckill && seckill.records && seckill.records.length>0){
					subData.seckill = seckill.records;
				}
				
				//团购优惠
				let groupbuy = await this.$request.ModelHome.getGroupBuy({classifyPid: pid,pageSize:9});
				
				this.tgFrameHeight = 'height: 0px !important;'
				
				if(groupbuy && groupbuy.records && groupbuy.records.length>0){
					//高度 3个： 760,2: 520, 1:  140 rpx
					if(groupbuy.records.length == 1){
						// #ifndef H5
						this.tgFrameHeight = 'height: 260rpx !important;'
						// #endif
						// #ifdef H5
						this.tgFrameHeight = 'height: 130px !important;'
						// #endif
					}else if(groupbuy.records.length == 2){
						// #ifndef H5
						this.tgFrameHeight = 'height: 520rpx !important;'
						// #endif
						// #ifdef H5
						this.tgFrameHeight = 'height: 260px !important;'
						// #endif
					}else{
						// #ifndef H5
						this.tgFrameHeight = 'height: 760rpx !important;'
						// #endif
						// #ifdef H5
						this.tgFrameHeight = 'height: 380px !important;'
						// #endif
					}
					let info = [],temp = [];
					let index = 0;
					for(var i=0;i<groupbuy.records.length;i++){
						if(index > 2){
							info.push(temp);
							temp = [];index = 0;
						}
						temp.push(groupbuy.records[i]);
						index ++;
					}
					if(temp.length != 0){
						info.push(temp);
					}
					subData.groupbuy = info;
					this.tgCurrent = 0;
				}
				
				//爆款推荐
				let bkgoods = await this.$request.ModelHome.getGoodsList({classifyPid:pid,pageSize:9,orderBySort:true,direction: true});
				if(bkgoods && bkgoods.records && bkgoods.records.length > 0){
					let info = [],temp = [];
					let index = 0;
					for(var i=0;i<bkgoods.records.length;i++){
						if(index > 2){
							info.push(temp);
							temp = [];index = 0;
						}
						bkgoods.records[i].index = i + 1;
						temp.push(bkgoods.records[i]);
						index ++;
					}
					if(temp.length != 0){
						info.push(temp);
					}
					subData.bkgoods = info;
					this.bkCurrent = 0;
				}
				
				let rxgoods = await this.$request.ModelHome.getGoodsList({classifyPid:pid,pageSize:6,orderBySell:true,direction: true});
				if(rxgoods && rxgoods.records && rxgoods.records.length > 0){
					subData.rxgoods = rxgoods.records;
				}
				
				this.newsitems[this.TabCur] = subData;
				this.newsitems = Object.assign({}, this.newsitems);
				console.log('this.newsitems',this.newsitems);
			},
			navToLogin(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			navToCategory(){
				uni.switchTab({
					url: `/pages/category/category`
				})
			},
			//团购切换
			async tgSwitch(e){
				this.tgCurrent = e.detail.current
			},
			//爆款
			async bkSwitch(e){
				this.bkCurrent = e.detail.current
			},
			// 头部菜单切换
			async tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.isClickChange = true;
	
				let firstCat = this.tabBars[this.TabCur];
				this.loadSubData(firstCat.id);
			},
			async changeTab(e) {
				let index = e.target.current;
								
				if (this.isClickChange) {
					this.TabCur = index;
					this.isClickChange = false;
					return;
				}
				
				this.scrollLeft = (index - 1) * 60;
				this.isClickChange = false;
				this.TabCur = index;
				
				let firstCat = this.tabBars[index];
				this.loadSubData(firstCat.id);
			},
			getnewsMore(){
				this.$api.msg('get news more');
				this.navTo('/pages/article/list');
			}
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		onShareAppMessage() { //设置分享
			return {
				title: '欢迎来到社集优选',
				path: '/pages/index/index?inviteUserId=' + this.userInfo.id
			}
		},
		onLoad(options){
			this.inviteUserId = options.inviteUserId;
			this.loadData();
		},
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}
	page{
		
	}
	/* #endif */
	
	.cate-section{
		position:relative;
		z-index:5;
		border-radius:16upx 16upx 0 0;
		width:710rpx;
		margin:16rpx auto 0;
	}
	.carousel-section{
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
		.carousel{
			.carousel-item{
				padding: 0;
			}
		}
		.swiper-dots{
			left:45upx;
			bottom:40upx;
		}
	}
	
	
	page {
		background: #00A08E;
	}
	.container{
		height: 100vh;
	}
	
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 710rpx;
		height: 350upx;
		margin: 0 auto;

		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 30upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section1{
		white-space: nowrap;
		padding: 30upx 22upx;
		background: #fff;
		border-radius: 16rpx 16rpx 0 0;
		width: 710rpx;
		margin: 16rpx auto 0;
		
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
		
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			font-family:SourceHanSansCN-Regular;
			font-weight:400;
			margin: 0 20rpx 0 20rpx;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width:96rpx;
			height:96rpx;
			margin-bottom:14rpx;
		}
	}
	
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			font-family:SourceHanSansCN-Regular;
			font-weight:400;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width:96rpx;
			height:96rpx;
			margin-bottom:14rpx;
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		width:710rpx;
		margin:16rpx auto;
		border-radius:16rpx;

		.s-h-img{
			height: 186rpx;
			width: 658rpx;
		}
		
		.s-header_1{
			height: 186rpx;
			width: 658rpx;
		}
		
		.s-header{
			display:flex;
			align-items:center;
			line-height: 1;
			position:absolute;
			margin-top:-68rpx;
			margin-left:96px;
			
			>img{
				width: 17rpx;
				height: 17rpx;
			}
			.tip{
				font-size:18rpx;
				color:rgba(243,243,243,1);
				margin:0 6rpx 0 6rpx;
			}
			.timer{
				display:inline-block;
				width:26rpx;
				height:26rpx;
				text-align:center;
				line-height:26rpx;
				margin-right:14rpx;
				font-size:19rpx;
				color:#007366;
				border-radius:2px;
				background:#FFFFFF;
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 168rpx;
			margin-right: 26rpx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 168rpx;
				height: 168rpx;
				border-radius: 10rpx;
			}
			
			.clamp{
				font-size: 22rpx;
				font-family:SourceHanSansCN-Regular;
				font-weight:400;
				color: #121212;
			}
			
			.price{
				font-size: 22rpx;
				color: #FF443F;
				font-weight:500;
			}
			
			.price_gray{
				font-size: 18rpx;
				font-weight: 500;
				text-decoration:line-through;
				color: #A8A8A8;
				margin-left: 8rpx;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		padding: 0rpx 0rpx 30rpx 53rpx;
		margin:16rpx auto 0;
		border-radius:16rpx 16rpx 0 0;
		background-image:url(https://pic.youx365.com/tg_bg.png);
		background-repeat:no repeat;
		background-size:750rpx;
		background-color:#EEEEEE;
		height:196rpx;
		width: 750rpx;

		img{
			height:96rpx;
			width:136rpx;
			margin-left: 60rpx;
		}

		image{
			height:96rpx;
			width:136rpx;
			margin-left: 60rpx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit-frame{
			display:flex;
			line-height:79rpx;
			padding-bottom:40rpx;
		}
		.tit{
			font-size:32rpx;
			color:#FFFFFF;
			font-weight:bold;
			font-family:SourceHanSansCN-Normal;
		}
		.tit1{
			margin:0 12rpx;
			font-weight:bold;
			color:#fff;
			opacity:0.4;
		}
		.tit2{
			font-size:24rpx;
			color:#FFFFFF;
			font-weight:400;
			font-family:SourceHanSansCN-Normal;
		}
		.tit3{
			font-size: 22rpx;
			font-weight: 400;
			color:#FFFFFF;
			font-family:SourceHanSansCN-Normal;
			margin-left: 50rpx;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 团购楼层 */
	.group-section{
		background: #fff;
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	
	/* 团购推荐 */
	.tg-floor{
		width: 710rpx;
		background-color:#fff;
		margin:-57rpx auto 0;
		border-radius:0rpx 0 16rpx 16rpx;
		
	}
	
	.tg-list{
		
		.tg-goods-item{
			margin-top: 16rpx;
		}
		
		.tg-img{
			margin-left:21rpx;
			height:220rpx;
			line-height:220rpx;
			
			>img{
				width: 220rpx;
				height: 220rpx;
			}
		}
		
		.tg-text{
			width: 100%;
			padding:20rpx 0rpx 0rpx 35rpx;
			
			.tit1{
				font-size:22rpx;
				font-family:SourceHanSansCN-Regular;
				font-weight:400;
				color:rgba(0,0,0,1);
				width: 390rpx;
			}
			.tit2{
				font-size:22rpx;
				font-family:SourceHanSansCN-Medium;
				font-weight:500;
				color:rgba(255,68,63,1);
				margin-top:10rpx;
			}
			.tit3{
				font-size:20rpx;
				font-family:SourceHanSansCN-Normal;
				font-weight:400;
				color:rgba(119,119,119,1);
				margin-top:10rpx;
				margin-left:18rpx;
			}
			.tit4{
				font-size:20rpx;
				font-family:SourceHanSansCN-Normal;
				font-weight:400;
				color:rgba(119,119,119,1);
				margin-top:20rpx;
				line-height:48rpx;
				margin-left:13rpx;
			}
			.pic1 .cu-avatar{
				width: 31rpx !important;
				height: 31rpx !important;
				margin-left: -5rpx;
				margin-top:20rpx;
			}
		}
	}
	
	/* 爆款 */
	.bk-list{
		.bk_frame{
			margin-left: 20rpx;
			
			>image{
				height: 197rpx;
				width: 211rpx;
			}
			
			.clamp{
				font-size:22rpx;
				font-family:SourceHanSansCN-Regular;
				font-weight:400;
				color:#121212;
			}
			
			.price{
				font-size:22rpx;
				color:#FF443F;
				font-weight:500;
			}
			
			.bk_index_text{
				color:white;
				position:absolute;
				top:-1rpx;
				z-index:9999;
				margin-left:9rpx;
				font-size:20rpx;
				font-family:PangMenZhengDao;
				font-weight:400;
			}
			
			.bk_index{
				width:0;
				height:0;
				position:absolute;
				z-index:999;
				border-right:47rpx solid transparent;
			}
			
			.bk_index_0{
				border-top:47rpx solid #F1103D;
			}
			
			.bk_index_1{
				border-top:47rpx solid #FEC84B;
			}
			
			.bk_index_2{
				border-top:47rpx solid #00A390;
			}
		}
	}
	
	/* 分类推荐楼层 */
	.hot-floor{
		width: 710rpx;
		background-color:#fff;
		margin:-57rpx auto 0;
		border-radius:0rpx 0 16rpx 16rpx;

		.floor-img-box{
			height:300rpx;
			padding:20rpx;
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			border-radius: 6upx;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		width: 710rpx;
		margin:0 auto 30rpx;
		border-radius:0rpx 0 16rpx 16rpx;
		
		.guess-item{
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
			height: 300rpx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: 20rpx;
			color: #000000;
		}
		.buysum{
			font-size: 18rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color: #9F9F9F;
		}
		.price{
			font-size: 24rpx;
			color: #FF443F;
			font-weight:500;
		}
	}
	
	
	//头部广告
	.v-ad{
		width:750rpx;
		background: url('https://pic.youx365.com/index_bg.jpg');
		background-repeat:no-repeat;
		background-size:750rpx;
		background-position-y: -50rpx;
	}

	//头部导航
	.d-nav{
		// margin-top: 20rpx;
		margin-bottom: 20rpx;
		
		.d-nav-tab{
			width:516rpx;
			padding-left:20rpx;
			
			.nav .cu-item{
				height:50rpx !important;
				line-height:50rpx !important;
				color:white;
				font-size:25rpx;
			}
			
			.text-white{
				font-size:28rpx !important;
				font-family:SourceHanSansCN-Bold;
				font-weight:bold;
			}
		}
		
		.d-nav-more{
			width:78rpx;
			color:#fff;
			text-align:center;
		}
		
		.d-nav-notice{
			width: 130rpx;
			color: #fff;
			margin-left:20rpx;
			
			.d_title{
				font-size:26rpx;
				margin-left: 15rpx;
			}
			
			.d-avatar{
				font-variant:small-caps;
				margin:0;
				padding:0;
				display:-webkit-inline-box;
				display:-webkit-inline-flex;
				display:-ms-inline-flexbox;
				display:inline-flex;
				text-align:center;
				-webkit-box-pack:center;
				-webkit-justify-content:center;
				-ms-flex-pack:center;
				justify-content:center;
				-webkit-box-align:center;
				-webkit-align-items:center;
				-ms-flex-align:center;
				align-items:center;
				white-space:nowrap;
				position:relative;
				background-size:cover;
				background-position:center;
				vertical-align:middle;
				width:42rpx;
				
				>img{
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
	
	//今日头条
	.d-toutiao{
		width: 710rpx;
		margin: 0 auto;
		background-color:#fff;
		color:black;
		border-radius:0 0 16rpx 16rpx;
		border-top:1px solid #E7E7E7;
		height:93rpx;
		align-items:center;
		
		.d-title{
			height:93rpx;
			line-height: 93rpx;
			width:201rpx;
			padding-left:22rpx;
			
			img:first-child{
				width:120rpx;
				height:32rpx;
			}
			img:nth-child(2){
				width: 10rpx;
				height: 10rpx;
				top:-27rpx;
			}
			img:nth-child(3){
				width: 32rpx;
				height: 32rpx;
			}
		}
		
		.d-news{
			width:509rpx;
			height:93rpx;
			font-family:SourceHanSansCN-Medium;
			font-weight:500;
			line-height:93rpx;
			
			.uni-noticebar{
				background-color: #fff !important;
				color: black !important;
				height: 93rpx;
				line-height: 93rpx;
				font-size: 25rpx;
				padding:0rpx 0rpx 0rpx 0rpx;
				padding-right:10px;
				border-radius:35rpx;
			}
			
			.uni-icon{
				font-size: 25rpx !important;
			}
		}
	}
	
	.swiper-box{
		height:calc(100% - 117px) !important;
		background-color: #EEEEEE;
	}
	
	.goods_rate{
		width:163rpx;
		height:20rpx;
		background:#fcf0e2;
		border-radius:10rpx;
		
		.goods_rate_1{
			width:113rpx;
			font-size:14rpx;
			font-family:SourceHanSansCN-Regular;
			font-weight:400;
			color:#896A44;
			background:#F6E1BB;
			text-align:center;
			border-radius:10rpx;
			line-height: 20rpx;
		}
		
		.goods_rate_2{
			width:50rpx;
			text-align:right;
			font-size:14rpx;
			font-family:SourceHanSansCN-Regular;
			font-weight:400;
			color:#896A44;
			border-radius:10rpx;
			margin-right:9rpx;
			line-height: 20rpx;
		}
	}
	
	.rx_header{
		display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		-webkit-box-align:center;
		-webkit-align-items:center;
		-ms-flex-align:center;
		align-items:center;
		margin:16rpx auto 0;
		border-radius:16rpx 16rpx 0 0;
		background-repeat:no repeat;
		background-size:750rpx;
		background-color:#fff;
		height:104rpx;
		width:710rpx;

		image{
			height:40rpx;
			width:128rpx;
			margin-left: 23rpx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit-frame{
			display:flex;
			line-height:104rpx;
		}
		.tit1{
			margin:0 12rpx;
			font-weight:bold;
			color:#2D2D2D;
			opacity:0.4;
		}
		.tit2{
			font-size:24rpx;
			color:#333333;
			font-weight:400;
			font-family:SourceHanSansCN-Normal;
		}
		.tit3{
			font-size: 22rpx;
			font-weight: 400;
			color:#333333;
			font-family:SourceHanSansCN-Normal;
			margin-left: 50rpx;
		}
	}
</style>
