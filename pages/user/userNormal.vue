<template>  
    <view class="container">
		
		<!-- 头部 -->
		<view class="user-header">
			<view class="uni-flex uni-row">
			    <view class="flex-item d_1">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
				</view>
			    <view class="flex-item d_2">
					<view class="username">
						{{userInfo.nickname || '游客'}}
						<span class="user-vip"><img src="https://pic.youx365.com/user-vip.png"/> 普通会员</span>
					</view>
					<text class="mobile">{{userInfo.mobile}}</text>
					<view v-if="!hasLogin" class="loginbt" @click="navToLogin">注册/登陆</view>
				</view>
			    <view class="flex-item d_3">
					<view class="uni-flex uni-row" @click="navTo('/pages/notice/message')">
						<view class="flex-item d-avatar">
							<img  src='https://pic.youx365.com/notice.png' />
							<view class="cu-tag badge" v-if="unreadmsg>0">{{unreadmsg}}</view>
						</view>
						<view class="flex-item d_title">
								消息
						</view>
					 </view>
				</view> 
			</view>
		</view>
		
		<!-- 我的订单 -->
		<view class="my-order">
			<view class="uni-flex uni-row">
				<view class="flex-item title">
					我的订单
				</view>
				<view class="flex-item alltitle" @click="navTo('/pages/order/order?state=0')">
					全部订单
				</view>
			</view>
			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="flex-item d_4" @click="navTo('/pages/order/order?state=1')">
					<img src="https://pic.youx365.com/user_1.png" />
					<view class="tit">待付款</view>
				</view>
				<view class="flex-item d_4" @click="navTo('/pages/order/order?state=2')" >
					<img src="https://pic.youx365.com/user_2.png" />
					<view class="tit">待发货</view>
				</view>
				<view class="flex-item d_4" @click="navTo('/pages/order/order?state=3')" >
					<img src="https://pic.youx365.com/user_3.png" />
					<view class="tit">待收货</view>
				</view>
				<view class="flex-item d_4" @click="navTo('/pages/order/order?state=4')" >
					<img src="https://pic.youx365.com/user_4.png" />
					<view class="tit">评价</view>
				</view>
				<view class="flex-item d_4" @click="navTo('/pages/order/orderSvs')" >
					<img src="https://pic.youx365.com/user_5.png" />
					<view class="tit">售后</view>
				</view>
			</view>
		</view>
    
		<!-- 钱包 -->
		<view class="user-money">
			<text class="num">{{fullUser.accountInfo.userBalance || 0}}</text>
			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="desc" @click="navTo('/pages/user/money')" style="width: 50%;">
					<img src="https://pic.youx365.com/user_money.png" />
					我的代金券
				</view>
				<view style="width: 50%;">
					<view class="rechargebt" @click="navTo('/pages/withdraw/recharge')">去充值</view>
				</view>
			</view>
			<view class="uni-flex uni-row" style="width: 100%;height: 80rpx;margin-top: 20rpx;">
				<view class="flex-item" style="width: 50%;border-right: 1px solid #D5D5D5;">
					<view class="tit1">今日收入</view>
					<view class="tit2">￥{{fullUser.accountInfo.dayIncome || 0}}</view>
				</view>
				<view class="flex-item" style="width: 50%;">
					<view class="tit1">本月收入</view>
					<view class="tit2">￥{{fullUser.accountInfo.monthIncome || 0}}</view>
				</view>
			</view>
		</view>
		
		<!-- 我的优惠券 -->
		<view class="user-coupon">
			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="flex-item d_1">
					<view class="tit1">我的优惠券</view>
					<view class="tit2">{{fullUser.couponInfo.couponCount || 0}}</view>
				</view>
				<view class="flex-item d_1" @click="navTo('/pages/money/redPackage')">
					<view class="tit1">我的红包</view>
					<view class="tit2">{{fullUser.couponInfo.redpackCount || 0}}</view>
				</view>
				<view class="flex-item d_1" @click="navTo('/pages/user/collection')">
					<view class="tit1">我的收藏</view>
					<view class="tit2">{{fullUser.collectInfo.totalCount || 0}}</view>
				</view>
				<view class="flex-item d_1">
					<view class="tit3" @click="signToday">
						签到
					</view>
				</view>
			</view>
		</view>
		
		<!-- 短视频 -->
		<view class="user-video">
			<view class="title">
				短视频
			</view>
			<view class="line"></view>
			<uni-grid :column="3" :square="false" :show-border="false" :highlight="false" >
			    <uni-grid-item>
			        <view class="tit1">{{fullUser.videoInfo.publishCount || 0}}</view>
					<view class="tit2">我的发布</view>
			    </uni-grid-item>
			    <uni-grid-item>
				   <view class="tit1">{{fullUser.collectInfo.videoCount || 0}}</view>
			       <view class="tit2">我的收藏</view>
			    </uni-grid-item>
			    <uni-grid-item>
			       <view class="tit1">{{fullUser.videoInfo.draftCount || 0}}</view>
			       <view class="tit2">草稿箱</view>
			    </uni-grid-item>
				<uni-grid-item>
				   <view class="tit1">-1</view>
				   <view class="tit2">我的关注</view>
				</uni-grid-item>
				<uni-grid-item>
				   <view class="tit1">-1</view>
				   <view class="tit2">粉丝</view>
				</uni-grid-item>
				<uni-grid-item>
				   <view class="tit1">{{fullUser.videoInfo.praiseCount || 0}}</view>
				   <view class="tit2">获赞</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<!-- 其他 -->
		<view class="user-other">
			<view class="title">
				其他
			</view>
			<view class="line"></view>
			<uni-grid :column="4" :square="false" :show-border="false" :highlight="false" >
			    <uni-grid-item>
					<button class="contract-btn" open-type="contact" @contact="handleContact" style="line-height: initial;">
						<img class="tit1" src="https://pic.youx365.com/usr_o_1.png" />
						<view class="tit2">公司客服</view>
					</button>
			    </uni-grid-item>
			    <uni-grid-item>
			       <img class="tit1" src="https://pic.youx365.com/usr_o_2.png" />
			       <view class="tit2">关于我们</view>
			    </uni-grid-item>
			    <uni-grid-item>
			       <img class="tit1" src="https://pic.youx365.com/usr_o_3.png" />
			       <view class="tit2">帮助中心</view>
			    </uni-grid-item>
				<uni-grid-item>
				   <img class="tit1" src="https://pic.youx365.com/usr_o_4.png" />
				   <view class="tit2">意见反馈</view>
				</uni-grid-item>
				<uni-grid-item>
				   <img class="tit1" src="https://pic.youx365.com/usr_o_5.png" />
				   <view class="tit2">邀请好友</view>
				</uni-grid-item>
				<uni-grid-item>
				   <img class="tit1" src="https://pic.youx365.com/usr_o_6.png" />
				   <view class="tit2">平台客服</view>
				</uni-grid-item>
				<uni-grid-item>
				   <view @click="navTo('/pages/address/address')" style="line-height: initial;text-align: center;">
						<img class="tit1" src="https://pic.youx365.com/user-o-7.png" />
						<view class="tit2">地址管理</view>
				   </view>
				</uni-grid-item>
				<uni-grid-item>
					<view @click="navTo('/pages/set/set')" style="line-height: initial;">
						<img class="tit1" src="https://pic.youx365.com/usr_o_7.png" />
						<view class="tit2">设置</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view style="height: 56rpx;">
			
		</view>
	</view>  
