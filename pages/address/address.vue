<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.useDefault == 1" class="tag">默认</text>
					<text class="address">{{item.provinceName}} {{item.cityName}} {{item.areaName}}</text>
				</view>
				<view class="address1">{{item.address}}</view>
				<view class="u-box">
					<text class="name">{{item.linkName}}</text>
					<text class="mobile">{{item.linkMobile}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="editAddress(item)"></text>
		</view>
		<!-- <text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可
		</text> -->
		
		<button class="add-btn" @click="addAddress()">新增地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option){
			this.source = option.source;
		},
		onShow(){
			this.$request.ModelOrder.listAddress().then(result => {
				if(result && result.records){
					this.addressList = result.records
				}
			});
		},
		methods: {
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			editAddress(item){
				uni.navigateTo({
					url: `/pages/address/addressManage?id=${item.id}`
				})
			},
			addAddress(){
				uni.navigateTo({
					url: `/pages/address/addressManage`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address1{
		font-size:36rpx;
		font-family:SourceHanSansCN;
		font-weight:500;
		color:rgba(0,0,0,1);
		padding: 20rpx 0 16rpx 0;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			margin-right: 10rpx;
			background: #00A390;
			padding: 6upx 12upx;
			line-height: 1;
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			border-radius: 40%;
			color:rgba(255,255,255,1);
		}
		.address{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
		}
	}
	.u-box{
		font-size:26rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(0,0,0,1);
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #FF443F;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
