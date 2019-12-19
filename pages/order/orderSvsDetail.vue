<template>
	<view class="container">
		<view class="linetop"></view>
		<view class="header uni-flex uni-row">
			<view class="dleft flex-item">
				<view class="tit1">
					退款成功
				</view>
				<view class="tit2">
					2019年9月12日
				</view>
			</view>
			<view class="dright flex-item">
				<view class="bt">查看进度</view>
			</view>
		</view>
		<view class="v-goods">
			<view class="v-frame goodsdetail uni-flex uni-row">
				<view class="dimg flex-item"><img class="img" src="https://pic.youx365.com/0/03eec1250836d3c566d2645842c8495b.png" /></view>
				<view class="dtitle">男士短袖体t恤港风ins潮牌2019 新款夏装</view>
			</view>
			<view class="line"></view>
			<view class="v-frame v-descf">
				<text class="tit1">申请时间： </text><text class="tit2">2019.09.14 09:25:30</text>
			</view>
			<view class="line"></view>
			<view class="v-frame v-descf">
				<text class="tit1">申请理由： </text><text class="tit2">买多了</text>
			</view>
			<view class="line"></view>
			<view class="v-frame v-descf">
				<text class="tit1">退款方式： </text><text class="tit2">原路返回</text>
			</view>
			<view class="line"></view>
			<view class="v-frame v-descf">
				<text class="tit1">申请金额： </text><text class="tit3">￥</text><text class="tit4">199.00</text>
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
	.linetop{
		height: 31rpx;
	}
	.line{
		width:630rpx;
		height:1px;
		background:rgba(225,225,225,1);
		opacity:0.41;
		margin: 0 auto;
	}
	.header{
		width:711rpx;
		height:177rpx;
		background:#00A390;
		border-radius:10rpx;
		margin: 0 auto;
		
		.dleft{
			width: 60%;
			padding-left: 55rpx;
			padding-top: 49rpx;
		}
		
		.tit1{
			font-size:36rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:#FFFFFF;
			line-height: 1.3;
		}
		
		.tit2{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:#FFFFFF;
		}
		
		.dright{
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-right: 28rpx;
			
			.bt{
				height: 63rpx;
				width: 154rpx;
				line-height: 63rpx;
				text-align: center;
				background-color: #FFB238;
				font-size:29rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:#FFFFFF;
				border-radius: 10rpx;
			}
		}
	}
	
	.v-goods{
		width: 711rpx;
		height: 519rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		margin: 40rpx auto;
		
		.v-frame{
			width: 630rpx;
			margin: 0 auto;
		}
		
		.goodsdetail{
			
			.dimg{
				padding: 17rpx 30rpx 20rpx 0;
			}
			
			.img{
				height: 148rpx;
				width: 172rpx;
			}
			
			.dtitle{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
				padding: 30rpx 0 0 0;
			}
		}
		
		.v-descf{
			height: 73rpx;
			line-height: 73rpx;
			display: flex;
			
			.tit1{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color: #333333;
				flex: 1;
			}
			
			.tit2{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color: #888888;
				width: 50%;
				text-align: right;
			}
			
			.tit3{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#FF4B38;
			}
			
			.tit4{
				font-size:30rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#FF4B38;
			}
		}
	}
</style>
