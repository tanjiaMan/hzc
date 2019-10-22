<template>
	<view class="container">
		<img class="img" src="https://pic.youx365.com/kj-success.png" />
		
		<view class="tit1">恭喜你</view>
		
		<view>
			<text class="tit2">已砍</text>
			<text class="tit3">745.23 元</text>
			<text class="tit2" style="margin-left: 10px;">还可以砍</text>
			<text class="tit3">285.22 元</text>
		</view>
		
		<view class="bt">
			分享给好友，帮我砍价
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.container{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		text-align: center;
		
		.img{
			width: 280rpx;
			height: 280rpx;
			margin-top: 100rpx;
		}
		
		.tit1{
			font-size:42rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			margin-top: 55rpx;
		}
		
		.tit2{
			font-size:32rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-right: 6rpx;
		}
		
		.tit3{
			font-size:38rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:#FF443F;
		}
		
		.bt{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			width: 456rpx;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			background-color: #FF443F;
			border-radius: 10rpx;
			margin: 100rpx auto 0;
		}
	}
	
</style>
