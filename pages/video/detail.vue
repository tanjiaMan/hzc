<template>
	<view>
		<view class="d-top" @click="playvideo">
			<video id="video" :controls="false" class="header-video" objectFit="cover" 
			:poster="info.coverUrl" :src="info.videoUrl" @ended="ended"
			:show-center-play-btn="false" :show-play-btn="false" :enable-progress-gesture="false"></video>
			<view class="d-1" v-if="play == false">
				<img class="img" src="https://pic.youx365.com/video-bf.png" />
			</view>
		</view>
		<view class="uni-flex uni-row d-avr">
			<view class="flex-item d-1">
				<image class="img" :src="info.avatarUrl"></image>
			</view>
			<view class="flex-item d-2">
				<view><text class="tit1">{{info.nickName}}</text><!-- <text class="tit2">长沙市</text> --></view>
				<view class="tit3">{{info.viewCount}}次播放</view>
			</view>
			<view v-if="info.userId>0" class="flex-item d-3" @click="follow(info.userId)">
				<view class="bt-1">关注</view>
			</view>
		</view>
		<view class="d-desc">
			<view class="tit1">{{info.title}}</view>
			<view class="tit2">{{info.desc}}</view>
		</view>
		<view class="line"></view>
		<view class="day-nav-tab flex-item">
			<scroll-view class="nav" scroll-with-animation>
				<view class="cu-item" :class="0 == dayTabCur ? 'text-white':''" @tap="dayTabSelect" data-id="0">
					相关产品
				</view>
				<view class="cu-item" :class="1 == dayTabCur ? 'text-white':''" @tap="dayTabSelect" data-id="1">
					评论
				</view>
			</scroll-view>
		</view>
		
		<view class="goods-detail" v-if="0 == dayTabCur">
			<view class="goods-list" v-for="item in productObj.records" :key="item">
				<view class="uni-flex uni-row">
					<view class="flex-item">
						<image class="img" :src="item.productCoverPicUrl" mode="aspectFill" />
					</view>
					<view class="flex-item d_1">
						<view class="name">{{item.productName}}</view>
						<!-- <view class="num">规格：默认</view> -->
						<view class="uni-flex uni-row" style="width: 100%;margin-top: 20rpx;">
							<view class="price">￥{{item.productPrice}}</view>
							<view class="cart" @click="addcart(item.productId)"><img class="img" src="https://pic.youx365.com/video-cart.png" /></view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="productObj.loadingType"></uni-load-more>
		</view>
		<view class="eval-detail" v-if="1 == dayTabCur">
			<view
				v-for="(item,index) in evalObj.records" :key="index"
				class="eva-box uni-flex uni-row"
			>
				<image class="portrait" :src="item.avatarUrl" mode="aspectFill"></image>
				<view class="right">
					<view style="display: flex;">
						<text class="name">{{item.nickName}}</text>
						<text class="time">{{item.createTime}}</text>
					</view>
					<text class="con">{{item.message}}</text>
					<scroll-view class="floor-list" scroll-x v-if="item.picUrlList.length > 0">
						<view class="scoll-wrapper">
							<view 
								v-for="(subimg, subin) in item.picUrlList" :key="subin"
								class="floor-item"
								@click="previewImage(subin,item.picUrlList)"
							>
								<image :src="subimg" mode="aspectFill"></image>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<uni-load-more :status="evalObj.loadingType"></uni-load-more>
		</view>
		
		<view style="height: 135rpx;"></view>
		<view class="d-bottom uni-flex uni-row">
			<view class="uni-flex d-frame" @click.stop="stopPrevent" @click="doCollect(info)">
				<img class="img" :class="info.collected?'':'gray'" src="https://pic.youx365.com/video-praise.png" />
				<text class="tit">赞.{{info.collectNum}}</text>
			</view>
			<view>
				<view class="line"></view>
			</view>
			<view class="uni-flex d-frame">
				<button class="p-b-btn" open-type="share">
					<img class="img" src="https://pic.youx365.com/video-share.png" />
					<text class="tit">分享</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				play: false,
				
				dayTabCur:0,
				productObj:{
					pageIndex:1,
					pageSize:10,
					records:[],
					loadingType: 'more',
				},
				evalObj:{
					pageIndex:1,
					pageSize:10,
					records:[],
					loadingType: 'more',
				},
				
				info:{},
				id:0,
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(options) {
			if(options.inviteUserId){
				uni.setStorage({//缓存用户登陆状态
				    key: 'inviteUserId',  
				    data: options.inviteUserId  
				})
			}
			
			this.id = options.id;
			this.$request.ModelHome.getArticeInfo(this.id).then(result => {
				this.info = result;
			});
			this.loadData('refresh');
		},
		onShareAppMessage() { //设置分享
			return {
				title: this.info.title,
				path: '/pages/video/detail?id='+this.id + '&inviteUserId=' + this.userInfo.id
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			ended(){
				console.log('ended');
				this.play = false;
			},
			playvideo(){
				this.play = !this.play;
				let video = wx.createVideoContext('video');
				if(this.play == true){
					video.play();
				}else{
					video.pause();
				}				
			},
			async dayTabSelect(e){
				this.dayTabCur = e.currentTarget.dataset.id;
				this.loadData('refresh');
			},
			async loadData(loadType){
				let navItem = {};
				if(this.dayTabCur == 0){
					navItem = this.productObj;
				}else if(this.dayTabCur == 1){
					navItem = this.evalObj;
				}else{
					return;
				}
				if(loadType == 'refresh'){
					navItem.pageIndex = 1;
					navItem.loadingType = 'more';
					navItem.records = [];
				}
				if(navItem.loadingType === 'loading' || navItem.loadingType == 'noMore'){
					return;
				}
				navItem.loadingType = 'loading'
				let values = {mediaId: this.id,pageIndex:navItem.pageIndex,pageSize: navItem.pageSize};
				let result = null;
				if(this.dayTabCur == 0){
					result = await this.$request.ModelHome.pageRefProduct(values);
				}else{
					result = await this.$request.ModelHome.pageRefEval(values);
				}
				result = result || {};
				let orderList = result.records || [];
				orderList.forEach(item=>{
					navItem.records.push(item);
				})
				if(orderList.length < navItem.pageSize){
					navItem.loadingType = 'noMore';
				}else{
					navItem.loadingType = 'more'; 
				}
				navItem.pageIndex = navItem.pageIndex + 1;
			},
			stopPrevent(){},
			previewImage(index,picUrlList){
				uni.previewImage({
					current: index,
					urls: picUrlList,
					loop: true,
				})
			},
			follow(userId){
				this.$request.ModelUser.followUserId(userId).then(res => {
					if(result.code == 'ok'){
						this.$api.msg('关注成功');
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			cancelFollow(userId){
				this.$request.ModelUser.cancelFollowUserId(userId).then(res => {
					if(result.code == 'ok'){
						this.$api.msg('取消成功');
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			addcart(goodsId){
				let values = {increaseNum:1,productId:goodsId};
				this.$request.ModelOrder.addShopCar(values).then(result => {
					if(result.code == 'ok'){
						uni.showToast({
							title: '加入购物车成功',
							duration: 2000
						});
					}else{
						uni.showToast({
							icon:'none',
							title: '加入购物车失败',
							duration: 2000
						});
					}
				})	
			},
			doCollect(item){
				let values = {refId: item.id,type:3};
				if(item.collected){ //取消收藏
					this.$request.ModelOrder.removeCollect(values).then(result => {
						if(result.code == 'ok'){
							this.$api.msg('取消收藏');
							item.collected = !item.collected;
						}else{
							this.$api.msg(result.msg);
						}
					})
				}else{
					this.$request.ModelOrder.addCollect(values).then(result => {
						if(result.code == 'ok'){
							this.$api.msg('收藏成功');
							item.collected = !item.collected;
						}else{
							this.$api.msg(result.msg);
						}
					})
				}
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.d-top{
		position: relative;
		width: 100%;
		height: 802rpx;
		
		.header-video{
			width: 100%;
			height: 802rpx;
		}
		
		.d-1{
			width: 100%;
			position: absolute;
			text-align: center;
			top: 0px;
			left: 0px;
			height: 802rpx;
			line-height: 802rpx;
		}
		
		.img{
			width: 96rpx;
			height: 96rpx;
			vertical-align: middle;
		}
	}

	.d-avr{
		margin-top: 21rpx;
		
		.d-1{
			width: 153rpx;
			text-align: center;
			
			.img{
				width: 93rpx;
				height: 93rpx;
				border-radius: 50%;
			}
		}
		
		.d-2{
			width:473rpx;
			
			.tit1{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
				margin-right: 30rpx;
			}
			.tit2{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			.tit3{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(144,144,144,1);
			}
		}
		
		.d-3{
			width: 124rpx;
			
			.bt-1{
				width:103rpx;
				height:46rpx;
				line-height: 46rpx;
				border:1px solid rgba(255,68,63,1);
				border-radius:2rpx;
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
				text-align: center;
			}
		}
	}

	.d-desc{
		width: 710rpx;
		margin: 45rpx auto;
		
		.tit1{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
		}
		
		.tit2{
			margin-top: 35rpx;
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(118,118,118,1);
		}
	}
	
	.line{
		width:750rpx;
		height:15rpx;
		background:rgba(245,245,245,1);
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
			width: 50%;
			text-align: center;
			margin: 0;
			padding: 0;
		}
		
		.text-white{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
			position: relative;
			
			&:after{
				content: " ";
				width: 136rpx;
				height: 4rpx;
				background: rgba(0,163,144,1);
				position: absolute;
				bottom: 0rem;
				left: 50%;
				transform: translateX(-50%);
			}
		}	
	}
	
	.goods-detail{
		padding-top: 30rpx;
		
		.goods-list{
			border-bottom: 1px solid #EDEDED;
			padding-bottom: 20px;
			padding-top: 20px;
			
			.price{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(255,68,63,1);
				text-align: left;
				padding-right: 30rpx;
				width: 50%;
				height: 56rpx;
				line-height: 56rpx;
			}
			
			.cart{
				width: 50%;
				text-align: right;
				height: 56rpx;
				line-height: 56rpx;
				
				.img{
					width: 56rpx;
					height: 56rpx;
					vertical-align: middle;
				}
			}
			
			.img{
				width: 182rpx;
				height: 155rpx;
				margin-left: 50rpx;
			}
			
			.d_1{
				padding-left: 19rpx;
			}
			
			.name{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 480rpx;
			}
			
			.num{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(156,156,156,1);
			}
		}
	}
	
	.d-bottom{
		width: 100%;
		height: 117rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background:rgba(248,248,248,1);
		
		.d-frame{
			width: 50%;
			text-align: center;
			display: block;
			height: 117rpx;
			line-height: 117rpx;
			button{
				height: 117rpx !important;
				line-height: 117rpx !important;
			}
			button:after{
				border: unset !important;
			}
		}
		
		.img{
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
			margin-right: 13rpx;
		}
		
		.tit{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		.line{
			width:2rpx;
			height:45rpx;
			background:rgba(218,218,218,1);
			border-radius:1px;
			margin-top: 40rpx;
		}
	}
	
	.gray{
		filter: grayscale(100%);
	}
	
	.eva-box{
		display: flex;
		padding: 20upx;
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
</style>
