<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in goods.picUrlList" :key="index" @click="previewImage(index,goods.picUrlList)">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
			<view v-if="goods.collected" class="d_sc" @click="removeCollect">
				<image class="img2" src="https://pic.youx365.com/collection_z.png" mode="aspectFit"></image>
				<view class="titsc">取消收藏</view>
			</view>
			<view v-else class="d_sc d_sc1" @click="addCollect">
				<image class="img2" src="https://pic.youx365.com/collection_z.png" mode="aspectFit"></image>
				<view class="titsc">收藏</view>
			</view>
		</view>
		
		<view v-if="goods.id">
			<view class="tg_frame" v-if="source == 'seckill' ">
				<view class="kill_left">
					<view class="d_seckill_img">
						<image class="img_seckill" src="https://pic.youx365.com/product_seckill.png" mode="aspectFill"></image>
					</view>
					<span class="now_price">¥ {{goods.seckillPrice}}</span>
					<span class="org_price">¥ {{goods.originPrice}}</span>
				</view>
				<view class="kill_right">
					{{goods.seckillStatusStr}} {{goods.seckillHourStr}}开抢
				</view>
			</view>
			<view class="tg_frame" v-else-if="source == 'groupbuy'">
				<view style="flex: 1;">
					<span class="now_price">¥ {{goods.price}}</span>
					<span class="org_price">¥ {{goods.originPrice}}</span>
				</view>
				<view class="kill_right">
					已拼{{goods.orderNums}}件
				</view>
			</view>
			<view class="tg_frame" v-else-if="source == 'bargain' ">
				<view style="flex: 1;">
					<span class="bargain_desc">可砍至</span>
					<span class="now_price">¥ {{goods.price}}</span>
				</view>
				<view class="bargin_right" v-if="goods.timestr && goods.timestr != ''">
					<view class="tit_bargin_1">距结束还剩：</view>
					<view class="tit_bargin_2">{{goods.timestr.split(":")[0]}}</view>
					<view class="tit_bargin_1">：</view>
					<view class="tit_bargin_2">{{goods.timestr.split(":")[1]}}</view>
					<view class="tit_bargin_1">：</view>
					<view class="tit_bargin_2">{{goods.timestr.split(":")[2]}}</view>
				</view>
			</view>
			<view class="tg_frame" v-else>
				<span class="now_price">¥ {{goods.price}}</span>
				<!-- <span class="org_price">¥ {{goods.originPrice}}</span> -->
			</view>
		</view>
		
		<view class="introduce-section">
			<view class="uni-flex uni-row">
				<view class="flex-item title">{{goods.name}}</view>
				
				<view class="flex-item share">
					<button class="p-b-btn" @click="initData"> <!-- open-type="share" -->
						<img src="https://pic.youx365.com/share.png" /><span>海报</span>
					</button>
				</view>
			</view>
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

		<view class="frame_bargin" v-if="source == 'bargain' && goods.bargainJoinId">
			<view class="tit_bargin_1">已砍 <span>{{goods.myBargain}}</span> 元，还差 <span>{{goods.myLeftBargain}}</span> 元</view>
			<view class="line-bargin_1">
				<view class="active" :style="'width: '+ (goods.myBargain*100/(goods.myLeftBargain+goods.myBargain)) +'%'"></view>
			</view>
			<view class="bt_bargin_2" @click="navTo('/pages/index/kjdetail?id='+ goods.bargainJoinId)">继续砍价</view>
			<view class="tit_bargin_3">砍价记录</view>
			<view class="d_bargin_item" v-if="barginlog.total && barginlog.total>0">
				<view class="bargin_log" v-for="(log,index) in barginlog.records" :key="index">
					<view class="bargin_log_1"><image class="img" :src="log.avatarUrl" /></view>
					<view class="bargin_log_2">{{log.nickName}}</view>
					<view class="bargin_log_3">砍掉{{log.bargainPrice}}元</view>
				</view>
			</view>
			<view class="tit_bargin_5" @click="showBargin">查看更多 >></view>
		</view>
		
		<!-- 所有砍价记录 -->
		<uni-popup ref="showbargin" class="groupbuy_show_mask haibao" type="center" :mask-click="false">
			<view class="uni-image">
				<scroll-view class="d_bargin_item" scroll-y="true">
					<view class="bargin_log" v-for="(log,index) in barginAlllog.records" :key="index">
						<view class="bargin_log_1"><image class="img" :src="log.avatarUrl" /></view>
						<view class="bargin_log_2">{{log.nickName}}</view>
						<view class="bargin_log_3">砍掉{{log.bargainPrice}}元</view>
					</view>
				</scroll-view>
				<view class="uni-image-close" @click="cancelBargin()">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
		
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
		
		<view class="frame_groupbuy" v-if="groupbuylog.total && groupbuylog.total>0">
			<view class="e-header">
				<text class="tit">{{groupbuylog.total}}人在拼单，可直接参与</text>
				<text class="tip" @click="morePT()">查看全部</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view v-for="(item,index) in groupbuylog.records" :key="index" class="d_groupbuy_item">
				<view class="tit_avatar">
					<image class="img" :src="item.sponsorAvatarUrl"></image>
				</view>
				<view class="tit_nickname">
					{{item.sponsorNickName}}
				</view>
				<view class="d_wenan">
					<view class="tit1">还差<span>{{item.leftOpenNum}}人</span>拼成</view>
					<view class="tit2">剩余 {{item.timestr}}</view>
				</view>
				<view class="groupbuy_bt" @click="buyNow('groupbuy',{type:2,joinId:item.joinId})">去拼单</view>
			</view>
			<view class="group_buy_bottom">
				<view class="tit_avatar">
					<image class="img" :src="noticeGroupbuy.sponsorAvatarUrl"></image>
				</view>
				<view class="d_wenan">
					剩余<span>{{noticeGroupbuy.timestr}}</span>还差{{noticeGroupbuy.leftOpenNum}}人拼成
				</view>
				<view class="groupbuy_bt" @click="buyNow('groupbuy',{type:2,joinId:noticeGroupbuy.joinId})">参与拼单</view>
			</view>
		</view>
		
		<!-- 所有拼团 -->
		<uni-popup ref="showpintuan" class="groupbuy_show_mask haibao" type="center" :mask-click="false">
			<view class="uni-image">
				<scroll-view class="frame_groupbuy" scroll-y="true">
					<view v-for="(item,index) in groupbuyAlllog.records" :key="index" class="d_groupbuy_item">
						<view class="tit_avatar">
							<image class="img" :src="item.sponsorAvatarUrl"></image>
						</view>
						<view class="tit_nickname">
							{{item.sponsorNickName}}
						</view>
						<view class="d_wenan">
							<view class="tit1">还差<span>{{item.leftOpenNum}}人</span>拼成</view>
							<view class="tit2">剩余 {{item.timestr}}</view>
						</view>
						<view class="groupbuy_bt" @click="buyNow('groupbuy',{type:2,joinId:item.joinId})">去拼单</view>
					</view>
				</scroll-view>
				<view class="uni-image-close" @click="cancelPT()">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
		
		<!-- 评价 -->
		<view class="eva-section" v-if="commentTotal > 0">
			<view class="e-header">
				<text class="tit">宝贝评价（{{commentTotal}}）</text>
				<text class="tit1">好评率 100%</text>
				<text class="tip" @click="navTo('/pages/product/commentlist?id='+goods.id)">查看全部</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box">
				<image class="portrait" :src="comment.avatarUrl" mode="aspectFill"></image>
				<view class="right">
					<text class="name">{{comment.nickName}}</text>
					<text class="con">{{comment.message}}</text>
					<scroll-view class="floor-list" scroll-x v-if="comment.picUrlList.length > 0">
						<view class="scoll-wrapper">
							<view 
								v-for="(subpic, subin) in comment.picUrlList" :key="subin"
								class="floor-item"
								@click="previewImage(subin,comment.picUrlList)"
							>
								<image :src="subpic" mode="aspectFill"></image>
							</view>
						</view>
					</scroll-view>
					<view class="bot">
						<text class="attr"><!-- 购买类型：XL 红色 --></text>
						<text class="time">{{comment.createTime}}</text>
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
								@click="navTo('/pages/product/product?id='+item.id)"
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
		<view class="page-bottom uni-flex uni-row bargain-bottom" v-if="source == 'bargain'">
		    <view class="flex-item frame1" style="width: 30%;">
				<button class="p-b-btn" open-type="contact" @contact="handleContact">
					<img src="https://pic.youx365.com/kf.png" />
					<text>客服</text>
				</button>
			</view>
			<view class="flex-item d_bargin_price" style="width: 30%;">
				原价 ￥{{goods.price}}
			</view>
		    <view class="flex-item" style="width: 40%;">
				<view class="action-btn-group">
					<button v-if="goods.bargainJoinId" type="primary" class=" action-btn no-border buy-now-btn" @click="buyNow">立即抢</button>
					<button v-else type="primary" class=" action-btn no-border buy-now-btn" @click="joinBargin">参加砍价</button>
				</view>
			</view>
		</view>
		<view class="page-bottom uni-flex uni-row" v-else-if="source == 'groupbuy'">
			<view class="flex-item frame1">
				<button class="p-b-btn" open-type="contact" @contact="handleContact">
					<img src="https://pic.youx365.com/kf.png" />
					<text>客服</text>
				</button>
			</view>
			<view class="flex-item" style="width: 35%;">
				<view class="action-btn-group opacity">
					<button type="primary" class=" action-btn no-border buy-now-btn flexcolumn" @click="buyNow('groupbuy',{type:1})">
						<span>￥{{goods.originPrice}}</span>
						<div>单独购买</div>
					</button>
				</view>
			</view>
			<view class="flex-item" style="width: 35%;">
				<view class="action-btn-group">
					<button type="primary" class=" action-btn no-border buy-now-btn flexcolumn" @click="buyNow('groupbuy',{type:2})">
						<span>￥{{goods.groupbuyPrice}}</span>
						<div>发起拼单</div>
					</button>
				</view>
			</view>
		</view>
		<view class="page-bottom uni-flex uni-row" v-else-if="source == 'seckill'">
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
					<button v-if="goods.seckillStatus == 3" type="primary" class=" action-btn no-border buy-now-btn" @click="remind">{{goods.reminded==true?'已设置提醒':'到点提醒我'}}</button>
					<button v-else type="primary" class=" action-btn no-border buy-now-btn" @click="buyNow">立即购买</button>
				</view>
			</view>
		</view>
		<view class="page-bottom uni-flex uni-row" v-else>
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
						<text class="stock" v-if="goodsStockSelectd.leftStock">库存：{{goodsStockSelectd.leftStock}}{{goods.unit?goods.unit:''}}</text>
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
		
		<!-- 海报 -->
		<uni-popup ref="showimage" class="haibao" type="center" :mask-click="false">
			<view class="uni-image" v-if="template.views">
				<scroll-view class="d_frame">
					<view class="painter">
						<painter :palette="template" @imgErr="imgErr" @imgOK="onImgOK" />
					</view>
					<view class="bt" @click="saveImage">保存到手机</view>
				</scroll-view>
				<view class="uni-image-close" @click="cancel()">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uParse from '@/components/uParse/src/wxParse.vue';
	import {mapState} from 'vuex';
	import Card from './card.js';
	
	export default{
		components: {
			uParse,uniPopup,uniIcons
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				id:0,
				goods:{},
				source:'',
				
				specClass: 'none',
				specSelected:[],
				goodsStockSelectd:{},

				specList: [],
				specChildList: [],
				goodsStock:[],
				
				//推荐商品
				goodsList: [],
				
				//评论
				comment: {},
				commentTotal:0,
				
				template: {},
				
				//砍价
				barginlog:{},
				barginAlllog:{},
				
				//团购
				groupbuylog:{},
				groupbuyAlllog:{},
				noticeGroupbuy:{},
				
				//倒计时
				timer: null,
				seconds: 0, //剩余支付时间
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
			navToLogin(){
				if(!this.hasLogin){
					let url = '/pages/public/login';
					uni.navigateTo({
						url
					})
					return true;
				}
				return false;
			},
			async dataLoad(id){
				//加载商品详情
				let goods = await this.$request.ModelHome.getGoodsDetail(id,this.source);
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
				
				//加载 团购记录
				if(this.source == 'groupbuy'){
					this.$request.ModelHome.getGroupBuyLog(id,null,1,5).then(res => {
						this.groupbuylog = res;
						this.startTimeup();
						if(res.records.length>0){
							this.noticeGroupbuy = res.records[res.records.length-1];
						}
					})
				}else if(this.source == 'bargain' && goods.bargainJoinId){
					this.startTimeup();
					this.$request.ModelHome.getBargainLog(goods.bargainJoinId,1,2).then(res => {
						this.barginlog = res;
					})
				}
			},
			async buyNow(type,typedate){
				if(this.navToLogin()){return};
				let goods = this.goods;
				if(goods.realLeftStock <= 0){
					this.$api.msg('库存不足');
					return;
				}
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
				
				//类型判断
				let url = '/pages/order/createOrder?source='+this.source+'&order=' + JSON.stringify(orderProducts);
				if(type == 'groupbuy'){
					if(typedate.type == 1){ //直接购买
						url = '/pages/order/createOrder?order=' + JSON.stringify(orderProducts);
					}else if(typedate.joinId){
						url = url + '&joinId=' + typedate.joinId;
					}
				}
				
				uni.navigateTo({url: url});
			},
			addCart(){ //加入购物车
				if(this.navToLogin()){return};
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
			previewImage(index,list){
				uni.previewImage({
					current: index,
					urls: list,
					loop: true,
				})
			},
			stopPrevent(){},
			addCollect(){
				let values = {refId: this.goods.id,type:1};
				this.$request.ModelOrder.addCollect(values).then(result => {
					if(result.code == 'ok'){
						this.$api.msg('收藏成功');
						this.goods.collected = true;
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			removeCollect(){
				let values = {refId: this.goods.id,type:1};
				this.$request.ModelOrder.removeCollect(values).then(result => {
					if(result.code == 'ok'){
						this.$api.msg('取消收藏');
						this.goods.collected = false;
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			//海报接口
			initData(){
				if(!this.hasLogin){
					uni.showModal({
					    title: '请先登陆',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url: '/pages/public/login'
					            })
					        }
					    }
					});
					return;
				}
				if(!this.template.views){
					uni.showLoading({
					    title: "拼命生成中...",
					    mask: true,
					});
					this.template = new Card().palette(this.goods.coverPicUrl,this.goods.name,this.goods.originPrice,this.goods.price);
				}
				this.$refs['showimage'].open();
			},
			cancel(type) {
				this.$refs['showimage'].close()
			},
			onImgOK(e) {
			    this.imagePath = e.detail.path;
			    uni.hideLoading();
			},
			imgErr(e){
			    uni.hideLoading();
			    uni.showModal({
			        title:'提示',
			        content:"生成海报失败",
			        showCancel:false,
			    })
			    console.log(e);
			},
			saveImage() {  //长按保存
			        var _this = this;
			        uni.authorize({
			            scope:"scope.writePhotosAlbum",
			            success() {
			                uni.saveImageToPhotosAlbum({
			                    filePath: _this.imagePath,
			                    success(){
			                        uni.showModal({
			                            title:"保存成功",
			                            content:"图片已成功保存到相册，快去分享到您的圈子吧",
			                            showCancel:false
			                        })
			                    },
								fail:function(res){
									if(res.errMsg.indexOf('cancel') != -1){
									}else{
										_this.$api.msg('保存到相册失败:'+res.errMsg);
									}
								}
			                });
			            },
						fail:function(res){
							_this.$api.msg('授权失败:'+res.errMsg);
						}
			        })
			},
			countDown() {
				
				function getTimestr(lefttime){
					if(lefttime<=0){
						return '00:00:00';
					}
					let [day, hour, minute, second] = [0, 0, 0, 0]
					day = Math.floor(lefttime / (60 * 60 * 24))
					hour = Math.floor(lefttime / (60 * 60)) - day * 24
					minute = Math.floor(lefttime / 60) - day * 24 * 60 - hour * 60
					second = Math.floor(lefttime) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
					if (day < 10) {
						day = '0' + day
					}
					if (hour < 10) {
						hour = '0' + hour
					}
					if (minute < 10) {
						minute = '0' + minute
					}
					if (second < 10) {
						second = '0' + second
					}
					return hour + ':' + minute + ':' + second;
				}
				
				if(this.groupbuylog && this.groupbuylog.records && this.groupbuylog.records.length > 0){
					this.groupbuylog.records.forEach(o => {
						if(o.leftExpireSec - this.seconds > 0){
							o.timestr = getTimestr(o.leftExpireSec - this.seconds);
						}else{
							o.timestr = '00:00:00';
						}
					});
				}
				if(this.groupbuyAlllog && this.groupbuyAlllog.records && this.groupbuyAlllog.records.length > 0){
					this.groupbuyAlllog.records.forEach(o => {
						if(o.leftExpireSec - this.seconds > 0){
							o.timestr = getTimestr(o.leftExpireSec - this.seconds);
						}else{
							o.timestr = '00:00:00';
						}
					});
				}
				if(this.goods.bargainLeftSec){
					if(this.goods.bargainLeftSec - this.seconds > 0){
						this.goods.timestr = getTimestr(this.goods.bargainLeftSec - this.seconds);
					}else{
						this.goods.timestr = '00:00:00';
					}
				}
			},
			startTimeup(){
				this.seconds = 0;
				this.countDown()
				if(this.timer){
					clearInterval(this.timer);
				}
				this.timer = setInterval(() => {
					this.seconds++;
					this.countDown()
				}, 1000)
			},
			morePT(){
				this.$request.ModelHome.getGroupBuyLog(this.id,null,1,100).then(res => {
					this.groupbuyAlllog = res;
					this.startTimeup();
				})
				this.$refs['showpintuan'].open();
			},
			cancelPT(){
				this.$refs['showpintuan'].close();
			},
			showBargin(){
				this.$request.ModelHome.getBargainLog(this.goods.bargainJoinId,2,100).then(res => {
					this.barginAlllog = res;
				})
				this.$refs['showbargin'].open();
			},
			cancelBargin(){
					this.$refs['showbargin'].close();
			},
			joinBargin(){
				if(!this.hasLogin){
					uni.navigateTo({url: '/pages/public/login'})
					return;
				}
				
				let goods = this.goods;
				let productSpecId = null;
				if(goods.config && goods.config.specification && goods.config.specification == true){ //需要选择规格
					if(!this.goodsStockSelectd.id){
						this.$api.msg('请先选择规格');
						return;
					}
					productSpecId = this.goodsStockSelectd.id;
				}
				let values = {productId:goods.id,productSpecId: productSpecId,quantity:1};
				this.$request.ModelHome.joinBargin(values).then(res => {
					if(res.code == 'ok'){
						this.dataLoad(this.id);
					}else{
						this.$api.msg(res.msg);
					}
					
				})
			},
			remind(){
				if(this.goods.reminded == true){
					return;
				}
				let values = {busId:this.goods.id,busType:1};
				this.$request.ModelHome.remind(values).then(res => {
					if(res.code == 'ok'){
						this.goods.reminded = true;
						this.$api.msg('设置提醒成功');
					}else{
						this.$api.msg(res.msg);
						if(res.code == '10710702'){
							this.goods.reminded = true;
							this.$forceUpdate();
						}
					}
				});
			}
		},
		beforeDestroy() {
			if(this.timer){
				clearInterval(this.timer);
			}
		},
		onShareAppMessage() { //设置分享
			if(!this.hasLogin){
				uni.navigateTo({url: '/pages/public/login'})
				return false;
			}else{
				return {
					title: '欢迎来到社集优选',
					path: '/pages/product/product?id='+this.goods.id + '&inviteUserId=' + this.userInfo.id
				}
			}
		},
		async onLoad(options){
			if(options.inviteUserId){
				uni.setStorage({//缓存用户登陆状态
				    key: 'inviteUserId',  
				    data: options.inviteUserId  
				})
			}
			
			this.source = options.source;
			let id = options.id;
			this.id = id;
			this.dataLoad(id);
			
			//加载评论
			let values = {productId: id,pageIndex: 1,pageSize: 1};
			let result = await this.$request.ModelOrder.listComment(values);
			if(result.records && result.records.length > 0){
				this.comment = result.records[0];
				this.commentTotal = result.total;
			}
		},
	}
</script>

<style lang='scss'>
	page{
		background: #FFFFFF;
		padding-bottom: 160upx;
	}
	
	.haibao{
		/deep/ .uni-popup__wrapper-box{
			padding: 0 !important;
			background: unset !important;
			max-width: unset !important;
			max-height: unset !important;
		}
		
		.uni-popup__wrapper-box{
			padding: 0 !important;
			background: unset !important;
			max-width: unset !important;
			max-height: unset !important;
		}
		.bt{
			width:551rpx;
			height:84rpx;
			line-height:84rpx;
			background:rgba(255,68,63,1);
			border-radius:6rpx;
			margin: 0 auto;
			font-size:28rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(254,254,254,1);
			text-align: center;
		}
		.d_frame{
			width:620rpx;
			height:819rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			position: relative;
		}
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
		
		.d_sc1{
			filter: grayscale(100%);
		}
		
		.d_sc{
			position: absolute;
			bottom: 0;
			right: 5px;
			line-height: 1;
			text-align: center;
			.img2{
				width: 42rpx;
				height: 40rpx;
			}
			
			.titsc{
				font-size:24rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
			}
		}
	}
	/* 其他商品属性 */
	.tg_frame{
		height: 93rpx;
		width: 750rpx;
		background-color: #FF443F;
		display: flex;
		align-items: center;
		
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
		.bargain_desc{
			font-size:18rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
			padding-left: 40rpx;
		}
		.now_price{
			line-height: 93rpx;
			font-size: 42rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin-left: 30rpx;
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
		.d_seckill_img{
			width: 115rpx;
			height: 37rpx;
			
			.img_seckill{
				width: 100%;
				height: 100%;
			}
		}
		.kill_left{
			flex: 1;
			width: 544rpx;
			background:rgba(0,163,144,1);
			display: flex;
			align-items: center;
			padding-left: 18rpx;
		}
		
		.bargin_right{
			width: 343rpx;
			background:rgba(255,234,233,1);
			display: flex;
			align-items: center;
			height: 93rpx;
			line-height: 93rpx;
			justify-content: center;

			.tit_bargin_1{
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:rgba(255,68,63,1);
			}
			.tit_bargin_2{
				font-size:19rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
				width:26rpx;
				height:25rpx;
				line-height:25rpx;
				background:rgba(255,68,63,1);
				border-radius:2rpx;
				text-align: center;
			}
		}
		
		.kill_right{
			width: 206rpx;
			background:rgba(255,234,233,1);
			text-align: center;
			font-size:22rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(255,68,63,1);
			line-height: 93rpx;
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
		border-top: 5px solid #F2F2F2;

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
	.bargain-bottom{
		.p-b-btn{
			flex-direction: row !important;
		}
	}
	.page-bottom{
		position:fixed;
		bottom:0;
		z-index: 95;
		width: 100%;
		height: 93rpx;
		background: #EEEEEE;
		
		.frame1{
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.d_bargin_price{
			font-size:30rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(0,0,0,1);
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-left: solid 1px #D4D4D4;
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
		
		.opacity{
			opacity:0.38;
		}
		
		.action-btn-group{
			display: flex;
			height: 100%;
			overflow: hidden;
			background: #FF443F;
			margin-right: 0;
			
			.flexcolumn{
				flex-direction: column;
				line-height: 1;
			}
			
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
	
	.groupbuy_show_mask{
		.frame_groupbuy{
			width: 650rpx;
			height: 65vh;
			border-top: unset !important;
		}
		.d_bargin_item{
			width: 650rpx;
			height: 65vh;
			border-top: unset !important;
			background-color: #ffffff;
		}
	}
	
	.frame_groupbuy{
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
			border-bottom: solid 1px #EAEAEA;
			
			.tit{
				font-size:26rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:#FF443F;
			}
			.tip{
				flex: 1;
				text-align: right;
				font-size:22rpx;
				font-family:SourceHanSansCN;
				font-weight:500;
				color:#888888;
			}
			.icon-you{
				margin-left: 10upx;
				color:#888888;
			}
		}
		.d_groupbuy_item:last-child{
			border-bottom: unset !important;
		}
		.d_groupbuy_item{
			display: flex;
			align-items: center;
			padding: 10rpx 0;
			border-bottom: solid 1px #EAEAEA;
			
			.tit_avatar{
				width:53rpx;
				height:53rpx;
				border-radius:50%;
				.img{
					height: 100%;
					width: 100%;
					border-radius: 50%;
				}
			}
			.tit_nickname{
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(0,0,0,1);
				margin-left: 20rpx;
				flex: 1;
			}
			
			.groupbuy_bt{
				width:126rpx;
				height:54rpx;
				line-height:54rpx;
				background:rgba(255,68,63,1);
				border-radius:4rpx;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
				text-align: center;
				margin-left: 10rpx;
			}
			
			.d_wenan{
				.tit1{
					font-size:22rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(51,51,51,1);
					
					span{
						color: #FF443F !important;
					}
				}
				.tit2{
					font-size:22rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
			}
		}
	}
	
	.group_buy_bottom{
		position: fixed;
		bottom: 93rpx;
		width: 750rpx;
		height: 60rpx;
		background: #ffcb2b;
		padding: 0 30rpx;
		z-index: 999999;
		display: flex;
		left: 0;
		align-items: center;
		opacity: 0.8;

		.tit_avatar{
			width:36rpx;
			height:37rpx;
			border-radius:50%;
			.img{
				height: 100%;
				width: 100%;
				border-radius: 50%;
			}
		}
		
		.d_wenan{
			margin-left: 23rpx;
			font-size:22rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(0,0,0,1);
			flex: 1;
			span{
				color: #FF443F !important;
				margin: 0 10rpx 0 5rpx;
			}
		}
		.groupbuy_bt{
			width:113rpx;
			height:42rpx;
			line-height:42rpx;
			background:rgba(255,68,63,1);
			border-radius:4rpx;
			font-size:22rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: center;
			margin-left: 10rpx;
		}
	}
	
	.frame_bargin{
		border-top: 5px solid #F2F2F2;
		
		.tit_bargin_1{
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color: #000000;
			text-align: center;
			padding-top: 30rpx;
			
			span{
				color:#FF443F;
				margin: 0 10rpx;
			}
		}
		
		.line-bargin_1{
			width:609rpx;
			height:17rpx;
			background:#E7E7E7;
			border-radius:9rpx;
			margin: 40rpx auto 0;
			position: relative;
			
			.active{
				height:17rpx;
				position: absolute;
				top: 0;
				left: 0;
				border-radius:9rpx;
				background: #00A390;
			}
		}
		
		.bt_bargin_2{
			width:643rpx;
			height:92rpx;
			line-height:92rpx;
			text-align: center;
			background:rgba(255,68,63,1);
			border-radius:46rpx;
			margin: 40rpx auto;
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.tit_bargin_3{
			width:750rpx;
			height:92rpx;
			line-height:92rpx;
			text-align: center;
			background:rgba(0,163,144,1);
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
		.tit_bargin_5{
			font-size:22rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: center;
			padding: 20rpx 0 50rpx;
		}
	}
	
	.d_bargin_item{
		
		.bargin_log{
			display: flex;
			align-items: center;
			padding: 20rpx 60rpx 0;
			
			.bargin_log_1{
				width:60rpx;
				height:60rpx;
				border-radius:50%;
				.img{
					width:60rpx;
					height:60rpx;
					border-radius:50%;
				}
			}
			.bargin_log_2{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				flex: 1;
				margin-left: 30rpx;
			}
			
			.bargin_log_3{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
		}
	}
</style>
