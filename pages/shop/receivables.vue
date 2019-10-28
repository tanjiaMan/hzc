<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex == index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item uni-flex uni-row"
						v-if="tabCurrentIndex != 2"
					>
						<view class="d-check">
							<view class="check-wrapper" @click.stop="stopPrevent">
								<view
									class="yticon icon-xuanzhong2 checkbox"
									:class="{checked: item.checked}"
									@click="check('item', index)"
								></view>
							</view>
						</view>
						<view class="d-detail">
							<view class="d-top uni-flex uni-row">
								<view class="d-top-1">
									<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
									<text class="tit1">张三</text>
								</view>
								<view class="tit2">
									05-28 16:50:30
								</view>
							</view>
							<view class="d-center uni-flex uni-row">
								<view class="d-left">
									<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
								</view>
								<view class="d-right">
									<view class="uni-flex uni-row">
										<view class="tit1">退伍军人纪念品老兵退伍留念木盒礼盒</view>
										<view class="tit2">￥1000.00</view>
									</view>
									<view class="uni-flex uni-row">
										<view class="tit3">红色 x1</view>
										<view class="tit4"><text class="tit5">2</text>/120</view>
									</view>
								</view>
							</view>
							<view class="d-bottom">
								进货价：800件 总利润：200
							</view>
						</view>
					</view>
					<view
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item uni-flex uni-row"
						v-if="tabCurrentIndex == 2"
					>
						<view class="d-detail">
							<view class="d-top uni-flex uni-row">
								<view class="d-top-1">
									<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
									<text class="tit1">张三</text>
								</view>
								<view class="tit2">
									05-28 16:50:30
								</view>
							</view>
							<view class="d-center uni-flex uni-row">
								<view class="d-left">
									<img class="img" src="https://pic.youx365.com/9/54072d9802a0d64ac3f5210af7fe5a10.jpg" />
								</view>
								<view class="d-right">
									<view class="uni-flex uni-row">
										<view class="tit1">退伍军人纪念品老兵退伍留念木盒礼盒</view>
										<view class="tit2">￥1000.00</view>
									</view>
									<view class="uni-flex uni-row">
										<view class="tit3">红色 x1</view>
										<view class="tit4"><text class="tit5">2</text>/120</view>
									</view>
								</view>
							</view>
							<view class="d-bottom">
								进货价：800件 总利润：200
							</view>
						</view>
					</view>
					<view class="d-count" v-if="tabCurrentIndex != 2">
						共 <text class="tit1">2</text> 件商品 合计<text class="tit1">￥1600.00</text>
					</view>
					<view v-if="tabCurrentIndex != 2" style="height: 50px;"></view>
					 
					<uni-load-more v-if="tabCurrentIndex == 2" :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 底部菜单栏 -->
		<view class="action-section" v-if="tabCurrentIndex != 2">
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
			</view>
			<button v-if="tabCurrentIndex == 0" type="primary" class="no-border confirm-btn">一键收款</button>
			<button v-if="tabCurrentIndex == 1" type="primary" class="no-border confirm-btn">一键补货</button>
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
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '待收款',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 1,
						text: '待补货',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1
					},
					{
						state: 2,
						text: '已收款',
						loadingType: 'more',
						orderList: [],
						pageSize: 10,
						pageIndex: 1
					},
				],
				allChecked: false,
				total: 0, //总价格
			}
		},
		onLoad(options){
			this.loadData()
		},
		methods: {
			stopPrevent(){},
			navTo(url){
				uni.navigateTo({
					url
				})  
			},
			//获取订单列表
			async loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				if(source === 'tabChange'){ //切换重新刷新
					navItem.pageIndex = 1;
					navItem.orderList = [];
					navItem.loadingType = 'more';
				}
				
				if(navItem.loadingType == 'noMore'){
					return;
				}
				
				navItem.loadingType = 'loading';
				
				let values = {pageIndex: navItem.pageIndex,pageSize: navItem.pageSize};
				let orderList = [{checked:false,price: 10},{checked:false,price: 5},{checked:false,price: 3},{checked:false,price: 10},{checked:false,price: 5},{checked:false,price: 3}];
				orderList.forEach(item=>{
					navItem.orderList.push(item);
				})
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if(orderList.length < navItem.pageSize){
					navItem.loadingType = 'noMore';
				}else{
					navItem.loadingType = 'more'; 
				}
				
				navItem.pageIndex = navItem.pageIndex + 1;
				this.navList[index] = navItem;
				this.calcTotal();
				console.log('this.navList[index]',this.navList[index]);
			}, 
			//swiper 切换
			changeTab(e){
				if(this.tabCurrentIndex == e.target.current){
					return;
				}
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				if(this.tabCurrentIndex == index){
					return;
				}
				this.tabCurrentIndex = index;
				this.loadData('tabChange');
			},
			check(type, index){
				let navItem = this.navList[this.tabCurrentIndex];
				
				if(type === 'item'){
					navItem.orderList[index].checked = !navItem.orderList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = navItem.orderList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.navList[this.tabCurrentIndex] = navItem;
				this.calcTotal(type);
			},
			//计算总价
			calcTotal(){
				let navItem = this.navList[this.tabCurrentIndex];
				let list = navItem.orderList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					if(item.checked === true){
						total += item.price;
					}else if(checked === true){
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
		}
	}
</script>

<style lang='scss'>
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.order-item{
		margin: 24rpx auto 0;
		width: 710rpx;
		height: 304rpx;
		
		.d-check{
			width: 72rpx;
			height: 30rpx;
			
		}
		
		.d-detail{
			width: 638rpx;
			height: 304rpx;
			background-color: #FFFFFF;
			border-radius:9rpx;
			margin: 0 auto;
			
			.d-top{
				height: 76rpx;
				border-bottom: solid 1px #E3E3E3;
				
				.img{
					height: 48rpx;
					width: 48rpx;
					border-radius: 50%;
					margin: 0 17rpx 0 28rpx;
				}
				
				.tit1{
					font-size:24rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(0,0,0,1);
				}
				
				.d-top-1{
					width: 60%;
					display: flex;
					align-items: center;
				}
				
				.tit2{
					width: 40%;
					padding-right: 20rpx;
					font-size:22rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(153,153,153,1);
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}
			
			.d-center{
				height: 157rpx;
				border-bottom: solid 1px #E3E3E3;
				
				.d-left{
					width: 168rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.img{
						width: 116rpx;
						height: 103rpx;
					}
				}
				
				.d-right{
					width: 470rpx;
					
					.tit1{
						width: 60%;
						font-size:22rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(0,0,0,1);
						height: 74rpx;
						margin-top: 20rpx;
						line-height: 1.4;
					}
					
					.tit2{
						width: 40%;
						font-size:22rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(255,68,63,1);
						text-align: right;
						padding-right: 20rpx;
						margin-top: 20rpx;
					}
					
					.tit3{
						width: 60%;
						font-size:22rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:rgba(181,181,181,1);
					}
					
					.tit4{
						width: 40%;
						font-size:22rpx;
						font-family:SourceHanSansCN;
						font-weight:400;
						color:#B5B5B5;
						text-align: right;
						padding-right: 20rpx;
						
						.tit5{
							color: #FF443F !important;
						}
					}
				}
			}
			
			.d-bottom{
				height: 69rpx;
				padding-left: 26rpx;
				line-height: 69rpx;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:400;
				color:rgba(181,181,181,1);
			}
		}
	}
	
	.d-count{
		font-size:24rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:#333333;
		text-align: right;
		margin-right: 24rpx;
		margin-top: 39rpx;
		margin-bottom: 39rpx;
		
		.tit1{
			color: #FF443F;
		}
	}
	
	.check-wrapper{
		
		.checked{
			color: #00A390 !important;
		}
		
		.checkbox{
			font-size: 44upx;
			line-height: 236rpx;
			color: $font-color-disabled;
		}
	}
	
	/* 其他 */
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.uni-swiper-item{
		height: auto;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			position: relative;
			font-size:30rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(68,68,68,1);
			
			&.current{
				color: #00A390;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #00A390;
				}
			}
		}
	}
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
	
	/* 底部栏 */
	.action-section{
		position:fixed;
		left: 0;
		bottom:0;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 91rpx;
		padding: 0 0 0 30rpx;
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
				color:#FF443F;
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
			margin: 0;
			height: 91rpx;
			line-height: 91rpx;
			font-size: $font-base + 2upx;
			background: #FF443F;
			border-radius: 0 !important;
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
	.action-section .checkbox.checked{
		color: #00A390;
	}
</style>
