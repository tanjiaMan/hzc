<template>
	<view class="container">
		<view class="d-header" v-if="defalutBanner && banner.length>0">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="scroll-view-item_H" v-for="(item,index) in banner" :key="index" @click="navTo('/pages/video/detail?id='+item.id)">
					<image class="header-video" :src="item.coverUrl" mode="aspectFill"></image>
					<view class="d-1">
						<img class="img" src="https://pic.youx365.com/video-bf.png" />
						<view class="d-2 uni-flex uni-row">
							<view class="flex-item" style="width: 80%;text-align: left;padding-left: 45rpx;margin-top: 15rpx;">
								<view class="d-avr">
									<img class="imgavr" :src="item.avatarUrl" />
									<text class="tit2">官方短视频</text>
								</view>
								<view class="tit">
									{{item.nickName}}
								</view>
							</view>
							<view class="flex-item" style="width:20%">
								<img class="imgsc" :class="item.collected?'':'gray'" 
									@click.stop="stopPrevent" @click="doCollect(item,'header')"
									src="https://pic.youx365.com/video-sc.png" />
								<view class="tit1">{{item.praiseCount}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 分类 -->
		<view class="d-fenlei">
			<view id="tab-bar" class="flex-item d-nav-tab">
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" v-for="(item,index) in tabBars" 
						:class="index == TabCur ? 'text-white':''" 
						:key="item.id" :id="item.id" @tap="tabSelect" :data-id="index">
							{{item.name}}
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 详情 -->
		<view class="d-body">
			<view class="d-content" v-for="(item,index) in records" :key="index" @click="navTo('/pages/video/detail?id='+item.id)">
				
				<image class="video" :src="item.coverUrl" mode="aspectFill"></image>
				<view style="width: 100%;position: absolute;text-align: center;top: 0;left: 0;">
					<img class="img" src="https://pic.youx365.com/video-bf.png" />
				</view>
				<view class="tit1">
					{{item.title}}
				</view>
				<view class="uni-flex uni-row" style="width: 100%;">
					<view class="flex-item d-avr">
						<img class="imgavr" :src="item.avatarUrl" />
						<text class="tit2">{{item.nickName}}</text>
					</view>
					<view class="flex-item d-sc">
						<img class="imgsc" :class="item.collected?'':'gray'" 
							@click.stop="stopPrevent" @click="doCollect(item,'header')"
							src="https://pic.youx365.com/video-sc.png" />
						<text class="tit3">{{item.praiseCount}}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType" style="width: 100%;"></uni-load-more>
		</view>
		
		<view style="height: 70rpx;"></view>
	</view>
</template>

<script>
	
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				//
				TabCur: 0,
				scrollLeft: 0,
				defalutBanner:{},
				tabBars: [],
				
				banner:[],
				//翻页
				loadingType: 'more',
				pageIndex: 1,
				pageSize: 20,
				records:[],
			}
		},
		async onLoad(){//第一次加载
			let result = await this.$request.ModelHome.getMediaCategoryByPid(1);
			result.map(item => {
				if(item.type == 0){
					this.defalutBanner = item;
				}else{
					this.tabBars.push(item);
				}
			});
			if(this.defalutBanner && this.defalutBanner.id){
				this.$request.ModelHome.pageArtice({classId: this.defalutBanner.id,type:1,pageIndex:1,pageSize: 10}).then(result => {
					this.banner = result.records || [];
				})
			}
			this.loadData('refresh');
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
			this.$api.msg('加载更多');
		},
		methods: {
			stopPrevent(){},
			navTo(url){uni.navigateTo({url})},
			// 头部菜单切换
			async tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				if(this.TabCur == index){
					return;
				}
				this.TabCur = index;
				this.loadData('refresh');
			},
			async loadData(loadType){
				if(loadType == 'refresh'){
					this.pageIndex = 1;
					this.loadingType = 'more';
					this.records = [];
				}
				if(this.loadingType === 'loading' || this.loadingType == 'noMore'){
					return;
				}
				let navItem = this.tabBars[this.TabCur];
				this.loadingType = 'loading'
				let values = {classId: navItem.id,type:1,pageIndex:this.pageIndex,pageSize: this.pageSize};
				let result = await this.$request.ModelHome.pageArtice(values);
				result = result || {};
				let orderList = result.records || [];
				orderList.forEach(item=>{
					this.records.push(item);
				})
				if(orderList.length < this.pageSize){
					this.loadingType = 'noMore';
				}else{
					this.loadingType = 'more'; 
				}
				this.pageIndex = this.pageIndex + 1;
			},
			doCollect(item,type){
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
	.d-header{
		width: 100%;
		height: 402rpx;
		background-color: #FFFFFF;
		padding-top: 25rpx;
		
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			padding: 0 20rpx;
		}
		
		.scroll-view-item_H {
			display: inline-block;
			width: 609rpx;
			height: 352rpx;
			line-height: 352rpx;
			border-radius:30rpx;
			margin-left: 30rpx;
			position: relative;
			
			.d-1{
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				border-radius:30rpx;
				text-align: center;
				
				.img{
					width: 96rpx;
					height: 96rpx;
					margin-top: 120rpx;
				}
				
				.d-2{
					height: 110rpx;
					width: 100%;
					
					.tit{
						font-size:20rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,255,255,1);
					}
					
					.imgsc{
						width: 40rpx;
						height: 40rpx;
					}
					
					.tit1{
						font-size:20rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,255,255,1);
						margin-top: -20rpx;
					}
					
					.d-avr{
						background:#ffffffad;
						border-radius:21rpx;
						width: fit-content;
						padding: 0px 12rpx 0 12rpx;
						height: 42rpx;
						line-height: 38rpx;
						
						.imgavr{
							width:34rpx;
							height:34rpx;
							border-radius:50%;
							vertical-align: middle;
							margin-right: 8rpx;
						}
						
						.tit2{
							font-size:20rpx;
							font-family:SourceHanSansCN;
							font-weight:400;
							color:rgba(0,0,0,1);
						}
					}
				}
			}
		}
		
		.header-video{
			width: 609rpx;
			height: 352rpx;
			border-radius:30rpx;
		}
		
		/deep/ .uni-video-cover{
			display: none !important;
		}
	}

	.d-fenlei{
		height: 70rpx;
		margin-top: 10rpx;
		
		.d-nav-tab{
			width:100%;
			padding-left:10rpx;
			
			.nav .cu-item{
				font-size:27rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				position: relative;
				height: 70rpx !important;
				line-height: 70rpx !important;
			}
			
			.text-white{
				color:rgba(0,163,144,1) !important;
			}
			
			.text-white:after{
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				-webkit-transform: translateX(-50%);
				transform: translateX(-50%);
				width: 80%;
				height: 0;
				border-bottom: 5rpx solid #00a390;
			}
		}
	}
	
	.d-body{
		display: flex;
		flex-direction: row;
		flex-wrap:wrap;
		
		.d-content{
			width: 342rpx;
			height: 431rpx;
			background-color: #FFFFFF;
			margin-left: 20rpx;
			margin-top: 30rpx;
			position: relative;
			border-radius:10rpx;
			
			.video{
				width: 100%;
				height: 280rpx;
				border-radius: 10rpx 10rpx 0 0;
			}
			
			.img{
				width: 80rpx;
				height: 80rpx;
				margin-top: 100rpx;
			}
			
			.tit1{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				margin-top:-14rpx;
				line-height: 1.3;
				padding: 10rpx 10rpx 0px 10rpx;
				
				white-space: unset;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				height: 90rpx;
			}
			
			.d-avr{
				width: 60%;
				padding: 0px 10rpx 0px 10rpx;
				height: 50rpx;
				line-height: 50rpx;
				
				.imgavr{
					width:24rpx;
					height:24rpx;
					border-radius:50%;
					vertical-align: middle;
					margin-right: 8rpx;
				}
				
				.tit2{
					font-size:18rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					
					white-space: unset;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
				}
			}
			
			.d-sc{
				width: 40%;
				text-align: right;
				padding: 0px 10rpx 0px 10rpx;
				height: 50rpx;
				line-height: 50rpx;
				
				.imgsc{
					width: 24rpx;
					height: 24rpx;
					vertical-align: middle;
					margin-right: 8rpx;
				}
				
				.tit3{
					font-size:18rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
		}
	}
	
	.gray{
		filter: grayscale(100%);
	}
</style>
