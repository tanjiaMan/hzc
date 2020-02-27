<template>
	<view class="container">
		<uni-collapse>
			<uni-collapse-item v-for="(item,index) in list" :key="index" :title="item.title" thumb="https://pic.youx365.com/bluecycle.png">
				<view class="content tit1">
					<rich-text :nodes="item.content"></rich-text>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
	import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
	
	export default {
		components: {uniCollapse,uniCollapseItem},
		data() {
			return {
				list:[],
			}
		},
		methods: {
			
		},
		onLoad(options){
			this.$request.ModelCommons.getDoc(2).then(result => {
				this.list = result;
			})
		}
	}
</script>

<style lang='scss'>
	
	.container{
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	
	.content{
		text-align: center;
	}
	
	.tit1{
		width: 615rpx;
		margin: 50rpx auto;
		font-size:22rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(119,119,119,1);
		text-align: left;
	}
	
	.media-wrap{
		width: 615rpx;
	}
	
	/deep/ .media-wrap{
		width: 615rpx;
	}
	
	/* colspan */
	.uni-collapse-cell__title{
		background-color: #FFFFFF !important;
	}
	
	/deep/ .uni-collapse-cell__title{
		background-color: #FFFFFF !important;
	}
	
	.uni-collapse:before{
		background-color:#E1E1E1 !important;
	}
	
	/deep/ .uni-collapse:before{
		background-color:#E1E1E1 !important;
	}
	
	.uni-collapse:after{
		background-color:#E1E1E1 !important;
	}
	
	/deep/ .uni-collapse:after{
		background-color:#E1E1E1 !important;
	}
	
	.uni-collapse-cell__title-img{
		width: 32rpx !important;
		height: 32rpx !important;
		border-radius: 50% !important;
	}
	
	/deep/ .uni-collapse-cell__title-img{
		width: 32rpx !important;
		height: 32rpx !important;
		border-radius: 50% !important;
	}
	
	.uni-collapse-cell__title-text{
		font-size:26rpx !important;
		font-family:Source Han Sans CN !important;
		font-weight:400 !important;
		color:rgba(51,51,51,1) !important;
	}
	
	/deep/ .uni-collapse-cell__title-text{
		font-size:26rpx !important;
		font-family:Source Han Sans CN !important;
		font-weight:400 !important;
		color:rgba(51,51,51,1) !important;
	}
</style>
