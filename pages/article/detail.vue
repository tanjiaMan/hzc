<template>
	<view class="container">
		<view class="header uni-flex uni-row">
			<view class="title flex-item">{{info.title}}</view>
			<view class="d-img flex-item">
				<img class="img" style="margin-right: 31rpx;" src="https://pic.youx365.com/article-sc.png" />
				
				<button class="p-b-btn" open-type="share">
					<img class="img" src="https://pic.youx365.com/article-zf.png" />
				</button>
			</view>
		</view>
		<image class="main-img" mode="widthFix" :src="info.picUrl" />
		<text class="main-content">
			{{info.content}}
		</text>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
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
			})
		},
		onShareAppMessage() { //设置分享
			return {
				title: this.info.title,
				path: '/pages/article/detail?id='+this.id + '&inviteUserId=' + this.userInfo.id
			}
		},
	}
</script>
<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.container{
		width: 710rpx;
		margin: 0 auto;
	}
	
	.header{
		margin-top: 40rpx;
		
		.title{
			width: 510rpx;
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
		}
		
		.d-img{
			width: 200rpx;
			text-align: right;
			display: flex;
			justify-content: center;
			
			.img{
				width: 40rpx;
				height: 40rpx;
			}
			
			.p-b-btn{
				position: unset;
				background-color: unset;
				padding-left: unset;
				padding-right: unset;
				font-size: unset;
				height: 40rpx;
				line-height: 40rpx;
				margin: 0 !important;
			}
		}
	}
	
	.main-img{
		width: 100%;
		margin-top: 50rpx;
		margin-bottom: 70rpx;
	}
	
	.main-content{
		font-size:22rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(82,82,82,1);
	}
</style>
