<template>
	<view class="container">
		<view class="d-user">
			<img class="img" :src="info.avatarUrl" /> 
			<text class="tit1">{{info.nickName}}</text>
		</view>
		
		<view class="d-goods uni-flex uni-row">
			<view class="dleft">
				<img class="img" :src="info.productCoverPicUrl" /> 
			</view>
			<view class="dright">
				<view class="tit1">{{info.productName}}</view>
				<view class="s-header" v-if="info.timestr && info.timestr != ''">
					<text class="hour timer">{{info.timestr.split(":")[0]}}</text>
					<text class="minute timer">{{info.timestr.split(":")[1]}}</text>
					<text class="second timer">{{info.timestr.split(":")[2]}}</text>
					<text class="tip">后结束</text>
				</view>
			</view>
		</view>
		
		<view v-if="!info.loginUserBargained" class="bt-kj" @click="kanjia">
			帮砍一刀
		</view>
		<button v-else class="bt" open-type="share">
			分享给好友，帮我砍价
		</button>
		
		<view v-if="barginallog && barginallog.total && barginallog.total > 0">
			<view class="bt-record">
				砍价记录
			</view>
			
			<view class="d-record uni-flex uni-row" v-for="(item,index) in barginallog.records" :key="index">
				<view class="d-user" style="width: 50%;">
					<img class="img" :src="item.avatarUrl" /> 
					<text class="tit1">{{item.nickName}}</text>
				</view>
				<view class="dright" style="width: 50%;">
					砍掉{{item.bargainPrice}}元
				</view>
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
			<view class="goods-list uni-flex uni-row" v-for="(item,index) in orderList" :key="index">
				<view class="flex-item dleft">
					<img class="img" :src="item.coverPicUrl" />
				</view>
				<view class="flex-item dright">
					<view class="tit3">{{item.productName}}</view>
					<view class="uni-flex uni-row price">
						<view style="width: 50%;">
							<text class="tit1">¥</text><text class="tit2">{{item.bargainPrice}}</text>
						</view>
						<view style="width: 50%;">
							<view class="bt1" @click="navToDetailPage(item.productId,'bargain')">我要砍价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {mapState} from 'vuex';
	export default {
		components: {
			uniLoadMore
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				joinId:null,
				info:{},
				
				barginallog:{},
				
				loadingType: 'more',
				orderList: [],
				pageSize: 10,
				pageIndex: 1,
				
				//
				seconds:0,
				timer:null,
				
			}
		},
		onShow(){
			this.init();
			this.loadData('refresh');
		},
		onLoad(option){
			this.joinId = option.id;
			if(option.inviteUserId){
				uni.setStorage({//缓存用户登陆状态
				    key: 'inviteUserId',  
				    data: option.inviteUserId  
				})
			}
			if(!this.hasLogin){
				uni.navigateTo({url: '/pages/public/login'})
				return;
			}
			
			this.init();
			this.loadData('refresh');
		},
		onShareAppMessage(res) { //设置分享
			return {
				title: this.info.nickName + '正在参与社集优选砍价活动，邀请您来帮忙砍价',
				path: '/pages/index/kjdetail?id='+this.joinId + '&inviteUserId=' + this.userInfo.id,
			}
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			async init(){
				//商品信息
				let info = await this.$request.ModelHome.infoBargainLog(this.joinId);
				this.info = info;
				
				if(info.leftExpireSec){
					this.startTimeup();	
				}else{
					this.info.timestr = '00:00:00';
				}
				
				this.$request.ModelHome.getBargainLog(this.joinId,1,200).then(res => {
					this.barginallog = res;
				})
			},
			async loadData(source){
				if(this.loadingType === 'loading'){
					return;
				}
				if('refresh' == source){
					this.pageIndex = 1;
					this.orderList = [];
					this.loadingType = 'more';
				}
				if(this.loadingType == 'noMore'){
					return;
				}
				
				this.loadingType = 'loading';
				
				let result = await this.$request.ModelHome.pageBargain(this.pageIndex,this.pageSize);
				let orderList = result.records;
				orderList.forEach(item=>{
					this.orderList.push(item);
				})
				
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if(orderList.length < this.pageSize){
					this.loadingType = 'noMore';
				}else{
					this.loadingType = 'more'; 
				}
				
				this.pageIndex = this.pageIndex + 1;
			},
			countDown() {
				function getTimestr(lefttime){
					if(lefttime<=0){
						return '00:00:00';
					}
					let [day, hour, minute, second] = [0, 0, 0, 0]
					day = Math.floor(lefttime / (60 * 60 * 24))
					hour = Math.floor(lefttime / (60 * 60)) - day * 24
					minute = Math.floor(lefttime / 60) - day * 24 * 60 - hour * 60
					second = Math.floor(lefttime) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
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
					return hour + ':' + minute + ':' + second;
				}
				if(this.info.leftExpireSec){
					if(this.info.leftExpireSec - this.seconds > 0){
						this.info.timestr = getTimestr(this.info.leftExpireSec - this.seconds);
					}else{
						this.info.timestr = '00:00:00';
					}
				}
			},
			startTimeup(){
				this.seconds = 0;
				this.countDown()
				if(this.timer){
					clearInterval(this.timer);
				}
				this.timer = setInterval(() => {
					this.seconds++;
					this.countDown()
				}, 1000)
			},
			kanjia(){
				let values = {bargainId: this.joinId,sponsorUserId: this.userInfo.id};
				this.$request.ModelHome.bargainFor(values).then(res => {
					if(res.code == 'ok'){
						uni.navigateTo({url: '/pages/index/kjsuccess?joinId='+ this.joinId})	
					}else{
						this.$api.msg(res.msg);
					}
				})
			},
			//详情页
			navToDetailPage(id, source) {
				source = source? source:'';
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&source=${source}`
				})
			},
		},
		beforeDestroy() {
			if(this.timer){
				clearInterval(this.timer);
			}
		},
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
	.bt{
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #FF443F;
		border-radius: 10rpx;
		margin: 100rpx auto 0;
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
		border-radius: 10rpx 10rpx 0 0;
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

