<template>
	<view>
		<view class="notice-header uni-flex uni-row">
			<view class="flex-item d_1">
				<img src="https://pic.youx365.com/notice_3.png" />
				<view class="tit">
					赞和收藏
				</view>
			</view>
			<view class="flex-item d_1">
				<img src="https://pic.youx365.com/notice_1.png" />
				<view class="tit">
					新增关注
				</view>
			</view>
			<view class="flex-item d_1">
				<img src="https://pic.youx365.com/notice_2.png" />
				<view class="tit">
					评论我的
				</view>
			</view>
		</view>
		
		<view class="notice-detail">
			<view class="tab_item uni-flex uni-row" v-for="item in 10" :key="item">
				<view class="flex-item d_1">
					<img class="img" src="https://pic.youx365.com/wazi2.JPG"  />
				</view>
				<view class="flex-item d_2">
					<view class="tit1">系统通知</view>
					<view class="tit2">xxx商品打折消息商品打折消息商品打折消息商品打折消息商品打折消息商品打折消息商品打折消息商品打折消息商品打折消息</view>
				</view>
				<view class="flex-item d_3">
					<view class="tit3">2017-01-23</view>
					<view class="tit4"></view>
				</view>
			</view>
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
	page {
		background-color: #FFFFFF;
		padding-bottom: 30upx;
	}

	.notice-header{
		position: fixed;
		width: 100%;
		background-color: #F6F6F6;
		z-index: 1;
		
		.d_1{
			width: 33.33%;
			text-align: center;
			padding: 30rpx 0;
		}
		
		.tit{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		image{
			width: 56rpx;
			height: 56rpx;
		}
		
		img{
			width: 56rpx;
			height: 56rpx;
		}
	}

	.notice-detail{
		padding: 200rpx 28rpx 28rpx 28rpx;;
		
		.tab_item{
			width: 100%;
			height: 157rpx;
			border-bottom: 1px solid #E8E8E8;
			
			.d_1{
				width: 150rpx;
				text-align: center;
				height: 157rpx;
				line-height: 157rpx;
			}
			
			.img{
				width:107rpx;
				height:107rpx;
				border-radius:50%;
				vertical-align: middle;
			}
			
			.d_2{
				width: 403rpx;
				
				.tit1{
					font-size:28rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					padding-top: 37rpx;
				}
				
				.tit2{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: scroll;
					padding-right: 20px;
				}
			}
			
			.d_3{
				width: 141rpx;
				height: 157rpx;
				line-height: 157rpx;
				text-align: center;
				position: relative;
				
				.tit3{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(102,102,102,1);
					padding-top: 38rpx;
				}
				
				.tit4{
					width:13rpx;
					height:13rpx;
					background:rgba(255,68,63,1);
					border-radius:50%;
					position: absolute;
					right: 0;
					margin-top: 12rpx;
				}
			}
		}
	}
</style>
