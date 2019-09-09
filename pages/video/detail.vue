<template>
	<view>
		<view class="d-top" @click="playvideo">
			<video id="video" :controls="false" class="header-video" objectFit="cover" 
			:show-center-play-btn="false" :show-play-btn="false" :enable-progress-gesture="false"
				src="https://video.youx365.com/8/ebdbf987809ca0678bcb8a11e84c498b.mp4"></video>
			<view class="d-1" v-if="play == false">
				<img class="img" src="https://pic.youx365.com/video-bf.png" />
			</view>
		</view>
		<view class="uni-flex uni-row d-avr">
			<view class="flex-item d-1">
				<image class="img" src="https://pic.youx365.com/wazi2.JPG"></image>
			</view>
			<view class="flex-item d-2">
				<view><text class="tit1">小蝶服装店</text><text class="tit2">长沙市</text></view>
				<view class="tit3">365次播放</view>
			</view>
			<view class="flex-item d-3">
				<view class="bt-1">关注</view>
			</view>
		</view>
		<view class="d-desc">
			<view class="tit1">我的新宠~真丝上衣女2019夏季宽松气质连衣裙</view>
			<view class="tit2">图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为</view>
		</view>
		<view class="line"></view>
		<view class="day-nav-tab flex-item">
			<scroll-view class="nav" scroll-with-animation>
				<view class="cu-item" :class="0 == dayTabCur ? 'text-white':''" @tap="dayTabSelect" data-id="0">
					相关产品
				</view>
				<view class="cu-item" :class="1 == dayTabCur ? 'text-white':''" @tap="dayTabSelect" data-id="1">
					评论（10）
				</view>
			</scroll-view>
		</view>
		
		<view class="goods-detail" v-if="0 == dayTabCur">
			<view class="goods-list" v-for="item in 3" :key="item">
				<view class="uni-flex uni-row">
					<view class="flex-item">
						<image class="img" src="https://pic.youx365.com/wazi2.JPG" mode="aspectFill" />
					</view>
					<view class="flex-item d_1">
						<view class="name">联想 310S-15 i5-7200U</view>
						<view class="num">规格：默认</view>
						<view class="uni-flex uni-row" style="width: 100%;margin-top: 20rpx;">
							<view class="price">￥29.8</view>
							<view class="cart"><img class="img" src="https://pic.youx365.com/video-cart.png" /></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="height: 135rpx;"></view>
		<view class="d-bottom uni-flex uni-row">
			<view class="uni-flex d-frame">
				<img class="img" src="https://pic.youx365.com/video-praise.png" />
				<text class="tit">赞.2013</text>
			</view>
			<view>
				<view class="line"></view>
			</view>
			<view class="uni-flex d-frame">
				<img class="img" src="https://pic.youx365.com/video-share.png" />
				<text class="tit">分享</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				play: false,
				
				dayTabCur:0,
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
		//下拉刷新
		onPullDownRefresh(){
			this.$api.msg('下拉刷新');
		},
		//加载更多
		onReachBottom(){
			this.$api.msg('加载更多');
		},
		methods: {
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
		margin: 47rpx auto 0;
		
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
</style>
