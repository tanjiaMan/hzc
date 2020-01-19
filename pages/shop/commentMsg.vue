<template>
	<view class="container">
		<view class="d_header">
			<view :class="type == 3?'d_header_item active':'d_header_item'" @click="change(3)">好评</view>
			<view :class="type == 2?'d_header_item active':'d_header_item'" @click="change(2)">中评</view>
			<view :class="type == 1?'d_header_item active':'d_header_item'" @click="change(1)">差评</view>
			<view :class="type == 0?'d_header_item active':'d_header_item'" @click="change(0)">待回复</view>
		</view>
		<view class="d_content">
			<view class="d_content_item" v-for="(item,index) in orderList" :key="index">
				<view class="d_content_left">
					<img class="img_avar" :src="item.avatarUrl" />
				</view>
				<view class="d_content_right">
					<view class="d_1">
						<view class="tit1">{{item.nickName}}</view>
						<view class="tit2">{{item.createTime}}</view>
					</view>
					<scroll-view class="floor-list" scroll-x>
						<view class="scoll-wrapper">
							<view 
								v-for="(subitem, subindex) in item.picUrlList" :key="subindex"
								class="floor-item" @click="previewImage(subindex,item.picUrlList)"
							>
								<image :src="subitem" mode="aspectFill"></image>
							</view>
						</view>
					</scroll-view>
					<view class="d_2">
						{{item.message}}
					</view>
					<view class="line"></view>
					<view class="d_3">
						<view class="d_3_1">
							<image class="img_3_1" :src="item.productCoverPicUrl" mode="aspectFill"></image>
						</view>
						<view class="d_3_2">
							<view class="tit_3_2">{{item.productName}}</view>
						</view>
						<view v-if="!item.reply">
							<view v-if="selectId == -1 || selectId != index" class="d_3_3" @click="selectComment(index)">
								回复
							</view>
							<view v-else class="d_3_3" @click="commitCommet(index)">
								提交
							</view>
						</view>
					</view>
					<view class="d_5" v-if="selectId == index">
						<textarea v-model="commentStr" class="textare_5" placeholder="请输入回复内容" placeholder-style='placeholderclass'></textarea>
					</view>
					
					<view class="line" v-if="item.reply"></view>
					<view class="d_4" v-if="item.reply">
						<text class="tit_4_1">店主回复：</text><text class="tit_4_2">{{item.reply}}</text>
					</view>
					<view class="empty1"></view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<view class="empty"></view>
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
				type: 3,
				selectId:-1,
				commentStr:'',
				shopId: null,
				
				loadingType: 'more',
				orderList: [],
				pageSize: 10,
				pageIndex: 1,
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
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			async loadData(source){
				if(this.loadingType === 'loading'){
					return;
				}
				if('refresh' == source){
					this.pageIndex = 1;
					this.orderList = [];
					this.loadingType = 'more';
					this.selectId = -1;
				}
				if(this.loadingType == 'noMore'){
					return;
				}
				
				this.loadingType = 'loading';
				
				let shopId = this.shopId;
				let evalLvl = null;
				let needReply = null;
				if(this.type > 0){
					evalLvl = this.type;
				}else{
					needReply = true;
				}
				let value = {pageIndex:this.pageIndex,pageSize:this.pageSize,shopId};
				if(evalLvl){
					value['evalLvl'] = evalLvl;
				}
				if(needReply){
					value['needReply'] = needReply;
				}
				let result = await this.$request.ModelOrder.listComment(value);
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
			change(type){
				if(this.type == type){
					return;
				}
				this.type = type;
				this.loadData('refresh');
			},
			selectComment(id){
				this.selectId = id;
			},
			commitCommet(){
				if(this.commentStr == null || this.commentStr == ''){
					this.$api.msg('请输入回复内容!');
					return;
				}
				let comment = this.orderList[this.selectId];
				let value  = {reply: this.commentStr,id: comment.id};
				this.$request.ModelOrder.comment(value).then(result => {
					if(result.code == 'ok'){
						this.$api.msg('评价成功');
						this.commentStr = null;
						this.loadData('refresh');
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			previewImage(index,imgs) {
			    uni.previewImage({
			        current: index,
			        urls: imgs
			    })
			},
		},
		onLoad(option){
			this.shopId = option.shopId;
			this.loadData('refresh');
		}
	}
</script>

<style lang='scss'>
	
	.empty{
		height: 60rpx;
	}
	.empty1{
		height: 46rpx;
	}
	.line{
		width: 100%;
		height: 1px;
		background:rgba(223,223,223,1);
	}
	.placeholderclass{
		font-size: 22rpx;
		color: red;
	}
	
	.d_header{
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		padding: 40rpx 20rpx;
		justify-content: space-between;
	}
	
	.d_header_item{
		width:163rpx;
		height:57rpx;
		line-height:57rpx;
		background:rgba(238,238,238,1);
		border-radius:2rpx;
		font-size:28rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(0,0,0,1);
		text-align: center;
	}
	
	.active{
		color: #FFFFFF !important;
		background-color: #00A390 !important;
	}
	
	.d_content_item{
		width: 710rpx;
		background-color: #FFFFFF;
		border-radius: 5rpx;
		margin: 15rpx auto 0;
		display: flex;
	}
	.d_content_left{
		width: 100rpx;
		text-align: center;
		padding-top: 35rpx;
		
		.img_avar{
			width: 53rpx;
			height: 53rpx;
			border-radius: 50%;
		}
	}
	.d_content_right{
		width: 573rpx;
		padding-top: 38rpx;
		
		.d_1{
			display: flex;
			
			.tit1{
				flex: 1;
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			
			.tit2{
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(133,133,133,1);
			}
		}
		
		.floor-list{
			white-space: nowrap;
			width: 100%;
			margin-top: 27rpx;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 159rpx;
			margin-right: 15rpx;
			
			image{
				width: 159rpx;
				height: 97rpx;
			}
			
			img{
				width: 159rpx;
				height: 97rpx;
			}
		}
		
		.d_2{
			height: 72rpx;
			line-height: 72rpx;
			font-size:22rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(66,66,66,1);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		
		.d_3{
			display: flex;
			height: 109rpx;
			align-items: center;
			
			.d_3_1{
				width: 128rpx;
				
				.img_3_1{
					width: 109rpx;
					height: 63rpx;
				}
			}
			
			.d_3_2{
				flex: 1;
				
				.tit_3_2{
					width: 200rpx;
					font-size:22rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(0,0,0,1);
					line-height: 1.4 !important;
					margin-top: -12rpx;
					-webkit-line-clamp: 2;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
			}
			
			.d_3_3{
				width: 85rpx;
				height: 41rpx;
				line-height: 41rpx;
				border:1px solid rgba(255,68,63,1);
				border-radius:5rpx;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,68,63,1);
				text-align: center;
			}
		}
		
		.d_4{
			padding-top: 23rpx;
			
			.tit_4_1{
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:#00A390;
			}
			
			.tit_4_2{
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:#424242;
			}
		}
		
		.d_5{
			font-size: 22rpx;
			
			.textare_5{
				height: 120px;
				border: solid 1px #DFDFDF;
				border-radius: 10rpx;
				padding: 10rpx;
			}
		}
	}
</style>
