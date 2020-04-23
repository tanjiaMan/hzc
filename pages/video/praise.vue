<template>  
    <view class="container">
		<view class="tab_detail">
			<view class="tab_item uni-flex uni-row" v-for="item in records" :key="item">
				<view class="flex-item d_1">
					<img class="img" :src="item.iconUrl"  />
				</view>
				<view class="flex-item d_2">
					<view class="d_4">
						<text class="tit1">{{item.title}}</text>
						<text class="tit3">{{item.createTime && item.createTime.split(' ')[0]}}</text>
					</view>
					<view class="tit2">{{item.content}}</view>
				</view>
				<view class="flex-item d_3">
					<image :class="item.operType == 2?'img1':'img2'" :src="item.operType == 2?'https://pic.youx365.com/collection_s_1.png': 'https://pic.youx365.com/collection_z.png'" mode="aspectFit"></image>
				</view>
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
		data(){
			return {
				loadingType: 'more',
				records: [],
				pageSize: 20,
				pageIndex: 1
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
			this.loadData();
		},
		onLoad(){
			this.loadData('tabChange');
		},
        methods: {
			 async loadData(source){
			 	if(this.loadingType === 'loading'){
			 		//防止重复加载
			 		return;
			 	}
			 	
			 	if(source === 'tabChange'){ //切换重新刷新
			 		this.pageIndex = 1;
			 		this.records = [];
			 		this.loadingType = 'more';
			 	}
			 	
			 	if(this.loadingType == 'noMore'){
			 		return;
			 	}
			 	
			 	this.loadingType = 'loading';
			 	
			 	let orderList = [];
			 	let values = {type:3,pageIndex: this.pageIndex,pageSize: this.pageSize};
			 	let result = await this.$request.ModelOrder.pageCollect(values);
			 	result = result || {};
			 	orderList = result.records || [];
			 	orderList.forEach(item=>{
			 		this.records.push(item);
			 	})
			 	
			 	//判断是否还有数据， 有改为 more， 没有改为noMore 
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
	
	.tab_detail{
		padding: 28rpx 28rpx 28rpx 28rpx;;
		
		.tab_item{
			width: 100%;
			border-bottom: 1px solid #E8E8E8;
			
			.img{
				width:107rpx;
				height:107rpx;
				border-radius:50%;
				vertical-align: middle;
			}
			
			.d_1{
				width: 186rpx;
				text-align: center;
				height: 172rpx;
				line-height: 172rpx;
			}
			
			.d_4{
				padding-top: 36rpx;
			}
			
			.d_2{
				width: 387rpx;
				
				.tit1{
					font-size:28rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				
				.tit3{
					font-size:22rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(102,102,102,1);
					margin-left: 53rpx;
				}
				
				.tit2{
					font-size:24rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					margin-top: 12rpx;
				}
			}
			
			.d_3{
				width: 121rpx;
				height: 172rpx;
				line-height: 172rpx;
				text-align: center;
				
				.img1{
					width: 39rpx;
					height: 35rpx;
				}
				
				.img2{
					width: 42rpx;
					height: 40rpx;
				}
			}
		}
	}
	
</style>