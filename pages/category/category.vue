<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view @click="navToList(titem.id,titem.name)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.picture"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				currentId: 1,
				flist: [],
				slist: [],oslist:[],
				tlist: [],otlist:[],
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			async loadData(){
				let catall = await this.$request.ModelHome.getCategoryAll();
				this.currentId = catall[0].id;
				catall.forEach(flist => {
					//一级分类
					this.flist.push({id: flist.id,name: flist.name});
					var index = 1;
					Object.keys(flist.subItems).forEach(slist => {
						let slistid = flist.id +'-' + index;
						this.oslist.push({id: slistid,pid: flist.id,name: slist});
						index ++;
						
						flist.subItems[slist].forEach(tlist => {
							this.otlist.push({id: tlist.id,pid: slistid,ppid: flist.id,name: tlist.name,picture: tlist.picUrl});
						})
					});
				}),
				this.filter();
			},
			//一级分类点击
			tabtap(item){
				this.currentId = item.id;
				this.filter();
			},
			filter(){
				this.slist = this.oslist.filter(item => item.pid == this.currentId);
				this.tlist = this.otlist.filter(item => item.ppid == this.currentId);
			},
			navToList(id,name){
				uni.navigateTo({
					url: `/pages/product/list?id=${id}&name=${name}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: #00A390;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: #00A390;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
