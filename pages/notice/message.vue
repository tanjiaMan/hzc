<template>
	<view>
		<view class="notice-header uni-flex uni-row">
			<view class="flex-item d_1" @click="changeType(4)">
				<img src="https://pic.youx365.com/notice_4.png" />
				<view class="tit">
					系统通知
				</view>
			</view>
			<view class="flex-item d_1" @click="changeType(1)">
				<img src="https://pic.youx365.com/notice_3.png" />
				<view class="tit">
					赞和收藏
				</view>
			</view>
			<view class="flex-item d_1" @click="changeType(2)">
				<img src="https://pic.youx365.com/notice_1.png" />
				<view class="tit">
					新增关注
				</view>
			</view>
			<view class="flex-item d_1" @click="changeType(3)">
				<img src="https://pic.youx365.com/notice_2.png" />
				<view class="tit">
					评论我的
				</view>
			</view>
		</view>
		
		<view class="notice-detail">
			<empty v-if="records.length === 0"></empty>
			<view class="tab_item uni-flex uni-row" v-for="item in records" :key="item" @click="gotoDetail(item)">
				<view class="flex-item d_1">
					<img class="img" :src="item.avatarUrl"  />
				</view>
				<view class="flex-item d_2">
					<view class="tit1">{{item.title}}</view>
					<view class="tit2">{{item.content}}</view>
				</view>
				<view class="flex-item d_3">
					<view class="tit3">{{item.createTime.split(' ')[0]}}</view>
					<view class="tit4" v-if="item.read == 0"></view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				type:4,
				pageIndex: 1,
				pageSize: 10,
				loadingType: 'more',
				records:[],
			}
		},
		onShow(){
			this.loadData('fresh');
		},
		methods: {
			async loadData(loadType){
				if(loadType == 'fresh'){
					this.pageIndex = 1;
					this.loadingType = 'more';
					this.records = [];
				}
				if(this.loadingType === 'loading' || this.loadingType == 'noMore'){
					return;
				}
				this.loadingType = 'loading'
				let result = await this.$request.ModelUser.getUserMsg(this.type,this.pageIndex,this.pageSize);
				result = result || {};
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
			changeType(type){
				if(this.type == type){
					return;
				}
				this.type = type;
				this.loadData('fresh');
			},
			gotoDetail(item){
				uni.navigateTo({
				    url: '/pages/notice/messageDetail?detail=' + JSON.stringify(item)
				});
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #FFFFFF;
		padding-bottom: 30upx;
	}

	.notice-header{
		position: fixed;
		width: 100%;
		background-color: #F6F6F6;
		z-index: 1;
		
		.d_1{
			width: 25%;
			text-align: center;
			padding: 30rpx 0;
		}
		
		.tit{
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		image{
			width: 46rpx;
			height: 46rpx;
		}
		
		img{
			width: 46rpx;
			height: 46rpx;
		}
	}

	.notice-detail{
		padding: 200rpx 28rpx 28rpx 28rpx;;
		
		.tab_item{
			width: 100%;
			height: 157rpx;
			border-bottom: 1px solid #E8E8E8;
			
			.d_1{
				width: 150rpx;
				text-align: center;
				height: 157rpx;
				line-height: 157rpx;
			}
			
			.img{
				width:107rpx;
				height:107rpx;
				border-radius:50%;
				vertical-align: middle;
			}
			
			.d_2{
				width: 403rpx;
				
				.tit1{
					font-size:28rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					padding-top: 37rpx;
				}
				
				.tit2{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: scroll;
					padding-right: 20px;
				}
			}
			
			.d_3{
				width: 141rpx;
				height: 157rpx;
				line-height: 157rpx;
				text-align: center;
				position: relative;
				
				.tit3{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(102,102,102,1);
					padding-top: 38rpx;
				}
				
				.tit4{
					width:13rpx;
					height:13rpx;
					background:rgba(255,68,63,1);
					border-radius:50%;
					position: absolute;
					right: 0;
					margin-top: 12rpx;
				}
			}
		}
	}
</style>
