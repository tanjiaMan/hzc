<template>
	<view class="container">
		<view class="team-header uni-flex uni-row">
			<view class="flex-item d-1">
				<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
			</view>
			<view class="flex-item">
				<view class="d-4 uni-flex uni-row">
					<view class="flex-item d-2">
						<view class="tit1">{{userInfo.nickname || '游客'}}</view>
					</view>
					<view class="d-7">
						
					</view>
					<view class="flex-item d-3">
						<view class="tit2">团队人数</view>
						<view class="tit2">862</view>
					</view>
				</view>
				<view class="d-5">
					<view class="uni-flex uni-row">
						<view class="tit2 flex-item d-6">等级：2</view>
						<view class="tit2 flex-item d-6">推 荐 人：李四</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="tit2 flex-item d-6">手 机 号：13012341234</view>
						<view class="tit2 flex-item d-6">上 级：李四</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="d-content">
			<view class="uni-flex uni-row">
				<view class="flex-item d-1">
					<img class="img" src="https://pic.youx365.com/uhome-3.png" />
					<view class="tit1">转货</view>
				</view>
				<view class="flex-item d-1">
					<img class="img" src="https://pic.youx365.com/uhome-2.png" />
					<view class="tit1">转账</view>
				</view>
				<view class="flex-item d-1">
					<img class="img" src="https://pic.youx365.com/uhome-1.png" />
					<view class="tit1">转红包</view>
				</view>
			</view>
			
			<view class="btzy" @click="navTo('/pages/user/userTrans')">
				转移记录 >
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
		}
	}
</script>

<style lang='scss'>
	
	.container{
		.team-header{
			width: 100%;
			height: 319rpx;
			background-image: url('https://pic.youx365.com/team_bg.png');
			background-size: cover;
			padding-top: 62rpx;
			
			.tit2{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			
			.d-1{
				width: 147rpx;
				text-align: center;
				
				.portrait{
					width: 77rpx;
					height: 77rpx;
					border-radius: 50%;
				}
			}
			
			.d-2{
				width: 314rpx;
				
				.tit1{
					font-size:34rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					font-style:italic;
					color:rgba(255,255,255,1);
				}
			}
			
			.d-7{
				width: 2rpx;
				background-color: #ffffff;
				height: 60rpx;
				opacity: 0.34;
				margin-top: 8rpx;
			}
			
			.d-3{
				width: 287rpx;
				padding-left: 8px;
				
				.bt1{
					width:147rpx;
					height:38rpx;
					background:linear-gradient(90deg,rgba(196,5,0,1),rgba(238,54,49,1));
					opacity:0.7;
					border-radius:19rpx;
					text-align: center;
					line-height:38rpx;
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
			}
			
			.d-4{
				width: 603rpx;
			}
			
			.d-5{
				padding-top: 30rpx;
			}
			
			.d-6{
				width: 50%;
			}
		}
	
		.d-content{
			height:860rpx;
			width: 712rpx;
			margin: -40rpx auto 0;
			border-radius:6rpx;
			background-color: #FFFFFF;
			
			.d-1{
				width: 33%;
				text-align: center;
				margin-top: 58rpx;
				
				.img{
					width: 96rpx;
					height: 96rpx;
				}
				
				.tit1{
					font-size:28rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					line-height: 1 !important;
				}
			}
			
			.btzy{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(146,146,146,1);
				width:193rpx;
				height:57rpx;
				line-height:57rpx;
				border:1px solid rgba(229,229,229,1);
				border-radius:29px;
				margin: 107rpx auto 0;
				text-align: center;
			}
		}
	}
</style>
