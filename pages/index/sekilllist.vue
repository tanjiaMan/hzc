<template>
	<view class="container">
		<view class="header">
			<view id="tab-bar" class="flex-item d-nav-tab">
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" v-for="(item,index) in tabBars" 
						:class="index == tabCur ? 'text-white':''" 
						:key="item.id" :id="item.id" @tap="tabSelect" :data-id="index">
							<view class="tit1">{{item.name}}</view>
							<view class="tit2">{{item.desc}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="content">
			<view class="d-content uni-flex uni-row" v-for="(item,index) in 7" :key="index">
				<view class="flex-item dright">
					<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
				</view>
				<view class="flex-item dleft">
					<view class="tit1">校园风时尚女鞋</view>
					<view class="tit2">德国空气净化器负离子除甲醛净化器</view>
					<view class="d-detail uni-flex uni-row">
						<view class="flex-item d-num">
							<view class="tit3">限量 80件</view>
							<view><text class="tit4">¥</text><text class="tit5">14.9</text>  <text class="tit6">¥16.9</text></view>
						</view>
						<view class="flex-item d-bt">
							<view class="bt">提醒我</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				tabCur:0,
				tabBars:[
					{
						id:0,
						name:'14:00',
						desc: '已开抢'
					},
					{
						id:1,
						name:'16:00',
						desc: '已开抢'
					},
					{
						id:2,
						name:'18:00',
						desc: '已开抢'
					},
					{
						id:3,
						name:'20:00',
						desc: '即将开始'
					},
					{
						id:4,
						name:'09:00',
						desc: '明日开始'
					}
				]
			}
		},
		methods: {
			// 头部菜单切换
			async tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
		}
	}
</script>

<style lang='scss'>
	.header{
		width: 750rpx;
		height: 326rpx;
		background-color: #FF443F;
		
		.d-nav-tab{
			width: 100%;
			
			.nav .cu-item{
				min-width: 128rpx;
				
				.tit1{
					font-size:30rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color: #FFFFFF;
					text-align: center;
				}
				
				.tit2{
					font-size:20rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color: #FFFFFF;
				}
			}
			
			.text-white{
				.tit1{
					font-weight:bold !important;
				}
				
				.tit2{
					color:rgba(241,8,50,1) !important;
					height: 35rpx;
					line-height: 35rpx;
					padding: 0 20rpx 0 20rpx;
					background-color: #FFFFFF;
					border-radius: 40rpx;
				}
			}
		}
	}
	
	.content{
		 width: 711rpx;
		 min-height: 300rpx;
		 border-radius:10rpx;
		 margin: -193rpx auto 20rpx;
		 background-color: #FFFFFF;
		 padding-top: 2rpx;
		 padding-bottom: 30rpx;
		 
		 .d-content{
			 width: 671rpx;
			 height: 168rpx;
			 margin: 30rpx auto;
			 
			 .dright{
				 border-radius:10rpx;
				 width: 242rpx;
				 height: 168rpx;
				 
				 .img{
					 width: 171rpx;
					 height: 168rpx;
					 border-radius:10rpx;
				 }
			 }
			 
			 .dleft{
				 width: 429rpx;
				 
				 .tit1{
					 font-size:26rpx;
					 font-family:SourceHanSansCN;
					 font-weight:400;
					 color:rgba(18,18,18,1);
					 text-overflow: ellipsis;
					 overflow: hidden;
					 white-space: nowrap;
					 ine-height: 1.2;
				 }
				 
				 .tit2{
					 font-size:22rpx;
					 font-family:SourceHanSansCN;
					 font-weight:400;
					 color:rgba(102,102,102,1);
					 text-overflow: ellipsis;
					 overflow: hidden;
					 white-space: nowrap;
				 }
				
				.d-detail{
					width: 100%;
					margin-top: 30rpx;
					
					.d-num{
						width: 300rpx;
						
						.tit3{
							line-height: 1.2;
							font-size:13rpx;
							font-family:SourceHanSansCN;
							font-weight:400;
							color:rgba(137,106,68,1);
							width:163rpx;
							height:16rpx;
							line-height: 16rpx;
							background:rgba(246,225,187,1);
							border-radius: 10rpx;
							padding-left: 16rpx;
						}
						
						.tit4{
							font-size:20rpx;
							font-family:SourceHanSansCN;
							font-weight:400;
							color:rgba(255,68,63,1);
						}
						
						.tit5{
							font-size:22rpx;
							font-family:SourceHanSansCN;
							font-weight:500;
							color:rgba(255,68,63,1);
						}
						
						.tit6{
							font-size:18rpx;
							font-family:SourceHanSansCN;
							font-weight:500;
							text-decoration:line-through;
							color:rgba(168,168,168,1);
							margin-left: 8rpx;
						}
					}
					
					.d-bt{
						.bt{
							font-size:24rpx;
							font-family:SourceHanSansCN;
							font-weight:400;
							color:rgba(255,255,255,1);
							width: 125rpx;
							height: 49rpx;
							line-height: 49rpx;
							text-align: center;
							background-color: #00A390;
							border-radius:25rpx;
						}
					}
				}
			 }
		 }
	}
</style>
