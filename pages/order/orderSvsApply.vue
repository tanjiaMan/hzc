<template>
	<view class="container">
		<view class="d_header">
			<view class="d_left">
				<image class="img1" :src="order.orderDetails[0].coverPicUrl" mode="aspectFill"></image>
			</view>
			<view class="d_right">
				{{order.orderDetails[0].productName}}
			</view>
		</view>
		<view class="d_body">
			<view class="tit1">退款原因：</view>
			<view>
				<picker @change="bindPickerChange" :value="index" :range="array">
				    <view class="d_select">
						<view class="titSelect">{{array[index]}}</view>
						<view class="d_select_right">
							<image class="imgselect" src="https://pic.youx365.com/59573c8de88e3b8.png" mode="aspectFill"></image>
						</view>
					</view>
				</picker>
			</view>
			<view class="line"></view>
			<view class="d_item">
				<view class="tit1">退款金额：</view>
				<view class="tit2"><text class="tit21">￥</text>{{order.totalPrice}}</view>
			</view>
			<view class="line"></view>
			<view class="d_item">
				<view class="tit1">退款方式：</view>
				<view class="tit3">原路退回</view>
			</view>
			<view class="line"></view>
		</view>
		
		<view class="d_bt" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:{},
				orderDetailId:0,
				//picker
				index: 0,
				array: ['不喜欢，效果不好', '多拍，错拍，不想要', '做工问题', '货物与描述不符','质量问题','卖家发错货','其他'],
				
				//
			}
		},
		onLoad(option){
			let orderDetailId = option.orderDetailId;
			this.orderDetailId = orderDetailId;
			this.$request.ModelOrder.infoOrderPD(orderDetailId).then(result => {
				this.order = result;
			})
		},
		methods: {
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
			},
			submit(){
				let value = {message: this.array[this.index],orderDetailId: this.orderDetailId};
				this.$request.ModelOrder.applySale(value).then(result => {
					if(result.code == 'ok'){
						this.$api.msg('申请成功');
						this.$fire.$emit('refresh',{});
						uni.navigateBack({delta: 1});
					}else{
						this.$api.msg(result.msg);
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	.d_header{
		width:711rpx;
		height:177rpx;
		background:rgba(255,255,255,1);
		border-radius:10px;
		margin: 31rpx auto 22rpx;
		display: flex;
		padding-top: 23rpx;
		
		.d_left{
			width: 200rpx;
			text-align: center;
			
			.img1{
				width:132rpx;
				height:131rpx;
			}
		}
		
		.d_right{
			flex: 1;
			padding-right: 25rpx;
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
	}
	
	.d_body{
		width:711rpx;
		height:509rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		margin: 0 auto;
		padding: 35rpx;
		
		.line{
			width: 100%;
			height: 1px;
			background-color: #F2F2F2;
			border-radius:1rpx;
		}
		
		.titSelect{
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(153,153,153,1);
			height: 75rpx;
			line-height: 75rpx;
			flex: 1;
		}
		
		.d_select_right{
			height: 75rpx;
			line-height: 75rpx;
			
			.imgselect{
				width: 20rpx;
				height: 9rpx;
			}
		}
		
		.d_select{
			display: flex;
		}
		
		.d_item{
			display: flex;
			height: 100rpx;
			align-items: center;
		}
		
		.tit1{
			font-size:28rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(51,51,51,1);
			flex: 1;
		}
		
		.tit2{
			font-size:31rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(229,68,0,1);
		}
		
		.tit21{
			font-size:24rpx;
		}
		
		.tit3{
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(104,104,104,1);
		}
	}
	
	.d_bt{
		width:706rpx;
		height:106rpx;
		line-height:106rpx;
		background:rgba(255,75,56,1);
		border-radius:10rpx;
		margin: 58rpx auto;
		font-size:35rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
	}
</style>
