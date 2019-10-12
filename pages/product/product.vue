<template>
	<view class="container">
		<!-- 登陆校验 -->
		<cu-login :inviteUserId = "inviteUserId"></cu-login>
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in goods.picUrlList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="tg_frame">
			<span class="tag">团购价</span>
			<span class="now_price">¥ {{goods.price}}</span>
			<!-- <span class="org_price">¥ {{goods.originPrice}}</span> -->
		</view>
		
		<view class="introduce-section">
			<view class="uni-flex uni-row">
				<view class="flex-item title">{{goods.name}}</view>
				
				<view class="flex-item share">
					<button class="p-b-btn" open-type="share">
						<img src="https://pic.youx365.com/share.png" /><span>分享</span>
					</button>
				</view>
			</view>
			<view class="line"></view>
			<!-- <view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">341.6</text>
				<text class="m-price">¥488</text>
				<text class="coupon-tip">7折</text>
			</view>
			<view class="bot-row">
				<text>销量: 108</text>
				<text>库存: 4690</text>
				<text>浏览量: 768</text>
			</view> -->
		</view>
		
		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
			
		</view> -->
		
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec" v-if="goods.config && goods.config.specification && goods.config.specification == true">
				<text class="tit">已选</text>
				<view class="con">
					<text v-if="specSelected.length > 0" class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
					<text v-if="specSelected.length == 0" class="selected-text" style="color: #ff443f;">
						请选择规格
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<!-- <view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view> -->
			<view class="c-row b-b">
				<text class="tit">说明</text>
				<view class="bz-list con" v-if="goods.tagList && goods.tagList.length > 0">
					<text v-for="(item, index) in goods.tagList" :key="index">{{item}}</text>
				</view>
				<view class="bz-list con"  v-else>
					<text>假一赔十</text>
					<text>7天可退</text>
					<text>产地直邮</text>
				</view>
			</view>
		</view>
		
		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">宝贝评价（86）</text>
				<text class="tit1">好评率 100%</text>
				<text class="tip">查看全部</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<scroll-view class="floor-list" scroll-x>
						<view class="scoll-wrapper">
							<view 
								v-for="(item, index) in 3" :key="index"
								class="floor-item"
							>
								<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg" mode="aspectFill"></image>
							</view>
						</view>
					</scroll-view>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="line_frame">
			<view class="line_1"></view>	
		</view>
		
		
		<view class="detail-desc">
			<view class="d-header-1">
				<text>商品详情</text>
			</view>
			<view class="rich-text1">
				<!-- <uParse :content="goods.desc"  /> -->
				<image v-for="(item,index) in goods.desc" :key="index" class="img" mode="widthFix" 
				:src="item" />
			</view>
		</view>
		
		<view class="detail-desc">
			<view class="d-header-1">
				<text>为您推荐</text>
			</view>
			<view class="rich-text">
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<view
								v-for="(item, index) in goodsList" :key="index"
								class="floor-item"
								@click="navToDetailPage(item.id)"
							>
								<view class="image-wrapper">
									<image :src="item.coverPicUrl" lazy-load=true mode="aspectFill"></image>
								</view>
								 <view class="uni-flex uni-row" style="width: 100%;">
								    <view class="flex-item" style="width: 50%;">
										<text class="price">￥{{item.price}}</text>
									</view>
								    <view class="flex-item" style="width: 50%;text-align: right;">
										<text class="buysum">{{item.orderNums}}人已付款</text>
									</view>
								</view>
								<text class="title clamp">{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom uni-flex uni-row">
		    <view class="flex-item frame1">
				<button class="p-b-btn" open-type="contact" @contact="handleContact">
					<img src="https://pic.youx365.com/kf.png" />
					<text>客服</text>
				</button>
				<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
					<img src='https://pic.youx365.com/cart.png' />
					<text>购物车</text>
				</navigator>
			</view>
		    <view class="flex-item" style="width: 50%;">
				<view class="action-btn-group">
					<button type="primary" class=" action-btn no-border add-cart-btn" @click="addCart" style="background: #00A390;">加入购物车</button>
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="buyNow">立即购买</button>
				</view>
			</view>
		</view>
		
		
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="goodsStockSelectd.picUrlList[0]" v-if="goodsStockSelectd.picUrlList && goodsStockSelectd.picUrlList.length > 0"></image>
					<image :src="goods.coverPicUrl" v-else></image>
					<view class="right">
						<text class="price" v-if="goodsStockSelectd.price">¥{{goodsStockSelectd.price}}</text>
						<text class="stock" v-if="goodsStockSelectd.leftStock">库存：{{goodsStockSelectd.leftStock}}{{goods.unit}}</text>
						<text v-else>没有库存</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in specChildList" 
							v-if="childItem.pid === item.id"
							:key="childIndex" class="tit"
							:class="{selected: childItem.selected}"
							@click="selectSpec(childIndex, childItem.pid)"
						>
							{{childItem.name}}
						</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/uParse/src/wxParse.vue';
	import {mapState} from 'vuex';  
	
	export default{
		components: {
			uParse
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				inviteUserId: null,
				goods:{},
				
				specClass: 'none',
				specSelected:[],
				goodsStockSelectd:{},

				specList: [],
				specChildList: [],
				goodsStock:[],
				
				//推荐商品
				goodsList: [],
			};
		},
		methods:{
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					//关闭之前选择
					if(!this.goodsStockSelectd.id){//当前规格没有库存，请重新选择
						uni.showToast({
							icon:'none',
						    title: '当前规格没有库存',
						    duration: 2000
						});
						return;
					}
					
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index, pid){
				let list = this.specChildList;
				list.forEach(item=>{
					if(item.pid === pid){
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = []; 
				list.forEach(item=>{ 
					if(item.selected === true){ 
						this.specSelected.push(item); 
					} 
				})
				this.findGoodsStock();
			},
			findGoodsStock(){
				let stockSelectd = {};
				for(var k=0;k<this.goodsStock.length;k++){
					let item = this.goodsStock[k];
					let match = true;
					for(var i=0;i<this.specSelected.length;i++){
						if(!item.specIdList.includes(this.specSelected[i].id)){
							match = false;
							break
						}
					}
					if(match == true){
						stockSelectd = item;
						break;
					}
				}
				this.goodsStockSelectd = stockSelectd;
			},
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			},
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			async dataLoad(id){
				//加载商品详情
				let goods = await this.$request.ModelHome.getGoodsDetail(id);
				goods.desc = JSON.parse(goods.desc);
				this.goods = goods;
				
				//加载商品规格
				let goodsSpe = await this.$request.ModelHome.getGoodsSpecificat(id);
				goodsSpe.forEach(flist => {
					this.specList.push({id: flist.id,name: flist.name});
					flist.childs && flist.childs.forEach(slist => {
						this.specChildList.push(slist);
					})
				});
				
				//加载规格库存
				let goodsStock = await this.$request.ModelHome.getGoodsSellSpecificat(id);
				this.goodsStock = goodsStock;
				
				//规格 默认选中第一条
				// this.specList.forEach(item=>{
				// 	for(let cItem of this.specChildList){
				// 		if(cItem.pid === item.id){
				// 			this.$set(cItem, 'selected', true);
				// 			this.specSelected.push(cItem);
				// 			break; //forEach不能使用break
				// 		}
				// 	}
				// });
				// this.findGoodsStock();
				
				//推荐商品列表
				let goodsList = await this.$request.ModelHome.getGoodsRecommend();
				this.goodsList = goodsList.records || [];
			},
			async buyNow(){
				let goods = this.goods;
				let productSpecId = null;
				if(goods.config && goods.config.specification && goods.config.specification == true){ //需要选择规格
					if(!this.goodsStockSelectd.id){
						this.$api.msg('请先选择规格');
						return;
					}
					productSpecId = this.goodsStockSelectd.id;
				}
				let orderProducts = [];
				orderProducts.push({
					productId: goods.id,
					productSpecId: productSpecId,
					quantity: 1
				})
				uni.redirectTo({
					url: '/pages/order/createOrder?order=' + JSON.stringify(orderProducts)
				})
			},
			addCart(){ //加入购物车
				let goods = this.goods;
				let productSpecId = null;
				if(goods.config && goods.config.specification && goods.config.specification == true){ //需要选择规格
					if(!this.goodsStockSelectd.id){
						this.$api.msg('请先选择规格');
						return;
					}
					productSpecId = this.goodsStockSelectd.id;
				}
				let values = {increaseNum:1,productId:goods.id,productSpecId: productSpecId};
				this.$request.ModelOrder.addShopCar(values).then(result => {
					if(result.code == 'ok'){
						uni.showToast({
						    title: '加入购物车成功',
						    duration: 2000
						});
					}else{
						uni.showToast({
							icon:'none',
						    title: '加入购物车失败',
						    duration: 2000
						});
					}
				})
			},
			stopPrevent(){}
		},
		onShareAppMessage() { //设置分享
			return {
				title: '欢迎来到社集优选',
				path: '/pages/product/product?id='+this.goods.id + '&inviteUserId=' + this.userInfo.id
			}
		},
		async onLoad(options){
			this.inviteUserId = options.inviteUserId;
			
			let id = options.id;
			this.dataLoad(id);
		},
	}
</script>

<style lang='scss'>
	page{
		background: #FFFFFF;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	/* 其他商品属性 */
	.tg_frame{
		height: 93rpx;
		width: 750rpx;
		background-color: #FF443F;
		
		.tag{
			width: 78rpx;
			height: 33rpx;
			background-color: #FFDD3F;
			border:1px solid rgba(255,255,255,1);
			border-radius:2rpx;
			font-size:18rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,68,63,1);
			margin-left:22rpx;
			margin-right:22rpx;
		}
		
		.now_price{
			line-height: 93rpx;
			font-size: 42rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
		
		.org_price{
			margin-left: 21rpx;
			line-height: 93rpx;
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			text-decoration:line-through;
			color:rgba(255,255,255,1);
			opacity:0.55;
		}
	}
	
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		/* padding: 20upx 30upx; */
		padding-top: 38rpx;
		
		.title{
			width: 630rpx;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
			padding: 0 20rpx 20rpx;
		}
		.line{
			height:10rpx;
			background:rgba(242,242,242,1);
		}
		.share{
			width: 120rpx;
			height: 57rpx;
			background:rgba(0,163,144,1);
			border-radius:29rpx 0 0 29rpx;
			text-align:center;
			position: relative;

			uni-button:after{
				width: 0 !important;
				height: 0 !important;
				border: 0 !important;
			}
			
			button:after{
				width: 0 !important;
				height: 0 !important;
				border: 0 !important;
			}

			.p-b-btn{
				position: unset;
				background-color: unset;
				padding-left: unset;
				padding-right: unset;
				font-size: unset;
				height: 57rpx;
				line-height: 57rpx;
				position:absolute;
				top:0;
				left:20rpx;
			}

			image{
				width: 24rpx;
				height: 24rpx;
				vertical-align: middle;
				margin-right:4rpx;
				margin-left: 6px;
			}
			
			img{
				width: 24rpx;
				height: 24rpx;
				vertical-align: middle;
				margin-right:4rpx;
				margin-left: 6px;
			}
			
			span{
				font-size:20rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: 22rpx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140rpx;
			font-size:22rpx;
		}
		.con{
			font-size:22rpx;
			flex: 1;
			color: #000000;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size:22rpx;
			color: #000000;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		border-top: 5px solid #F2F2F2;
		
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(35,35,35,1);
			}
			.tit1{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,68,63,1);
			}
			.tip{
				flex: 1;
				text-align: right;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(0,163,144,1);
			}
			.icon-you{
				margin-left: 10upx;
				color:rgba(0,163,144,1)
			}
		}
	}
	
	.line_frame{
		background: #FFFFFF;
		width: 100%;
		height: 1px;
	}
	
	.line_1{
		width:695rpx;
		height:1px;
		background:rgba(228,228,228,1);
		margin: 0 auto;
	}
	
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 64rpx;
			height: 64rpx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26rpx;
			
			.name span{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.con{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(102,102,102,1);
				padding: 20rpx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
			
			.floor-list{
				white-space: nowrap;
				width: 560rpx;
			}
			.scoll-wrapper{
				display:flex;
				align-items: flex-start;
			}
			.floor-item{
				width: 168rpx;
				margin-right: 26rpx;
				
				image{
					width: 168rpx;
					height: 168rpx;
					border-radius: 10rpx;
				}
				
				img{
					width: 168rpx;
					height: 168rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		padding-top: 16rpx;
		
		.d-header-1{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:bold;
			color:rgba(51,51,51,1);
			padding: 24rpx 0 24rpx 24rpx;
		}
		
		.rich-text1{
			padding: 0 24rpx 0 24rpx;
			line-height: 0;
			
			.img{
				width: 700rpx;
			}
		}
		
		.rich-text{
			padding: 0 24rpx 0 24rpx;
		}
		
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: 26rpx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
		
		.floor-list{
			white-space: nowrap;
			width: 100%;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 317rpx;
			margin-right: 27rpx;
			
			image{
				width:317rpx;
				height:297rpx;
				border-radius:6px 6px 6px 6px;
				opacity: 100 !important;
			}
			
			.title{
				font-size: 20rpx;
				color: #000000;
			}
			.buysum{
				font-size: 18rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color: #9F9F9F;
			}
			.price{
				font-size: 24rpx;
				color: #FF443F;
				font-weight:500;
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		bottom:0;
		z-index: 95;
		width: 100%;
		height: 93rpx;
		background: #EEEEEE;
		
		.frame1{
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
		}
		
		.p-b-btn:after{
			border: 0;
		}
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			color: $font-color-base;
			width: 100rpx;
			height: 100%;
			margin-right: 20rpx;
			margin-left: 20rpx;
			
			background:#EEEEEE;
			height: 100%;
			line-height: unset;
			padding: 0 !important;
		
			
			img{
				width: 48rpx;
				height: 48rpx;
			}
			
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 100%;
			overflow: hidden;
			background: #FF443F;
			margin-right: 0;
			
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 50%;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
</style>
