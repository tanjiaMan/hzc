<template>
	<view class="container">
		<view class="goods-item uni-flex uni-row" v-for="(item,index) in 4" :key="index">
			<view class="dleft">
				<view class="bk_index_text"><text class="num">{{index + 1}}</text></view>
				<image src="https://pic.youx365.com/0/3d3eb27fa52c439607ca26e4225cfca6.jpg" mode="aspectFill"></image>
			</view>
			<view class="dcenter">
				<view class="tit1">
					热风时尚专属女鞋
				</view>
				<view class="tit2">
					韩国旅行流苏潮女小双肩包女成人儿童
				</view>
				<view class="d1">
					<text class="tit3">¥</text><text class="tit4">14.9</text>
				</view>
			</view>
			<view class="dright">
				<view class="bt">1323</view>
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
	.container{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		
		.goods-item{
			width: 700rpx;
			margin: 0 auto;
			border-bottom: solid 1px #E8E8E8;
			height: 232rpx;
			padding-top: 30rpx;
			
			.dleft{
				width: 180rpx;
				position: relative;
				
				>image{
					height: 180rpx;
					width: 180rpx;
					border-radius:10rpx;
				}
				
				.bk_index_text{
					color:white;
					position:absolute;
					top: 0;
					left: 0;
					z-index:9999;
					font-size:20rpx;
					font-family:PangMenZhengDao;
					font-weight:400;
					color:rgba(255,255,255,1);
					width: 48rpx;
					height: 48rpx;
					background-image: url('https://pic.youx365.com/usta-bg.png');
					background-size: cover;
					
					.num{
						margin-top: -1px;
						margin-left: 4rpx;
					}
				}
			}
			
			.dcenter{
				width: 420rpx;
				padding-left: 34rpx;
				
				.tit1{
					font-size:26rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(18,18,18,1);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.tit2{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(102,102,102,1);
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				
				.tit3{
					font-size:20rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,68,63,1);
				}
				
				.tit4{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(255,68,63,1);
				}
			}
			
			.dright{
				width: 100rpx;
				
				.bt{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,68,63,1);
					border:1px solid rgba(255,68,63,1);
					border-radius:30rpx;
					text-align: center;
					height: 34rpx;
					line-height: 34rpx;
				}
			}
		}
	}
</style>
