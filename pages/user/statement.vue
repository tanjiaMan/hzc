<template>  
    <view class="container">
		
		<!-- 头部 -->
		<view class="user-header">
			<view class="uni-flex uni-row">
			    <view class="flex-item d_1">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
				</view>
			    <view class="flex-item d_2">
					<view class="tit1">
						{{userInfo.nickname || '游客'}}
					</view>
				</view>
			    <view class="flex-item d_2">
					<view class="tit1" @click="navTo('/pages/user/team')">
						<view class="tit1_1">团队人数</view>
						<view class="tit1_2">{{agentInfo.sonsCount}}</view>
					</view>
				</view> 
			</view>
			<view class="uni-flex uni-row">
			    <view class="flex-item d_1">
				</view>
			    <view class="flex-item d_3">
					<view class="tit2">
						等 级：{{agentInfo.agentLevel}}
					</view>
					<view class="tit2">
						手 机 号：{{userInfo.mobile || '无'}}
					</view>
				</view>
			    <view class="flex-item d_3">
					<view class="tit2">
						推 荐 人：{{agentInfo.inviteUserName || '无'}}
					</view>
					<view class="tit2">
						上 级：{{agentInfo.parentAgentUserName}}
					</view>
				</view> 
			</view>
		</view>
		<!-- 我的收入 -->
		<view class="my-income">
			<view class="uni-flex uni-row d-header">
				<view class="flex-item tit1">我的收入</view>
				<view class="flex-item tit2">收入</view>
			</view>
			<view class="d-body uni-flex uni-row">
				<view class="flex-item d_left">
					<view class="tit3">{{sts.incomeSts.totalIncome?sts.incomeSts.totalIncome:0}}元</view>
					<view class="tit4">总收入</view>
				</view>
				<view class="flex-item d_right">
					<view class="tit3">{{sts.incomeSts.totalWithDraw?sts.incomeSts.totalWithDraw:0}}元</view>
					<view class="tit4">已提现</view>
				</view>
				<view class="flex-item d_right">
					<view class="tit3">{{sts.incomeSts.balance?sts.incomeSts.balance:0}}元</view>
					<view class="tit4">待提现</view>
				</view>
			</view>
		</view>
		<!-- 我的支出 -->
		<view class="my-expenditure">
			<view class="uni-flex uni-row d-header">
				<view class="flex-item tit1">我的支出</view>
				<view class="flex-item tit2">支出</view>
			</view>
			<view class="d-body uni-flex uni-row">
				<view class="flex-item d_left">
					<view class="tit3">{{sts.outcomeSts.totalOutcome?sts.outcomeSts.totalOutcome:0}}元</view>
					<view class="tit4">总支出</view>
				</view>
				<view class="flex-item d_right">
					<view class="tit3">{{sts.outcomeSts.agentPayOut?sts.outcomeSts.agentPayOut:0}}元</view>
					<view class="tit4">进货</view>
				</view>
				<view class="flex-item d_right">
					<view class="tit3">{{sts.outcomeSts.agentSupStock?sts.outcomeSts.agentSupStock:0}}元</view>
					<view class="tit4">补货</view>
				</view>
			</view>
		</view>
		
		<!-- 商品统计 -->
		<view class="goods-static">
			<view class="uni-flex uni-row d-header">
				<view class="flex-item tit1">商品统计</view>
				<view class="flex-item tit2">统计</view>
			</view>
			<view class="d-body-1 uni-flex uni-row">
				<view class="flex-item d_center">
					<view class="tit3">{{sts.productSts.classifyCount ?sts.productSts.classifyCount:0}}</view>
					<view class="tit4">商品分类</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.productSts.totalCount?sts.productSts.totalCount:0}}</view>
					<view class="tit4">商品数量</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.productSts.unShelfCount?sts.productSts.unShelfCount:0}}</view>
					<view class="tit4">待上架商品</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.productSts.shelfCount?sts.productSts.shelfCount:0}}</view>
					<view class="tit4">已上架商品</view>
				</view>
			</view>
		</view>
		<!-- 商品销量 -->
		<view class="goods-sale" v-if="sts.productSaleSts && sts.productSaleSts.totalQuantity">
			<view class="uni-flex uni-row d-header">
				<view class="flex-item tit1">商品销量</view>
				<view class="flex-item tit2">销量</view>
				<view class="flex-item tit3" @click="navTo('/pages/user/statementlist')">查看排行<text class="yticon icon-you"></text></view>
			</view>
			<view class="d-header-body">
				<text class="tit1">总销量：</text><text class="tit2">{{sts.productSaleSts.totalQuantity}}</text>
			</view>
			<uni-swiper-dot :info="info" :current="bkCurrent" mode="long" :dots-styles="dotsStyles" field="content">
				<swiper @change="bkSwitch" style="height: 350rpx;">
					<swiper-item v-for="(infolist, index) in info" :key="index">
						<view class="bk-list">
							<view class="uni-flex uni-row">
							    <view class="flex-item bk_frame" v-for="(item,index1) in infolist" :key="index1" @click="navToDetailPage(item.id)">
									<view :class="'bk_index bk_index_' + (index1 % 3) "></view>
									<text class="bk_index_text">{{index1 + 1 + (index * 3)}}</text>
									<image :src="item.coverPicUrl" mode="aspectFill"></image>
									<text class="title clamp">{{item.name}}</text>
									<text class="price">￥{{item.price}}</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<!-- 订单统计 -->
		<view class="order-static">
			<view class="uni-flex uni-row d-header">
				<view class="flex-item tit1">订单统计</view>
				<view class="flex-item tit2">统计</view>
			</view>
			<view class="d-header-body">
				<text class="tit1">总订单：</text><text class="tit2">{{sts.orderSts.totalCount?sts.orderSts.totalCount:0}}</text>
			</view>
			<view class="d-body-2 uni-flex uni-row">
				<view class="flex-item d_center">
					<view class="tit3">{{sts.orderSts.toPayCount?sts.orderSts.toPayCount:0}}</view>
					<view class="tit4">待付款</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.orderSts.toDeliverCount?sts.orderSts.toDeliverCount:0}}</view>
					<view class="tit4">待发货</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.orderSts.toReceiveCount?sts.orderSts.toReceiveCount:0}}</view>
					<view class="tit4">待收货</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.orderSts.toEvalCount?sts.orderSts.toEvalCount:0}}</view>
					<view class="tit4">待评价</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.orderSts.refundCount?sts.orderSts.refundCount:0}}</view>
					<view class="tit4">退款</view>
				</view>
				<view class="flex-item d_center">
					<view class="tit3">{{sts.orderSts.finishedCount?sts.orderSts.finishedCount:0}}</view>
					<view class="tit4">已完成</view>
				</view>
			</view>
		</view>
		
		<view style="height: 56rpx;">
		</view>
	</view>  
