<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin" class="empty1">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		
		<view v-else>
			<!-- 空白页 -->
			<view v-if="empty===true" class="empty">
				<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
				<view class="empty-tips">
					空空如也
					<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛></navigator>
				</view>
			</view>
			
			<!-- 列表 -->
			 <view class="cart-header uni-flex uni-row" v-if="empty != true">
				 <view class="flex-item d-1">
					<view class="tit1">购物车</view>
					<view class="tit2">共{{totalNum}}件宝贝</view>
				 </view>
				 <view class="flex-item d-2">
					<view class="bt" @click="deleteAll">删除</view>		 
				 </view>
			 </view>
			<view class="cart-list">
				<uni-swipe-action :options="options1" @click="deleteCartItem(index)" v-for="(item, index) in cartList" :key="index">
					<block>
						<view
							class="cart-item" 
							:class="{'b-b': index!==cartList.length-1}"
							@click="navTo('/pages/product/product?id='+item.productId)"
						>
							<view class="check-wrapper" @click.stop="stopPrevent">
								<view
									class="yticon icon-xuanzhong2 checkbox"
									:class="{checked: item.checked}"
									@click="check('item', index)"
								></view>
							</view>
							<view class="image-wrapper">
								<image :src="item.image" 
									mode="aspectFill" 
									lazy-load 
									@load="onImageLoad('cartList', index)" 
									@error="onImageError('cartList', index)"
								></image>
							</view>
							<view class="item-right" @click.stop="stopPrevent">
								<text class="clamp title">{{item.title}}</text>
								
								<view class="uni-flex uni-row" style="width: 100%;margin-top: 10px;">
									<text class="attr">{{item.attr_val}}</text>
								</view>
								<view class="uni-flex uni-row" style="width: 100%;">
									<view class="flex-item" style="width: 40%;">
										<text class="price">¥{{item.price}}</text>
									</view>
									<view class="flex-item" style="width: 60%;">
										<uni-number-box
											class="step"
											:min="1" 
											:max="item.stock"
											:value="item.number>item.stock?item.stock:item.number"
											:isMax="item.number>=item.stock?true:false"
											:isMin="item.number===1"
											:index="index"
											@eventChange="numberChange"
										></uni-number-box>
									</view>
								</view>
							</view>
						</view>
					</block>
				</uni-swipe-action>	
			</view>
			
			<!-- 猜你喜欢 -->
			<view class="guess-like" v-if="goodsList.length > 0">
				<view class="header">
					<img src="https://pic.youx365.com/split-1.png" />
					<text>猜你喜欢</text>
					<img src="https://pic.youx365.com/split-1.png" />
				</view>
				<view class="guess-section">
					<view 
						v-for="(item, index) in goodsList" :key="index"
						class="guess-item"
						@click="navToDetailPage(item.id)"
					>
						<view class="image-wrapper">
							<image :src="item.coverPicUrl" mode="aspectFill"></image>
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
			</view>
			
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="check-wrapper">
					<view
						class="yticon icon-xuanzhong2 checkbox"
						:class="{checked: allChecked}"
						@click="check('all')"
						style="font-size: 60rpx;height: auto;"
					></view>
				</view>
				<view class="qx">全选</view>
				<view class="total-box">
					<text class="price">总计：¥{{total}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	
	export default {
		components: {
			uniNumberBox,uniSwipeAction
		},
		data() {
			return {
				total: 0, //总价格
				totalNum:0,//商品总数
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				goodsList:[],
				
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
			};
		},
		onShow(){
			if(this.hasLogin){
				this.loadData();
			}
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			stopPrevent(){},
			//请求数据
			async loadData(){
				//加载购物车数据
				let cars = await this.$request.ModelOrder.getShopCar();
				let list = [];
				if(cars && cars.records){
					cars.records.forEach(item => {
						list.push({
							id: item.id,
							productId: item.productId,
							productSpecId: item.productSpecId,
							image: item.picUrlList && item.picUrlList.length>0 && item.picUrlList[0],
							attr_val: item.specNames,
							stock: 20,
							title: item.name,
							price: item.price,
							number: item.num
						})
					})
				}
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				});
				this.cartList = cartList;
				this.calcTotal();  //计算总价
				
				/* 猜你喜欢 */
				let goodsList = await this.$request.ModelHome.getGoodsRecommend();
				this.goodsList = goodsList.records || [];
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				let cartItem = this.cartList[data.index];
				
				let values = {updateNum:data.number,productId:cartItem.productId,productSpecId: cartItem.productSpecId};
				this.$request.ModelOrder.addShopCar(values).then(result => {
					if(result.code == 'ok'){
						this.cartList[data.index].number = data.number;
						this.calcTotal();
					}else{
						uni.showToast({
							icon:'none',
						    title: '操作失败',
						    duration: 2000
						});
					}
				})
			},
			//删除
			async deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;

				let ids = [];
				ids.push(id);
				let result = await this.$request.ModelOrder.delShopCar(JSON.stringify(ids));
				if(result.code == 'ok'){
					this.cartList.splice(index, 1);
					this.calcTotal();
					uni.hideLoading();
				}else{
					this.$api.msg('删除异常，清稍后重试');
				}
			},
			async deleteAll(){
				var that = this;
				let list = that.cartList;
				let ids = [];
				list.forEach(item=>{
					if(item.checked){
						ids.push(item.id);
					}
				})
				if(ids.length == 0){
					this.$api.msg('没有选择需要删除的商品');
					return;
				}
				uni.showModal({
				    title: '提示',
					content: '确定删除吗?',
				    success: function (res) {
				        if (res.confirm) {
				            that.$request.ModelOrder.delShopCar(JSON.stringify(ids)).then(result => {
								if(result.code == 'ok'){
									that.loadData();
								}else{
									that.$api.msg('删除异常，清稍后重试');
								}
							});
				        }
				    }
				});
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let totalNum = 0;
				let checked = true;
				list.forEach(item=>{
					if(item.checked === true){
						total += item.price * item.number;
					}else if(checked === true){
						checked = false;
					}
					totalNum = totalNum + item.number;
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
				this.totalNum = totalNum;
			},
			//创建订单
			createOrder(){
				let list = this.cartList;
				let orderProducts = [];
				list.forEach(item=>{
					if(item.checked){
						orderProducts.push({
							productId: item.productId,
							productSpecId: item.productSpecId,
							quantity: item.number
						})
					}
				})
				uni.navigateTo({
					url: '/pages/order/createOrder?order=' + JSON.stringify(orderProducts)
				})
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}
		}
	}
