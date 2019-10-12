<template>
	<view class="container">
		<view class="v-search">
			<view class="input-view">
				<img class='img' src="https://pic.youx365.com/search.png" />
				<input v-model="phone" confirm-type="search" @blur="confirm" class="input" type="number" placeholder="请输入对方手机号码" placeholder-class="placeholder" />
			</view>
		</view>
		
		<view class="v-history">
			<view class="v-header uni-flex uni-row">
				历史转增列表
			</view>
			<view class="v-cotent">
				<uni-swipe-action :options="options1" @click="bindClick(index)" v-for="(item,index) in 4" :key="index">
					<view class="uni-flex uni-row">
						<view class="flex-item d-img">
							<img class="img" src="https://pic.youx365.com/withdraw_money.png"  />
						</view>
						<view class="flex-item" style="margin-left: 15px;">
							<view class="uni-flex uni-row">
								<view class="flex-item tit1">主打也有春天</view>
								<view class="flex-item tag1">普通会员</view>
								<view class="flex-item tag2">上级</view>
							</view>
							<view class="tit2">15266254352</view>
						</view>
					</view>
				</uni-swipe-action>	
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	
	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
				phone: '',
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
			}
		},
		methods: {
			confirm(){
				console.log('confirm');
				this.$api.msg(this.phone);
				uni.navigateTo({
					url: `/pages/withdraw/transconfirm`
				})
			},
			bindClick(index){
				console.log(index);
			}
		}
	}
</script>

<style lang='scss'>
	page, .container{
		background: $page-color-base;
		height: 100%;
	}
	
	.v-search{
		background-color: #FFFFFF;
		height: 150rpx;
		padding-top: 44rpx;
	}
	
	.v-history{
		margin-top: 15rpx;
		width: 100%;
		background-color: #FFFFFF;
		height: calc(100% - 83px);
		
		.v-header{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(51,51,51,1);
			padding-left: 22rpx;
			line-height: 80rpx;
		}
	}
	
	.v-cotent{
		width: 690rpx;
		margin: 0 auto;
		
		/deep/ .uni-swipe-action{
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: solid 1px #E5E5E5;
		}
		
		.uni-swipe-action{
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: solid 1px #E5E5E5;
		}
		
		.d-img{
			display: flex;
			align-items: center;
		}
		
		.img{
			height: 66rpx;
			width: 66rpx;
		}
		
		.tit1{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		
		.tag1{
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			background:rgba(255,68,63,1);
			border-radius:4rpx;
			height: 35rpx;
			line-height: 35rpx;
			padding: 0 10rpx 0 10rpx;
			margin-left: 20rpx;
		}
		
		.tag2{
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,68,63,1);
			height: 35rpx;
			line-height: 35rpx;
			border:1px solid rgba(255,68,63,1);
			border-radius:4px;
			padding: 0 10rpx 0 10rpx;
			margin-left: 20rpx;
		}
		
		.tit2{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(119,119,119,1);
		}
	}
	
	.input-view {
		width: 676rpx;
		display: flex;
		background-color: rgba(234,234,234,1);;
		height: 77rpx;
		border-radius: 40rpx;
		padding: 0 4%;
		flex-wrap: nowrap;
		line-height: 77rpx;
		margin: 0 auto;
		
		.img{
			margin-top: 20rpx;
			width: 36rpx;
			height: 36rpx;
		}
		
		.input {
			width: 100%;
			height: 77rpx;
			line-height: 77rpx;
			padding: 0 3%;
		}
		
		.placeholder{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(114,114,114,1);
		}
	}
</style>
