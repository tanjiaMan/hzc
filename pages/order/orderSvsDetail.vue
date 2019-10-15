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
		height: 40rpx;
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
		height:143rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		margin: 0 auto;
		
		.dleft{
			width: 60%;
			padding-left: 61rpx;
			padding-top: 30rpx;
		}
		
		.tit1{
			font-size:36rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,68,63,1);
			line-height: 1.3;
		}
		
		.tit2{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		.dright{
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-right: 28rpx;
			
			.bt{
				height: 60rpx;
				width: fit-content;
				line-height: 60rpx;
				text-align: center;
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,68,63,1);
				border-radius: 60rpx;
				border: solid 1px #FF443F;
				padding: 0 20rpx 0 20rpx;
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
			
			.tit1{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#666666;
			}
			
			.tit2{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#333333;
			}
			
			.tit3{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#FF443F;
			}
			
			.tit4{
				font-size:30rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#FF443F;
			}
		}
	}
</style>
