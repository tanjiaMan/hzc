<template>
	<view class="container">
		<view class="d-user">
			<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" /> 
			<text class="tit1">红薯地里的小狼狗</text>
		</view>
		
		<view class="d-goods uni-flex uni-row">
			<view class="dleft">
				<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" /> 
			</view>
			<view class="dright">
				<view class="tit1">林氏木业北欧懒人沙发阳欧懒人沙发阳</view>
				<view class="s-header">
					<text class="hour timer">23</text>
					<text class="minute timer">15</text>
					<text class="second timer">23</text>
					<text class="tip">后结束</text>
				</view>
			</view>
		</view>
		
		<view class="bt-kj" @click="kanjia">
			帮砍一刀
		</view>
		
		<view class="bt-record">
			帮砍一刀
		</view>
		
		<view class="d-record uni-flex uni-row" v-for="(item,index) in 3" :key="index">
			<view class="d-user" style="width: 50%;">
				<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" /> 
				<text class="tit1">红薯地里的小狼狗</text>
			</view>
			<view class="dright" style="width: 50%;">
				砍掉23.25元
			</view>
		</view>
		
		<view class="line">
		</view>
		
		<view class="d-list">
			<view class="list-header">
				<img src="https://pic.youx365.com/split-1.png" />
				<text>砍价列表</text>
				<img src="https://pic.youx365.com/split-1.png" />
			</view>
			<view class="goods-list uni-flex uni-row" v-for="(item,index) in 7" :key="index">
				<view class="flex-item dleft">
					<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
				</view>
				<view class="flex-item dright">
					<view class="tit3">林氏木业北欧懒人沙发阳台林氏木业北欧懒人沙发阳台...</view>
					<view class="uni-flex uni-row price">
						<view style="width: 50%;">
							<text class="tit1">¥</text><text class="tit2">1000.00</text>
						</view>
						<view style="width: 50%;">
							<view class="bt1">我要砍价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			kanjia(){
				uni.navigateTo({url: '/pages/index/kjsuccess'})
			}
		}
	}
</script>

<style lang='scss'>
	.container{
		background-color: #FFFFFF;
		width: 100vw;
		height: 100vh;
		padding: 0 20rpx;
	}
	
	.d-user{
		height: 100rpx;
		display: flex;
		align-items: center;
		
		.img{
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}
		
		.tit1{
			font-size:24rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-left: 27rpx;
		}
	}

	.d-goods{
		.dleft{
			width: 285rpx;
			
			.img{
				width: 260rpx;
				height: 160rpx;
			}
		}
		
		.dright{
			width: 425rpx;
			
			.tit1{
				font-size:26rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			
			.s-header{
				margin-top: 30rpx;
				display:flex;
				align-items:center;
				
				.tip{
					margin:0 6rpx 0 6rpx;
					font-size:22rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(70,70,70,1);
				}
				.timer{
					display:inline-block;
					width:40rpx;
					height:31rpx;
					text-align:center;
					line-height:31rpx;
					margin-right:14rpx;
					font-size:22rpx;
					font-family:Microsoft YaHei;
					color:#FFFFFF;
					border-radius:3rpx;
					background:#FF443F;
				}
			}
		}
	}
	
	.bt-kj{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		background-color: #FF443F;
		border-radius: 10rpx;
		margin-top: 10rpx;
	}
	
	.bt-record{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		background-color: #00A390;
		border-radius: 10rpx;
		margin-top: 44rpx;
	}
	
	.d-record{
		padding-left: 40rpx;
		
		.dright{
			height: 100rpx;
			line-height: 100rpx;
			font-size:24rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: right;
			padding-right: 40rpx;
		}
	}
	
	.line{
		width:750rpx;
		height:15rpx;
		background:rgba(246,246,246,1);
		margin-left: 20rpx;
	}
	
	.d-list{
		.list-header{
			text-align: center;
			font-size:32rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			padding: 40rpx 0 30rpx 0;
			
			
			img{
				height: 48rpx;
				width: 48rpx;
				vertical-align: middle;
				padding: 0px 5px 0 5px;
			}
		}
		
		.goods-list{
			width: 711rpx;
			height: 203rpx;
			border-radius: 7rpx;
			background-color: #FFFFFF;
			margin: 15rpx auto 0;
			
			.dleft{
				width: 276rpx;
				display: flex;
				align-items: center;
				
				.img{
					width: 180rpx;
					height: 180rpx;
					margin-left: 40rpx;
				}
			}
			
			.dright{
				width: 435rpx;
				padding-right: 30rpx;
				
				.tit3{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size:26rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-top: 28rpx;
				}
				
				.price{
					display: flex;
					align-items: center;
					height: 120rpx;
					line-height: 120rpx;
					
					.tit1{
						font-size:26rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(255,68,63,1);
					}
					
					.tit2{
						font-size:34rpx;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(255,68,63,1);
					}
					
					.bt1{
						font-size:24rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,255,255,1);
						width:118rpx;
						height:49rpx;
						line-height:49rpx;
						background:rgba(0,163,144,1);
						border-radius:4px;
						text-align: center;
						float: right;
					}
				}
			}
		}
	}
</style>

