<template>
	<view class="container">
		<view class="header">
			<img class="img" :src="transUser.avatarUrl" />
			<view class="header-tit1">
				{{transUser.nickName}}
			</view>
			<view class="header-tit2">
				{{transUser.mobile}}
			</view>
		</view>
		
		<view class="order-item uni-flex uni-row">
			<view class="flex-item v1">
				<view class="v11"><text class="tit1">¥</text><text class="tit2">{{coupon.discountPrice}}</text></view>
				<view class="tit3">剩余 {{coupon.leftStock}} 个</view>
			</view>
			<view class="flex-item v2">
				<view class="tit4">
					 满{{coupon.priceThreshold>0?coupon.priceThreshold:coupon.discountPrice}}可用
				</view>
				<view>
					<text class="tit5">有效期至：{{coupon.expireDate.split(' ')[0]}}</text>
				</view>
			</view>
		</view>
		
		<view class="bt1" @click="trans">
			确定
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				redPackageId: null,
				transUserId: 0,
				transUser:{},
				coupon:{},
			};
		},
		onLoad(option){
			this.redPackageId = option.redPackageId;
			this.transUserId = option.transUserId;
			this.$request.ModelUser.searchUser({userId: this.transUserId}).then(result => {
				if(result.records == null || result.records.length == 0){
					this.$api.msg('用户不存在!');
					return;
				}
				this.transUser = result.records[0];
			})
			this.$request.ModelHome.infoCouponRedPackage(this.redPackageId).then(result => {
				this.coupon = result;
			})
		},
		methods:{
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			async trans(){
				let values = {couponId: this.redPackageId,toUserId: this.transUserId,num: 1};
				var that = this;
				uni.showModal({
				    content: '确定转赠',
				    success: function (res) {
				        if (res.confirm) {
				            that.$request.ModelHome.transCouponRedPackage(values).then(result => {
								if(result.code == 'ok'){
									that.$api.msg('转赠成功');
								}else{
									that.$api.msg(result.msg);
								}
							});
				        }
				    }
				});
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
	
	.header{
		text-align: center;
		padding-top: 40rpx;
		
		.img{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}
		
		.header-tit1{
			font-size:34rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		
		.header-tit2{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(119,119,119,1);
		}
	}
	
	.d-money{
		width: 651rpx;
		height: 169rpx;
		background:rgba(238,238,238,1);
		border-radius:20rpx;
		margin: 63rpx auto 0;
	}
	
	.container{
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		
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
	
	.order-item{
		background: #fff;
		margin: 24rpx auto 0;
		width: 712rpx;
		height: 156rpx;
		border-radius: 10rpx;
		background-image: url('https://pic.youx365.com/rp-bg.png');
		background-size: cover;
		
		.tit1{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.tit2{
			font-size:68rpx;
			font-family:SourceHanSansCN;
			font-weight:bold;
			color:rgba(255,255,255,1);
			margin-left: 20rpx;
		}
		
		.tit3{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.v1{
			width: 224rpx;
			text-align: center;
			
			.v11{
				line-height: 1;
				margin-top: 37rpx;
			}
		}
		
		.v2{
			width: 488rpx;
			padding-left: 40rpx;
			
			.tit4{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				height: 78rpx;
				vertical-align: bottom;
				display: table-cell;
			}
			
			.tit5{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height: 78rpx;
			}
			
			.btzz{
				width: 104rpx;
				height: 48rpx;
				background-color: #FFC22F;
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
				text-align: center;
				float: right;
				margin-right: 30px;
				border-radius: 12rpx;
			}
		}
	}
</style>
