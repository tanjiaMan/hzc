<template>
	<view class="container">
		<view class="d_item" v-for="(item,index) in records" :key="index">
			<view class="d_left">
				<image class="img" v-if="item.avatarUrl" :src="item.avatarUrl"></image>
				<image class="img" v-else src="https://pic.youx365.com/config/avatar.jpg"></image>
			</view>
			<view class="d_center">
				<view class="tit_name">{{item.nickName?item.nickName:'平台'}}</view>
				<view class="tit_time">{{item.updateTime}}</view>
			</view>
			<view class="d_right">
				<view v-if="item.follow == false" class="d_button" @click="follow(item)">关注 +</view>
				<view v-else class="d_button_cancel" @click="cancelFollow(item)">取消关注</view>
			</view>
		</view>
		<uni-load-more :status="loadingType" style="width: 100%;"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				loadingType: 'more',
				pageIndex: 1,
				pageSize: 20,
				records:[],
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		onLoad(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			async loadData(loadType){
				if(loadType == 'refresh'){
					this.pageIndex = 1;
					this.loadingType = 'more';
					this.records = [];
				}
				if(this.loadingType === 'loading' || this.loadingType == 'noMore'){
					return;
				}
				this.loadingType = 'loading'
				let values = {pageIndex:this.pageIndex,pageSize: this.pageSize};
				let result = await this.$request.ModelUser.pageFollow(values);
				result = result || {};
				let orderList = result.records || [];
				orderList.forEach(item=>{
					this.records.push(item);
				})
				if(orderList.length < this.pageSize){
					this.loadingType = 'noMore';
				}else{
					this.loadingType = 'more'; 
				}
				this.pageIndex = this.pageIndex + 1;
			},
			follow(item){
				this.$request.ModelUser.followUserId(item.followUserId).then(res => {
					if(result.code == 'ok'){
						this.$api.msg('关注成功');
						item.follow = true;
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			cancelFollow(item){
				this.$request.ModelUser.cancelFollowUserId(item.followUserId).then(res => {
					if(result.code == 'ok'){
						this.$api.msg('取消成功');
						item.follow = false;
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
		}
	}
</script>

<style lang='scss'>
	body{
		background-color: #FFFFFF;
	}
	
	.d_item{
		width: 702rpx;
		margin: 20rpx auto;
		border-bottom: solid 1px #E5E5E5;
		display: flex;
		align-items: center;
		padding: 24rpx 0;
		
		.d_left{
			width:107rpx;
			height:107rpx;
			margin-right: 34rpx;
			
			.img{
				width: 100%;
				height: 100%;
				border-radius:50%;
			}
		}
		
		.d_center{
			.tit_name{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.tit_time{
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
		}
		
		.d_right{
			flex: 1;
			text-align: right;
			
			.d_button{
				float: right;
				height:58rpx;
				width: 145rpx;
				line-height: 58rpx;
				text-align: center;
				padding: 0 20rpx;
				border-radius: 40rpx;
				background-color: #FF4B38;
				color: #ffffff;
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
			}
			
			.d_button_cancel{
				float: right;
				height:58rpx;
				width: 145rpx;
				line-height: 58rpx;
				text-align: center;
				padding: 0 20rpx;
				border-radius: 40rpx;
				background-color: #EAEAEA;
				color: #A2A2A2;
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
			}
		}
	}
</style>
