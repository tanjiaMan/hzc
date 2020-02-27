<template>
	<view class="container">
		<view class="tit1">
			<rich-text :nodes="html"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html:null,
			}
		},
		methods: {
			
		},
		onLoad(options){
			this.$request.ModelCommons.getDoc(1).then(result => {
				if(result.length > 0){
					this.html = result[0].content;
				}
			})
		}
	}
</script>

<style lang='scss'>
	
	.container{
		width: 750rpx;
		height: 100vh;
		background-color: #fff;
	}
	
	.tit1{
		width: 615rpx;
		margin: 0 auto 0;
		font-size:22rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(119,119,119,1);
	}
	
	.media-wrap{
		width: 615rpx;
	}
	
	/deep/ .media-wrap{
		width: 615rpx;
	}
</style>