</script>

<style lang='scss'>
	.container{
		padding-bottom: 134upx;
		/* 空白页 */
		.empty{
			padding-bottom:150rpx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
		
		.empty1{
			position: fixed;
			width: 100%;
			height: 100%;
			padding-bottom:150rpx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	
	.cart-header{
		width: 100%;
		height: 284rpx;
		background-color: #00A390;
		
		.d-1{
			width: 50%;
			padding-left: 40rpx;
		}
		
		.d-2{
			width: 50%;
		}
		
		.tit1{
			font-size:34rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin-top: 35rpx;
		}
		
		.tit2{
			font-size:24rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.bt{
			width: 92rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,163,144,1);
			background-color: #FFFFFF;
			border-radius: 40rpx;
			float: right;
			margin-top: 35rpx;
			margin-right: 21rpx;
		}
	}
	
	.cart-list{
		margin-top: -142rpx;
		
		/deep/ .uni-swipe-action{
			width: 712rpx;
			margin: 20rpx auto 0;
			border-radius:10rpx;
			background: #FFFFFF;
		}
		
		.uni-swipe-action{
			width: 712rpx;
			margin: 20rpx auto 0;
			border-radius:10rpx;
			background: #FFFFFF;
		}
	}
	
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		/* width: 712rpx;
		margin: 20rpx auto 0;
		border-radius:10rpx; */
		height: 236rpx;
		
		.check-wrapper{
			height: 236rpx;
			width: 119rpx;
			text-align: center;
		}
		
		.image-wrapper{
			margin-top: 38rpx;
			width: 215rpx;
			height: 165rpx;
			flex-shrink: 0;
			position:relative;
			image{
				border-radius:8upx;
			}
		}
		.checkbox{
			font-size: 44upx;
			line-height: 236rpx;
			color: $font-color-disabled;
		}
		.item-right{
			padding-top: 38rpx;
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 23rpx;
			
			.clamp{
				white-space: unset;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			
			.title{
				font-size:30rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			.attr{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
			.price{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,68,63,1);
			}
			
			.del-log{
				text-align: right;
				
				img{
					width: 48rpx;
					height: 48rpx;
				}
			}
			
			/* 加减 */
			.uni-numbox{
				position: relative !important;
				height: 50rpx !important;
				line-height: 50rpx;
				background: #fff;
				
				/deep/ .uni-numbox-minus{
					border: 1px solid #999999;
					width: 38rpx;
					height: 38rpx;
					background-color: #fff;
					line-height: 32rpx;
					border-radius: 50%;
				}
				
				/deep/ .uni-numbox-plus{
					border: 1px solid #00A390;
					width: 38rpx;
					height: 38rpx;
					background-color: #00A390;
					line-height: 32rpx;
					border-radius: 50%;
					
					.yticon{
						color: #FFFFFF;
					}
				}
				
				/deep/ .uni-numbox-value{
					background: #fff;
				}
				
				/deep/ .yticon{
					font-size: 12px;
					font-weight: bold;
				}
				
				.uni-numbox-minus{
					border: 1px solid #999999;
					width: 38rpx;
					height: 38rpx;
					background-color: #fff;
					line-height: 32rpx;
					border-radius: 50%;
				}
				
				.uni-numbox-plus{
					border: 1px solid #00A390;
					width: 38rpx;
					height: 38rpx;
					background-color: #00A390;
					line-height: 32rpx;
					border-radius: 50%;
					
					.yticon{
						color: #FFFFFF;
					}
				}
				
				.uni-numbox-value{
					background: #fff;
				}
				
				.yticon{
					font-size: 12px;
					font-weight: bold;
				}
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		left: 0;
		bottom:0;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 120rpx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		.checkbox{
			height:52upx;
			position:relative;
			color:#C0C4CC;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size:34rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 80rpx;
			line-height: 80rpx;
			font-size: $font-base + 2upx;
			background: #FF443F;
		}
		
		.qx{
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-left: 26rpx;
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: #00A390;
	}
	
	.guess-like{
		margin-top: 49rpx;
		background-color: #fff;
		
		.header{
			text-align: center;
			font-size:32rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(0,0,0,1);
			
			
			img{
				height: 48rpx;
				width: 48rpx;
				vertical-align: middle;
				padding: 0px 5px 0 5px;
			}
		}
		
		.guess-section{
			display:flex;
			flex-wrap:wrap;
			padding: 48rpx 30rpx 0 30rpx;
			width: 710rpx;
			margin:0 auto 30rpx;
			border-radius:0rpx 0 16rpx 16rpx;
			
			.guess-item{
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
				height: 300rpx;
				border-radius: 3px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
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
</style>
