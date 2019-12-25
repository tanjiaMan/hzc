<template>
	<view class="container">
		<view class="d_desc">为您筛选“{{keywords}}”的结果页</view>
		<view class="d_body">
			<view class="order_item" v-for="(item,index) in goodsList" :key="index" @click="navToDetailPage(item)">
				<image class="item_img" :src="item.coverPicUrl" mode="aspectFill"></image>
				<view class="d_center">
					<view class="tit1"><span>￥</span>{{item.price}}</view>
					<view class="tit2">{{item.orderNums}}人已付款</view>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				keywords: '',
				pageSize: 10,
				pageIndex: 1,
				
				goodsList:[],
			}
		},
		onLoad(option){
			let keywords = option.keywords;
			this.keywords = keywords;
			uni.setNavigationBarTitle({
			    title: keywords
			});
			this.loadData('refresh');
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				if(type === 'refresh'){
					this.goodsList = [];
					this.pageIndex = 1;
				}else{
					this.pageIndex = this.pageIndex + 1;
				}
				let values = {nameLike:this.keywords,pageSize:this.pageSize,pageIndex: this.pageIndex};
				let result = await this.$request.ModelHome.getGoodsList(values);
				let goodsList = result.records;
				
				this.goodsList = this.goodsList.concat(goodsList);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType  = goodsList.length >= this.pageSize ? 'more' : 'nomore';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			navToDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		}
	}
</script>

<style lang='scss'>
	.d_desc{
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(0,0,0,1);
		padding: 40rpx 40rpx 0;
	}
	
	.d_body{
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 50rpx;
	}
	
	.order_item{
		width: 330rpx;
		height: 380rpx;
		margin-left: 30rpx;
		margin-top: 40rpx;
		
		.item_img{
			width: 100%;
			height: 297rpx;
		}
		
		.d_center{
			display: flex;
			align-items: center;
			
			.tit1{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,68,63,1);
				flex: 1;
				
				span{
					font-size:20rpx !important;
				}
			}
			
			.tit2{
				font-size:18rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(159,159,159,1);
			}
		}
		
		.name{
			font-size:20rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(0,0,0,1);
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>
