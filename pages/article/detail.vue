<template>
	<view class="container">
		<view class="header" @click.stop="stopPrevent">
			<view class="title">{{info.title}}</view>
			<view class="d-img" @click.stop="stopPrevent" @click="addCollect">
				<img class="img" style="margin-right: 31rpx;" src="https://pic.youx365.com/article-sc.png" />
			</view>
			<view class="d_button">
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
		methods:{
			stopPrevent(){},
			addCollect(){
				let values = {refId: this.id,type:4};
				this.$request.ModelOrder.addCollect(values).then(result => {
					if(result.code == 'ok'){
						this.$api.msg('收藏成功');
					}else{
						this.$api.msg(result.msg);
					}
				})
			},	
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
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
		
		.title{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
			flex: 1;
		}
		
		.d-img{
			width: 36rpx;
			height: 36rpx;
			margin-left: 20rpx;
			
			.img{
				width: 100%;
				height: 100%;
			}
		}
		
		.d_button{
			width: 36rpx;
			height: 36rpx;
			margin-left: 30rpx;
			
			.p-b-btn{
				width: 36rpx;
				height: 36rpx;
				background-color: unset;
				padding-left: unset;
				padding-right: unset;
				font-size: unset;
				line-height: 36rpx;
				margin: 0 !important;
			}
			
			.p-b-btn:after{
				border: 0;
			}
			
			.img{
				width: 100%;
				height: 100%;
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
