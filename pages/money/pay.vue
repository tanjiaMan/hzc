<template>
	<view class="app">
		<view class="price-box">
			<text>剩余支付时间 {{i}}:{{s}}</text>
			<text class="price">{{orderInfo.totalPrice}}</text>
		</view>
		<view class="line-bg">
			
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<img src="https://pic.youx365.com/pay-wx.png" />
				<view class="con">
					<text class="tit">微信支付</text>
					<!-- <text>推荐使用微信支付</text> -->
				</view>
				<view
					class="yticon icon-xuanzhong2 checkbox"
					:class="payType == 1? 'checked':''"
				></view>
			</view>
			<view class="type-item" @click="changePayType(3)">
				<img src="https://pic.youx365.com/pay-yue.png" />
				<view class="con">
					<text class="tit">余额支付（¥{{amount}}）</text>
				</view>
				<view
					class="yticon icon-xuanzhong2 checkbox"
					:class="payType == 3? 'checked':''"
				></view>
			</view>
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
		
		<uni-popup ref="popup" type="bottom" class="zfmm">
			<view class="close">
				<img class="img" src="https://pic.youx365.com/close.png" @click="zfclose" />
			</view>
			<view class="tit1">
				请输入支付密码
			</view>
			<view class="input-row">
				<view :class="['item',{'item-active':codeLength==index}]" v-for="(k,index) in lengthArr" :key="index">
					{{code.charAt(index)}}
				</view>
			</view>
			<view class="bt" @click="mmpay">确认支付</view>
			<DigitalKeyboard @change="contToggle" :keyBoardSwitch="true" :decimalPoint="false"></DigitalKeyboard>
		</uni-popup>
	</view>
</template>

