<template>
	<view class="container">
		<view class="d_header">
			<view class="left"><image class="img" :src="msg.avatarUrl" /></view>
			<view class="center">{{msg.title}}</view>
			<view class="right">{{msg.createTime}}</view>
		</view>
		<view class="d_content">
			{{msg.content}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:{}
			}
		},
		onLoad(option){
			this.msg = JSON.parse(option.detail);
			console.log('this.msg',this.msg);
			
			let ids = [];
			ids.push(this.msg.id);
			this.$request.ModelUser.readMsg(JSON.stringify(ids));
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
		
		.d_header{
			display: flex;
			align-items: center;
			padding: 40rpx 40rpx;
			
			.left{
				width: 100rpx;
				height: 100rpx;
				
				.img{
					width: 100%;
					height: 100%;
				}
			}
			
			.center{
				font-size: 28rpx;
				font-weight: 500;
				padding: 0 20rpx;
				flex: 1;
			}
			
			.right{
				font-size: 23rpx;
				font-weight: 400;
			}
		}
		
		.d_content{
			padding: 40rpx 40rpx;
			font-size: 25rpx;
		}
	}
</style>