</template>  
<script>
	
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
    import {mapState} from 'vuex';  
	
    export default {
		components: {
			uniGrid,uniGridItem
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		name: 'userNormal',
		data(){
			return {
				unreadmsg:0,//未读消息
				fullUser:{},
			}
		},
        methods: {
			show(){
				if(!this.hasLogin){
					return;
				}
				this.$request.ModelUser.getFullUser().then(result => {
					this.fullUser = result;
				})
				//未读消息
				this.$request.ModelHome.getConfig(0).then(result => {
					if(result.unReadMsgCount && result.unReadMsgCount>0){
						this.unreadmsg = result.unReadMsgCount;
					}
				})
			},
			load(){
				console.log('child onLoad')
			},
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			signToday(){ //签到
				this.$request.ModelUser.signToday().then(result => {
					if(result.code == 'ok'){ //签到成功
						uni.showModal({
							content: "签到成功",
							confirmText: "确定",
							showCancel: false
						})
					}else{ //签到失败
						uni.showModal({
							content: result.msg,
							confirmText: "确定",
							showCancel: false
						})
					}
				})
			}
        }  
    }  
</script>  
<style lang='scss'>
	.container{
		.user-header{
			width: 100%;
			height: 301rpx;
			background-color: #00A390;
			
			.d_1{
				width: 178rpx;
				height: 198rpx;
				text-align: center;
				
				.portrait{
					width: 104rpx;
					height: 104rpx;
					top: 41rpx;
					border-radius: 50%;
				}
			}
			
			.d_2{
				width: 450rpx;
				height: 198rpx;
				padding-top: 44rpx;
				
				.username{
					font-size:32rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				
				.mobile{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
				
				.loginbt{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,255,255,1);
					border: solid 1px white;
					width: max-content;
					border-radius: 100rpx;
					padding: 0px 10rpx 0 10rpx;
				}
				
				.user-vip{
					width:105rpx;
					height:30rpx;
					border:1px solid rgba(255,210,0,1);
					opacity:0.8;
					border-radius:3rpx;
					font-size:18rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,210,0,1);
					margin-left: 22rpx;
					padding:0 9rpx 0 9rpx;

					img{
						width: 16rpx;
						height: 16rpx;
						margin-right:5rpx;
					}
				}
			}
			
			.d_3{
				width: 122rpx;
				height: 198rpx;
				padding-top: 44rpx;
				
				.d_title{
					font-size:26rpx;
					margin-left: 15rpx;
					color: #fff;
				}
				
				.d-avatar{
					font-variant:small-caps;
					margin:0;
					padding:0;
					display:-webkit-inline-box;
					display:-webkit-inline-flex;
					display:-ms-inline-flexbox;
					display:inline-flex;
					text-align:center;
					-webkit-box-pack:center;
					-webkit-justify-content:center;
					-ms-flex-pack:center;
					justify-content:center;
					-webkit-box-align:center;
					-webkit-align-items:center;
					-ms-flex-align:center;
					align-items:center;
					white-space:nowrap;
					position:relative;
					background-size:cover;
					background-position:center;
					vertical-align:middle;
					width:42rpx;
					
					>img{
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
	
		.my-order{
			width: 711rpx;
			height: 279rpx;
			margin: -103rpx auto 0;
			background-color: #fff;
			border-radius:10rpx;
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
			
			.title{
				font-size:28rpx !important;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(51,51,51,1);
				padding: 28rpx 32rpx 16rpx 32rpx;
				width: 50%;
			}
			
			.alltitle{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				width: 50%;
				text-align: right;
				padding: 28rpx 32rpx 16rpx 32rpx;
			}
			
			image{
				width: 96rpx;
				height: 96rpx;
			}
			
			img{
				width: 96rpx;
				height: 96rpx;
			}
			
			.tit{
				margin-top: -14rpx;
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
			
			.d_4{
				width: 25%;
				text-align: center;
			}
		}
	
		.user-money{
			width:711rpx;
			height:311rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			margin: 15rpx auto 0;
			text-align: center;
			padding-top: 32rpx;
			
			.num{
				font-size:50rpx;
				font-family:SourceHanSansCN;
				font-weight:bold;
				color:rgba(0,0,0,1);
			}
			
			.desc{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,163,144,1);
				height: 60rpx;
				line-height: 60rpx;
				padding-right: 10rpx;
				text-align: right;
				
				img{
					width: 32rpx;
					height: 32rpx;
					margin-right: 13rpx;
					vertical-align: middle;
				}
				
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 13rpx;
					vertical-align: middle;
				}
			}
			
			.rechargebt{
				background-image: url('https://pic.youx365.com/user_money_bt.png');
				background-size: cover;
				width: 144rpx;
				height: 48rpx;
				line-height: 48rpx;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(117,64,0,1);
				margin: 6rpx 0 0 10rpx;
			}
			
			.tit1{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
			
			.tit2{
				font-size:36rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,163,144,1);
				margin-top: -10rpx;
			}
		}
		
		.user-coupon{
			width:711rpx;
			height:149rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			margin: 15rpx auto 0;
			
			.d_1{
				width: 25%;
				text-align: center;
			}
			
			.tit1{
				padding-top: 30rpx;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
			
			.tit2{
				font-size:36rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			
			.tit3{
				margin: 12rpx auto 0;
				width: 128rpx;
				height: 128rpx;
				line-height: 128rpx;
				background-image: url('https://pic.youx365.com/user_sign.png');
				background-size: cover;
				font-size:30rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
		
		.user-video{
			width:711rpx;
			height:360rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			margin: 15rpx auto 0;
			
			.title{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,163,144,1);
				line-height: 80rpx;
				height: 80rpx;
				padding-left: 27rpx;
			}
			
			.line{
				height:1px;
				background:rgba(246,246,246,1);
			}
			
			.tit1{
				font-size:30rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
			
			.tit2{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
		}
		
		.user-other{
			width:711rpx;
			height:399rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			margin: 15rpx auto 0;
			
			.title{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,163,144,1);
				line-height: 80rpx;
				height: 80rpx;
				padding-left: 27rpx;
			}
			
			.line{
				height:1px;
				background:rgba(246,246,246,1);
			}
			
			.tit1{
				width: 48rpx;
				height: 48rpx;
			}
			
			.tit2{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
		}
		
		.user_shop{
			width: 711rpx;
			height: 304rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			margin: 15rpx auto 0;
			
			.d_1{
				width: 178rpx;
				height: 144rpx;
				text-align: center;
				
				.portrait{
					width: 86rpx;
					height: 86rpx;
					top: 41rpx;
					border-radius: 50%;
				}
			}
			
			.d_2{
				width: 450rpx;
				height: 144rpx;
				
				.username{
					font-size:32rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:#000000;
					line-height: 144rpx;
				}

				.user-vip{
					width:105rpx;
					height:30rpx;
					border:1px solid #FF443F;
					opacity:0.8;
					border-radius:3rpx;
					font-size:18rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:#FF443F;
					margin-left: 22rpx;
					padding:0 9rpx 0 9rpx;
			
					img{
						width: 16rpx;
						height: 16rpx;
						margin-right:5rpx;
					}
				}
			}
			
			.d_3{
				width: 33.33%;
				text-align: center;
				margin-top: 20rpx;
				
				.img{
					width: 214rpx;
					height: 95rpx;
				}
			}
		}
		
		.user_shop_manager{
			width:711rpx;
			height:399rpx;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin: 15rpx auto 0;
			
			.title{
				font-size:28rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,163,144,1);
				line-height: 80rpx;
				height: 80rpx;
				padding-left: 27rpx;
			}
			
			.line{
				height:1px;
				background:rgba(246,246,246,1);
			}
			
			.tit1{
				width: 48rpx;
				height: 48rpx;
			}
			
			.tit2{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
		}
		
		.contract-btn{
			background:#FFF;
			height: 100%;
			line-height: unset;
			padding: 0 !important;
		}
		.contract-btn:after{
			border: 0;
		}
	}
</style>