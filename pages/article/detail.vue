<template>
	<view class="container">
		<view class="header uni-flex uni-row">
			<view class="title flex-item">{{info.title}}</view>
			<view class="d-img flex-item">
				<img class="img" style="margin-right: 31rpx;" src="https://pic.youx365.com/article-sc.png" />
				<img class="img" src="https://pic.youx365.com/article-zf.png" />
			</view>
		</view>
		<image class="main-img" mode="widthFix" :src="info.picUrl" />
		<text class="main-content">
			{{info.content}}
		</text>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad(e) {
			this.$request.ModelHome.getArticeInfo(e.id).then(result => {
				this.info = result;
			})
		}
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
			
			.img{
				width: 40rpx;
				height: 40rpx;
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
