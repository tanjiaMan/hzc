<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合
			</view>
			<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClick(3)">
				最新
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: direction === false && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: direction === true && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量
				<view class="p-box">
					<text :class="{active: direction === false && filterIndex === 1}" class="yticon icon-shang"></text>
					<text :class="{active: direction === true && filterIndex === 1}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		<view class="goods-list">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.coverPicUrl" mode="aspectFill"></image>
				</view>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
					<text>已售 {{item.orderNums}}</text>
				</view>
				<text class="title clamp">{{item.name}}</text>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask" @click.stop="stopPrevent">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view class="d_nocontent" v-if="disData.length == 0">暂无过滤条件</view>
					<view class="sect_item" v-for="item in disData" :key="item.id">
						<view class="title">{{item.name}}</view>
						<view class="d_dis">
							<view :class="disIds.indexOf(dis.id)>-1?'d_dis_item seclt':'d_dis_item'" v-for="dis in item.childs" :key="dis.id" @click="selectQuery(dis.id)">
								{{dis.name}}
							</view>
						</view>
					</view>
					
					<view class="d_bt">
						<view class="bt_cz" @click="reset">重置</view>
						<view class="bt_qd" @click="search">确定</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
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
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				
				cateId: 0, //已选三级分类id
				pageIndex: 1,
				pageSize: 6,
				sort:'orderBySort',
				direction: true,
				
				goodsList: [], //推荐
				
				//刷选
				disData:[],
				disIds:[],
			};
		},
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			this.cateId = options.id;
			this.pid = options.pid;
			uni.setNavigationBarTitle({
			    title: options.name ? options.name : '商品列表'
			});
			
			this.loadData('refresh');
			
			//搜索属性加载
			this.$request.ModelOrder.getSearchTags(this.cateId).then(result => {
				this.disData = result;
			});
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
				let values = {classifyId:this.cateId,pageSize:this.pageSize,pageIndex: this.pageIndex};
				if(this.pid){
					values['classifyPid'] = this.pid;
				}
				values[this.sort] = true;
				values['direction'] = this.direction;
				if(this.disIds.length > 0){
					values['searchTags'] = this.disIds;
				}
				console.log('search',values);
				
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
			//筛选点击
			tabClick(index){ //0 综合，1 销量，2 价格，3 最新
				if(this.filterIndex === index && index !== 2 && index !== 1){
					return;
				}
				if(index === 2 || index === 1){
					if(this.filterIndex === index){
						this.direction = this.direction === true ? false: true;
					}else{
						this.direction = true;
					}
				}else{
					this.direction = true;
				}
				this.filterIndex = index;
				if(index == 0){
					this.sort = 'orderBySort';
				}else if(index == 1){
					this.sort = 'orderBySell';
				}else if(index == 2){
					this.sort = 'orderByPrice';
				}else if(index == 3){
					this.sort = 'orderByCreateTime';
				}
				
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//详情
			navToDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){},
			reset(){
				this.disIds = [];
			},
			search(){
				this.loadData('refresh');
				this.cateMaskState = 0;
			},
			selectQuery(id){
				if(this.disIds.indexOf(id) > -1){
					this.disIds = this.disIds.filter(item => item != id);
				}else{
					this.disIds.push(id);
				}
				console.log('this.disIds',this.disIds);
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 28rpx;
			color: #333333;
			font-family:SourceHanSansCN;
			font-weight:500;
			position: relative;
			&.current{
				color: #00A390;
				// &:after{
				// 	content: '';
				// 	position: absolute;
				// 	left: 50%;
				// 	bottom: 0;
				// 	transform: translateX(-50%);
				// 	width: 120upx;
				// 	height: 0;
				// 	border-bottom: 4upx solid $base-color;
				// }
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: #00A390;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		padding: 20rpx;
		background-color: #EFEFEF;
		height: 100vh;
		
		.d_nocontent{
			text-align: center;
		}
		
		.sect_item{
			.title{
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				margin-top: 50rpx;
			}
			.d_dis{
				display: flex;
				flex-wrap: wrap;
				
				.d_dis_item{
					background-color: #FFFFFF;
					font-size:24rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(51,51,51,1);
					height: 46rpx;
					padding: 0 20rpx;
					margin-right: 13rpx;
					margin-top: 19rpx;
				}
				
				.seclt{
					color: #FFFFFF !important;
					background-color: #00A390 !important;
				}
			}
		}
		
		.d_bt{
			display: flex;
			justify-content: flex-end;
			margin-top: 100rpx;
			
			.bt_cz{
				width: 180rpx;
				height: 62rpx;
				line-height: 62rpx;
				text-align: center;
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(255,255,255,1);
				background-color: #6D6D6D;
				border-radius: 30rpx;
			}
			
			.bt_qd{
				width: 180rpx;
				height: 62rpx;
				line-height: 62rpx;
				text-align: center;
				font-size:28rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(255,255,255,1);
				background-color: #00A390;
				margin-left: 30rpx;
				border-radius: 30rpx;
			}
		}
		
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size:20rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10rpx;
			
			font-size:18rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(159,159,159,1);
			line-height: 64rpx;
		}
		.price{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,68,63,1);
			
			&:before{
				content: '￥';
				font-size: 24rpx;
			}
		}
	}
	

</style>
