<template>  
    <view class="container">
		<view class="team-header uni-flex uni-row">
			<view class="flex-item d-1">
				<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
			</view>
			<view class="flex-item">
				<view class="d-4 uni-flex uni-row">
					<view class="flex-item d-2">
						<view class="tit1">{{userInfo.nickname || '游客'}}</view>
					</view>
					<view class="d-7">
						
					</view>
					<view class="flex-item d-3">
						<view class="tit2">团队人数</view>
						<view class="tit2">{{total}}</view>
					</view>
				</view>
				<view class="d-5">
					<view class="uni-flex uni-row">
						<view class="tit2 flex-item d-6">等级：2</view>
						<view class="tit2 flex-item d-6">推 荐 人：李四</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="tit2 flex-item d-6">手 机 号：13012341234</view>
						<view class="tit2 flex-item d-6">上 级：李四</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="d-nav-tab flex-item">
			<scroll-view class="nav" scroll-with-animation>
				<view class="cu-item" v-for="(item,index) in tabBars" 
					:class="index == tabCur ? 'text-white cur':''" @tap="tabSelect" :key="item.id" :id="item.id" :data-id="index">
						{{item.name}}
				</view>
			</scroll-view>
		</view>
		
		<view class="swiper-box">
			<view class="tab_item uni-flex uni-row" v-for="(item,index) in records" :key="index" @click="navTo('/pages/user/userHome?id='+item.id)">
				<view class="flex-item d_1">
					<img class="img" :src="item.avatarUrl"  />
				</view>
				<view class="flex-item d_2">
					<view class="uni-flex uni-row">
						<view class="tit1">{{item.nickName}}</view>
						<view class="tit4">{{item.userType == 2? '代理商'+item.agentLevel + '级':'普通会员'}}</view>
						<view class="tit3">升级</view>
					</view>
					<view class="tit2">{{item.createTime}}</view>
				</view>
				<view class="flex-item d_3">
					<view>已推-1人<text class="yticon icon-you"></text></view>
					<view class="bt3">发消息</view>
				</view>
			</view>
			
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		
	</view>  
</template>  
<script>

	import {mapState} from 'vuex';
	
    export default {
		data(){
			return {
				tabCur: 0,
				tabBars:[{
					name: '全部',
					id: 0
				},{
					name: '直推',
					id: 1
				},{
					name: '其他',
					id: 2
				}],
				pageIndex: 1,
				pageSize: 10,
				loadingType: 'more',
				records:[],
				total: 0,
			}
		},
		onShow(){
			this.loadData('fresh');
		},
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
        methods: {
			//菜单切换
			async tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				if(this.tabCur == index){
					return;
				}
				this.tabCur = index;
				this.loadData('fresh');
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			async loadData(loadType){
				if(loadType == 'fresh'){
					this.pageIndex = 1;
					this.loadingType = 'more';
					this.records = [];
				}
				if(this.loadingType === 'loading' || this.loadingType == 'noMore'){
					return;
				}
				this.loadingType = 'loading';
				let values = {pageIndex: this.pageIndex,pageSize: this.pageSize};
				let tabBar = this.tabBars[this.tabCur];
				if(tabBar.id == 1){
					values['directTeam'] == true;
				}else if(tabBar.id == 2){
					values['directTeam'] == false;
				}
				let result = await this.$request.ModelHome.pageAgentTeam(values);
				result = result || {};
				this.total = result.total || 0;
				let orderList = result.records || [];
				orderList.forEach(item=>{
					this.records.push(item);
				})
				if(orderList.length < this.pageSize){
					this.loadingType = 'noMore';
				}else{
					this.loadingType = 'more'; 
				}
				this.pageIndex = this.pageIndex + 1;
			},
        }  
    }  
</script>  
<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.container{
		background-color: #FFFFFF;
		
		.team-header{
			width: 100%;
			height: 319rpx;
			background-image: url('https://pic.youx365.com/team_bg.png');
			background-size: cover;
			padding-top: 62rpx;
			position: fixed;
			z-index: 1;
			
			.tit2{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			
			.d-1{
				width: 147rpx;
				text-align: center;
				
				.portrait{
					width: 77rpx;
					height: 77rpx;
					border-radius: 50%;
				}
			}
			
			.d-2{
				width: 314rpx;
				
				.tit1{
					font-size:34rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					font-style:italic;
					color:rgba(255,255,255,1);
				}
			}
			
			.d-7{
				width: 2rpx;
				background-color: #ffffff;
				height: 60rpx;
				opacity: 0.34;
				margin-top: 8rpx;
			}
			
			.d-3{
				width: 287rpx;
				padding-left: 8px;
				
				.bt1{
					width:147rpx;
					height:38rpx;
					background:linear-gradient(90deg,rgba(196,5,0,1),rgba(238,54,49,1));
					opacity:0.7;
					border-radius:19rpx;
					text-align: center;
					line-height:38rpx;
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
			}
			
			.d-4{
				width: 603rpx;
			}
			
			.d-5{
				padding-top: 30rpx;
			}
			
			.d-6{
				width: 50%;
			}
		}
	
		.d-nav-tab{
			border-bottom: 1px solid #EEEEEE;
			position: fixed;
			margin-top: 319rpx;
			background-color: #FFFFFF;
			width: 100%;
			z-index: 1;
			
			.cu-item{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			
			.text-white{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,163,144,1);
			}	
		}
	
		.swiper-box{
			height: 100%;
			padding-top: 408rpx;
		}
		
		.tab_item{
			width: 100%;
			height: 151rpx;
			
			.img{
				width:84rpx;
				height:84rpx;
				border-radius:50%;
				vertical-align: middle;
			}
			
			.d_1{
				width: 130rpx;
				text-align: center;
				height: 151rpx;
				line-height: 151rpx;
			}
			
			.d_2{
				width: 445rpx;
				border-bottom: 1px solid #E7E7E7;
				
				.tit1 {
					font-size:30rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(0,0,0,1);
					padding-top: 22rpx;
				}
				
				.tit2 {
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
				
				.tit3{
					height:30rpx;
					line-height: 30rpx;
					background:rgba(255,68,63,1);
					border-radius:15rpx;
					font-size:20rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(254,254,254,1);
					text-align: center;
					margin: 32rpx 0px 0px 20rpx;
					padding: 0 10rpx 0 10rpx;
				}
				
				.tit4{
					height:30rpx;
					line-height: 30rpx;
					border:1px solid rgba(255,68,63,1);
					border-radius:3px;
					font-size:20rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:#FF443F;
					text-align: center;
					margin: 32rpx 0px 0px 20rpx;
					padding: 0 10rpx 0 10rpx;
				}
			}
			
			.bt3{
				height:35rpx;
				line-height:35rpx;
				border:1px solid rgba(0,163,144,1);
				border-radius:18rpx;
				text-align: center;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,163,144,1);
				width: fit-content;
				padding: 0 10rpx 0 10rpx;
				margin: 14rpx auto 0;
			}
			
			.d_3{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(182,182,182,1);
				width: 146rpx;
				height: 151rpx;
				line-height: 151rpx;
				text-align: center;
				border-bottom: 1px solid #E7E7E7;
				padding-top: 20rpx;
				
				.yticon{
					font-size:30rpx;
					font-family:FangSong;
					font-weight:bold;
					color:rgba(144,144,144,1);
				}
			}
		}
	}
</style>