<script>
	import DigitalKeyboard from '@/components/digital-keyboard/digital-keyboard.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components:{
			DigitalKeyboard,uniPopup
		},
		data() {
			return {
				payType: 1,
				orderInfo: {},
				orderNum: null,
				amount: 0,
				
				//倒计时
				timer: null,
				seconds: 0, //剩余支付时间
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				
				//支付密码
				code:'',
				codeLength: 0,
				lengthArr:[{},{},{},{},{},{}],
				length:6,
			};
		},
		onLoad(options) {
			let orderNum = options.orderNum;
			this.orderNum = orderNum;
			this.$request.ModelOrder.infoOder(orderNum).then(result => {
				this.orderInfo = result || {};
				if(result && result.leftPaySeconds && result.leftPaySeconds>0){
					this.seconds = result.leftPaySeconds;
				}
			})
			this.$request.ModelUser.getAmount().then(result => {
				if(result && result.userBalance){
					this.amount = result.userBalance;
				}
			})
		},
		created: function(e) {
			this.countDown()
			this.timer = setInterval(() => {
				this.seconds--
				if (this.seconds < 0) {
					this.timeUp()
					return
				}
				this.countDown()
			}, 1000)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm() {
				if(this.payType == 1){ //微信支付
					this.wxPay()
				}else{
					this.zfshow();
				}
			},
			async wxPay(){
				let result = await this.$request.ModelOrder.getPayInfo(this.orderNum);
				if(result.code != 'ok'){
					this.$api.msg(result.msg);
					return;
				}
				result = result.data;
				var that = this;
				if(result.payStatus && result.payStatus == true){
					let payinfo = JSON.parse(result.data);
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: payinfo.timeStamp,
					    nonceStr: payinfo.nonceStr,
					    package: payinfo.package,
					    signType: 'MD5',
					    paySign: payinfo.paySign,
					    success: function (res) {
					       uni.redirectTo({
								url: '/pages/money/paySuccess?orderNum=' + that.orderNum
					       });
					    },
					    fail: function (err) {
					        that.$api.msg('您已取消支付');
					    }
					});
				}else{
					this.$api.msg('预支付失败，请稍后重试');
				}
			},
			//定时器
			timeUp() {
				clearInterval(this.timer)
			},
			countDown() {
				let seconds = this.seconds
				let [day, hour, minute, second] = [0, 0, 0, 0]
				if (seconds > 0) {
					day = Math.floor(seconds / (60 * 60 * 24))
					hour = Math.floor(seconds / (60 * 60)) - day * 24
					minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60
					second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
				} else {
					this.timeUp()
				}
				if (day < 10) {
					day = '0' + day
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				this.d = day
				this.h = hour
				this.i = minute
				this.s = second
			},
			//支付密码
			zfshow(){
				this.code = '';
				this.codeLength = 0;
				this.$refs.popup.open();
			},
			zfclose(){
				this.$refs.popup.close();
			},
			async mmpay(){
				if(this.codeLength != this.length){
					return;
				}
				console.log(this.code); //TODO code校验
				let result = await this.$request.ModelUser.ckPwd(this.code);
				if(result == true || result == 'true'){
					result = await this.$request.ModelOrder.payBalance(this.orderNum);
					if(result.code == 'ok'){
						this.$refs.popup.close();
						uni.redirectTo({
							url: '/pages/money/paySuccess?orderNum=' + this.orderNum
						});
					}else{
					    this.$api.msg(result.msg);	
					}
				}else{
					this.code = '';
					this.codeLength = 0;
					this.$api.msg('密码不正确');
					return;
				}
			},
			contToggle(k){
				let len = this.code.length;
				if(k===''){
					this.code = this.code.substring(0,len-1);
					this.codeLength = this.code.length;
					return;
				}
				if(len >= this.length){
					return;
				}
				this.codeLength = len + 1;
				this.code += k.toString();
				if(this.length===len+1){
					return;
				}
			}
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size:32rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(0,0,0,1);

		.price{
			font-size:55rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
			margin-top: 12rpx;
			&:before{
				content: '￥';
				font-size: 55rpx;
				margin-right: 10px;
			}
		}
	}
	
	.line-bg{
		width: 750rpx;
		height: 80rpx;
		background-image: url('https://pic.youx365.com/pay-bg.png');
		background-color: #FFFFFF;
		background-size: cover;
	}

	.pay-type-list {
		background-color: #fff;
		padding-left: 30rpx;
		
		.type-item{
			height: 120upx;
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
				height: 60rpx;
				width: 60rpx;
				margin-right: 19rpx;
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
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
		
		/* .radio{
			radio .wx-radio-input.wx-radio-input-checked{
				border:none;
				background: #00A390 !important;
			}
		} */
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: #00A390;
		border-radius: 10upx;
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
	
	/* 输入密码 */
	.input-row{
		width: 626rpx;
		margin: 0 auto;
		padding: 30rpx 0;
		box-sizing: border-box;
		font-size: 24px;
		text-align: center;
		.item{
			float: left;
			width: 84rpx;
			height: 84rpx;
			line-height: 84rpx;
			border-radius: 4rpx;
			margin:0 10rpx;
			border: 1px solid rgba(210,210,210,1);
			background: #fff;
			box-sizing: border-box;
		}
		.item-active{
			position: relative;
			border: 1px solid #f4000a;
			transform: scale(1.2);
			--webkit-transform: scale(1.2);
		}
	}
	
	.zfmm{
		/deep/ .uni-popup__wrapper-box{
			padding: 0 !important;
		}
		
		.close{
			width: 100%;
			text-align: right;
			padding: 26rpx 26rpx 0 0;
			
			.img{
				width: 56rpx;
				height: 56rpx;
			}
		}
		
		.tit1{
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			margin-left: 63rpx;
		}
		
		.bt{
			width: 432rpx;
			height: 72rpx;
			line-height: 72rpx;
			margin: 0 auto;
			background-color: #FF443F;
			border-radius: 40rpx;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: center;
			margin-top: 84rpx;
		}
	}
</style>