</template>  
<script>

    import {mapState} from 'vuex';  
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	
    export default {
		components: {
			uniSwiperDot
		},
		data(){
			return {
				dotsStyles: {
					backgroundColor: '#DBDBDB',
					border: '1px #DBDBDB solid',
					color: '#fff',
					selectedBackgroundColor: '#00A390',
					selectedBorder: '1px #00A390 solid'
				},
				bkCurrent: 0,
				info: [],
				agentInfo:{},
				sts:{}
			}
		},
		onLoad(){
			this.$request.ModelHome.getAgentInfo(this.userInfo.id).then(agentInfo => {
				this.agentInfo = agentInfo;
			})
			this.$request.ModelUser.getSts().then(result => {
				this.sts = result;
				
				if(result.productSaleSts && result.productSaleSts.products && result.productSaleSts.products.length > 0){
					let info = [],temp = [];
					let index = 0;
					for(var i=0;i<result.productSaleSts.products.length;i++){
						if(index > 2){
							info.push(temp);
							temp = [];index = 0;
						}
						temp.push(result.productSaleSts.products[i]);
						index ++;
					}
					if(temp.length != 0){
						info.push(temp);
					}
					this.info = info;
					console.log('info',this.info);
				}
			})
		},
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			async bkSwitch(e){
				this.bkCurrent = e.detail.current
			},
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
        }  
    }  
