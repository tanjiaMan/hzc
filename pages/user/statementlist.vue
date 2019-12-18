<template>
	<view class="container">
		<view class="goods-item uni-flex uni-row" v-for="(item,index) in records" :key="index">
			<view class="dleft">
				<view class="bk_index_text"><text class="num">{{index + 1}}</text></view>
				<image :src="item.coverPicUrl" mode="aspectFill"></image>
			</view>
			<view class="dcenter">
				<view class="tit1">
					热风时尚专属女鞋
				</view>
				<view class="tit2">
					
				</view>
				<view class="d1">
					<text class="tit3">¥</text><text class="tit4">{{item.price}}</text>
				</view>
			</view>
			<view class="dright">
				<view class="bt">{{item.dealQuantity?item.dealQuantity:0}}</view>
			</view>
		</view>
		<uni-load-more :status="query.loadingType"></uni-load-more>
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
				query:{
					pageIndex: 1,
					pageSize: 10,
					loadingType: 'more',
				},
				records:[],
			}
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
			this.getProduce('more');
		},
		onLoad(){
			this.getProduce();
		},
		methods: {
			async getProduce(type){
				if(this.query.loadingType == 'noMore'){
					return;
				}
				if(type == 'more'){
					this.query.pageIndex = this.query.pageIndex + 1;
				}else if(type == 'refresh'){
					this.query.pageIndex = 1;
				}
				this.query.loadingType = 'loading';
				let result = await this.$request.ModelUser.getStsProduct(this.query);
				let moneylist = result.records;
				
				if(moneylist.length < this.query.pageSize){
					this.query.loadingType = 'noMore';
				}else{
					this.query.loadingType = 'more'; 
				}
				
				moneylist.forEach(item=>{
					this.records.push(item);
				})
			}
		}
	}
</script>

<style lang='scss'>
	
	body{
		background-color: #FFFFFF;
	}
	
	.container{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		
		.goods-item{
			width: 700rpx;
			margin: 0 auto;
			border-bottom: solid 1px #E8E8E8;
			height: 232rpx;
			padding-top: 30rpx;
			
			.dleft{
				width: 180rpx;
				position: relative;
				
				>image{
					height: 180rpx;
					width: 180rpx;
					border-radius:10rpx;
				}
				
				.bk_index_text{
					color:white;
					position:absolute;
					top: 0;
					left: 0;
					z-index:9999;
					font-size:20rpx;
					font-family:PangMenZhengDao;
					font-weight:400;
					color:rgba(255,255,255,1);
					width: 48rpx;
					height: 48rpx;
					background-image: url('https://pic.youx365.com/usta-bg.png');
					background-size: cover;
					
					.num{
						margin-top: -1px;
						margin-left: 4rpx;
					}
				}
			}
			
			.dcenter{
				width: 420rpx;
				padding-left: 34rpx;
				
				.tit1{
					font-size:26rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(18,18,18,1);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.tit2{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(102,102,102,1);
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				
				.tit3{
					font-size:20rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,68,63,1);
				}
				
				.tit4{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:500;
					color:rgba(255,68,63,1);
				}
			}
			
			.dright{
				width: 100rpx;
				
				.bt{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(255,68,63,1);
					border:1px solid rgba(255,68,63,1);
					border-radius:30rpx;
					text-align: center;
					height: 34rpx;
					line-height: 34rpx;
				}
			}
		}
	}
</style>
