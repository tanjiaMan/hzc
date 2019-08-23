<template>  
    <view class="container">
		<view class="tab_detail">
			<view class="tab_item uni-flex uni-row" v-for="item in 10" :key="item">
				<view class="flex-item d_1">
					<img class="img" src="https://pic.youx365.com/wazi2.JPG"  />
				</view>
				<view class="flex-item d_2">
					<view class="d_4">
						<text class="tit1">朱三{{item}}</text>
						<text class="tit3">2017-01-23</text>
					</view>
					<view class="tit2">《走在乡间的小路上》</view>
				</view>
				<view class="flex-item d_3">
					<img class="img" :src=" item % 2 == 0?'https://pic.youx365.com/collection_s.png': 'https://pic.youx365.com/collection_z.png'" />
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
		//下拉刷新
		onPullDownRefresh(){
			this.$api.msg('下拉刷新');
		},
		//加载更多
		onReachBottom(){
			this.$api.msg('加载更多');
		},
        methods: {
			 
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
			height: 172rpx;
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
				
				.img{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
	
</style>