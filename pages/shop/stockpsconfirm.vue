<template>
	<view class="container">
		<view>
			<view class="goods-item">
				<view class="image-wrapper">
					<image :src="item.coverPicUrl" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.productName}}</text>
				<view class="price-box">
					<text class="name">零售价：<text class="price">{{item.productPrice}}</text></text>
					<!-- <text>已销 {{item.orderNums}}</text> -->
				</view>
				<view class="price-box">
					<text class="name">进货价：<text class="price">{{item.agentPrice}}</text></text>
					<!-- <text>剩余 {{item.orderNums}}</text> -->
				</view>
				<view class="ghs-box">
					<text class="name"> 供货商：</text><img v-if="item.shopUserAvatarUrl" class="img" :src="item.shopUserAvatarUrl" /><text class="tit1">{{item.shopUserName}}</text>
				</view>
			</view>
		</view>
		
		<view class="d-money">
			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="flex-item titmy">
					进货
				</view>
			</view>
			<view class="uni-flex uni-row d_1">
				<view class="flex-item d_3">
					<input @input="input" v-model="num" class="input" type="number" placeholder="请输入进货件数" placeholder-style="color:#CACACA;font-size:13px;" />
				</view>
				<view class="flex-item d_4">
					件
				</view>
			</view>
		</view>
		<view class="d-count">
			共<text class="titcount">{{(num != '' && num > 0)?num:0}}</text>件商品，合计 <text class="titcount">¥{{total}}</text>元
		</view>
		
		<!-- <view class="pay-type-list"> -->
			<!-- <view class="type-item b-b" @click="changePayType(1)">
				<img src="https://pic.youx365.com/wx-pay.png" />
				<view class="con">
					<text class="tit">微信支付</text>
					<text>亿万用户的选择，更快更安全</text>
				</view>
				<view
					class="yticon icon-xuanzhong2 checkbox"
					:class="payType == 1? 'checked':''"
				></view>
			</view> -->
			<!-- <view class="type-item" @click="changePayType(3)">
				<img class="img-xj" src="https://pic.youx365.com/xj-pay.png" />
				<view class="con">
					<text class="tit">代金券支付</text>
					<text>代金券支付，为靠谱买单</text>
				</view>
				<view
					class="yticon icon-xuanzhong2 checkbox"
					:class="payType == 3? 'checked':''"
				></view>
			</view> -->
		<!-- </view> -->
		
		<view class="bt1" @click="submit">
			确定进货
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				productId:0,
				payType: 1,
				item:{},
				total: 0,
				num: "",
			};
		},
		onLoad(option){
			this.productId = option.productId;
			this.loadData();
		},
		methods:{
			async loadData(){
				this.item = await this.$request.ModelHome.getAgentProduct(this.productId);
			},
			input(e){
				if(this.num != "" && this.num > 0){
					this.total = this.num * this.item.agentPrice;	
				}else{
					this.total = 0;
				}
			},
			submit(){
				if(this.num != "" && this.num > 0){
					var that = this;
					uni.showModal({
					    content: '确定进货商品',
					    success: function (res) {
					        if (res.confirm) {
					            let values = {productId: that.item.productId,quantity: that.num};
					            that.$request.ModelHome.purchaseStock(values).then(result => {
									if(result.code == 'ok'){
										that.$api.msg('进货成功');
										that.num = "";
										that.total = 0;
									}else{
										that.$api.msg(result.msg);
									}
								});
					        }
					    }
					});
				}else{
					this.$api.msg('请输入正确的进货数量');
				}
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	
	.goods-item{
		display:flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 40upx;
		margin: 0 auto;
		
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			margin-top: 24rpx;
			text-align: center;
			margin-bottom: 14rpx;
		}
		
		.ghs-box{
			display: flex;
			align-items: center;
			
			.name{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
			
			.img{
				width: 25rpx;
				height: 25rpx;
				border-radius: 50%;
				margin-right: 16rpx;
			}
			
			.tit1{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(1,1,1,1);
			}
		}
		
		.bt-box{
			margin-top: 20rpx;
			
			.bt1{
				width:158rpx;
				height:52rpx;
				line-height:52rpx;
				text-align: center;
				background:rgba(0,163,144,1);
				border-radius:6rpx;
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
		}
		
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10rpx;
			
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(153,153,153,1);
			line-height: 44rpx;
			
			.name{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
		}
		.price{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,68,63,1);
			
			&:before{
				content: '￥';
				font-size: 24rpx;
			}
		}
	}
	
	.d-count{
		font-size:24rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:#333333;
		text-align: right;
		padding-right: 60rpx;
		margin-top: 20rpx;
		
		.titcount{
			color: #FF443F;
			padding: 0 10rpx;
		}
	}
	
	.d-money{
		width: 651rpx;
		height: 169rpx;
		background:rgba(238,238,238,1);
		border-radius:20rpx;
		margin: 0 auto;
	}
	
	.container{
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		
		.titmy{
			width: 100%;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height: 70rpx;
			text-align: center;
		}
		
		.d_1{
			width: 360rpx;
			margin: -20rpx auto 0;
			height: 118rpx;
			line-height: 118rpx;
		}
		
		.d_2{
			vertical-align: middle;
			width: 60rpx;
			line-height: 118rpx;
			height: 118rpx;
			
			.img1{
				width: 46rpx;
				height: 46rpx;
				vertical-align: middle;
			}
		}
		
		.d_3{
			vertical-align: middle;
			width: 240rpx;
			line-height: 118rpx;
			height: 118rpx;
			
			.input{
				line-height: 118rpx;
				height: 118rpx;
				font-size: 60rpx;
			}
		}
		
		.d_4{
			text-align: center;
			width: 60rpx;
			line-height: 118rpx;
			height: 118rpx;
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		.tit2{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
			margin-top: 73rpx;
			margin-left: 38rpx;
		}
		
		.tit3{
			padding: 38rpx;
			font-size:22rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(144,144,144,1);
			line-height:48rpx;
		}
		
		.bt1{
			width: 656rpx;
			height: 108rpx;
			line-height: 100rpx;
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			background-image: url('https://pic.youx365.com/withdraw_bt.png');
			background-size: cover;
			text-align: center;
			margin: 140rpx auto 20rpx;
		}
		
		.bt2{
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,102,102,1);
			width: 656rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			margin: 0 auto;
		}
	}
	
	.pay-type-list {
		background-color: #fff;
		padding-left: 30rpx;
		margin-top: 104rpx;
		
		.type-item{
			height: 146rpx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			position:relative;
			font-size:32rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			
			img{
				height: 56rpx;
				width: 64rpx;
				margin-right: 33rpx;
			}
			
			.img-xj{
				width: 68rpx;
				height: 68rpx;
			}
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size:20rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(130,130,130,1);
		}
		
		.checkbox{
			font-size: 56rpx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
			height: 100%;
		}
		.checkbox.checked{
			color: #00A390;
		}
	}
</style>