</script>  
<style lang='scss'>
	.container{
		.user-header{
			width: 750rpx;
			height: 446rpx;
			background-image: url('https://pic.youx365.com/statement_bg.png');
			background-size: cover;
			
			.d_1{
				width: 136rpx;
				text-align: center;
				
				.portrait{
					width: 96rpx;
					height: 96rpx;
					top: 50rpx;
					border-radius: 50%;
				}
			}
			
			.d_2{
				width: 307rpx;
				padding-top: 72rpx;
				
				.tit1{
					font-size:34rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(255,255,255,1);
					
					.tit1_1{
						font-size:20rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,255,255,1);
						line-height: 1;
					}
					
					.tit1_2{
						font-size:36rpx;
						font-family:SourceHanSansCN;
						font-weight:500;
						color:rgba(255,255,255,1);
					}
				}
			}
			
			.d_3{
				padding-top: 6rpx;
				width: 307rpx;
				.tit2{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
			}
		}
	
		.my-income{
			height: 241rpx;
			width: 710rpx;
			margin: -160rpx auto 0;
			background: #FFFFFF;
			border-radius:16rpx;
			
		}
		
		.my-expenditure{
			height: 241rpx;
			width: 710rpx;
			margin: 17rpx auto 0;
			background: #FFFFFF;
			border-radius:16rpx;
			
		}
		
		.goods-static{
			height: 241rpx;
			width: 710rpx;
			margin: 17rpx auto 0;
			background: #FFFFFF;
			border-radius:16rpx;
			
		}
		
		.goods-sale{
			height: 516rpx;
			width: 710rpx;
			margin: 17rpx auto 0;
			background: #FFFFFF;
			border-radius:16rpx;
			
			.bk-list{
				.bk_frame{
					margin-left: 20rpx;
					
					>image{
						height: 197rpx;
						width: 211rpx;
					}
					
					.clamp{
						font-size:22rpx;
						font-family:SourceHanSansCN-Regular;
						font-weight:400;
						color:#121212;
					}
					
					.price{
						font-size:22rpx;
						color:#FF443F;
						font-weight:500;
					}
					
					.bk_index_text{
						color:white;
						position:absolute;
						top:-1rpx;
						z-index:9999;
						margin-left:9rpx;
						font-size:20rpx;
						font-family:PangMenZhengDao;
						font-weight:400;
					}
					
					.bk_index{
						width:0;
						height:0;
						position:absolute;
						top:0;
						z-index:999;
						border-right:47rpx solid transparent;
					}
					
					.bk_index_0{
						border-top:47rpx solid #F1103D;
					}
					
					.bk_index_1{
						border-top:47rpx solid #FEC84B;
					}
					
					.bk_index_2{
						border-top:47rpx solid #00A390;
					}
				}
			}
		}
		
		.order-static{
			height: 315rpx;
			width: 710rpx;
			margin: 17rpx auto 0;
			background: #FFFFFF;
			border-radius:16rpx;
			
		}
		
		.d-header{
			.tit1{
				font-size:32rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				padding: 22rpx 10rpx 22rpx 23rpx;
			}
			
			.tit2{
				height: 32rpx;
				line-height: 32rpx;
				width: 64rpx;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(254,254,254,1);
				background-color: #00A390;
				text-align: center;
				border-radius: 10rpx;
				margin-top: 34rpx;
			}
			
			.tit3{
				width: 448rpx;
				text-align: right;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(144,144,144,1);
				line-height: 100rpx;
				
				.yticon{
					margin-left: 4rpx;
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(144,144,144,1);
				}
			}
		}
		
		.d-body{
			width: 100%;
			
			.d_left{
				width: 33.33%;
				border-right: 1px solid #D7D7D7;
				height: 86rpx;
			}
			
			.d_right{
				width: 33.33%;
			}
			
			.tit3{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				text-align: center;
			}
			
			.tit4{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				text-align: center;
			}
		}
		
		.d-body-1{
			width: 100%;
			.d_center{
				width: 25%;
			}
			.tit3{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				text-align: center;
			}
			
			.tit4{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				text-align: center;
			}
		}
		
		.d-body-2{
			width: 100%;
			.d_center{
				width: 16.66%;
			}
			.tit3{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
				text-align: center;
			}
			
			.tit4{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
				text-align: center;
			}
		}
		
		.d-header-body{
			padding: 0 0 20rpx 23rpx;
			margin-top: -14rpx;
			
			.tit1{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.tit2{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
		}
	}
</style>