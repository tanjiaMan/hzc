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
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				play: false,
			}
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
			}
		}
	}
</script>

<style lang='scss'>
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
</style>
