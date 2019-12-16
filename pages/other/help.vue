<template>
	<view class="container">
		<uni-collapse>
			<uni-collapse-item title="关于社集优选" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png">
				<view class="content">
					<img class="img_1" src="https://pic.youx365.com/aboutUs.png" />
					<view class="tit1">
						公司主要从事固体废弃物、污水、垃圾等处理处置服务，包括城市生活垃圾处理处置、重金属污染治理及资源化、土壤修复、污泥处理处置、工业废水处理等项目投资运营，以及环保设备销售、环境咨询服务等。公司的产品与服务主要应用于环保行业，可以为客户提供从投资、建设、技术服务、装备制造到运营管理、循环利用等全过程综合服务。  　
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="如何进行分享" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png">
				<view class="content">
					<img class="img_1" src="https://pic.youx365.com/aboutUs.png" />
					<view class="tit1">
						公司主要从事固体废弃物、污水、垃圾等处理处置服务，包括城市生活垃圾处理处置、重金属污染治理及资源化、土壤修复、污泥处理处置、工业废水处理等项目投资运营，以及环保设备销售、环境咨询服务等。公司的产品与服务主要应用于环保行业，可以为客户提供从投资、建设、技术服务、装备制造到运营管理、循环利用等全过程综合服务。  　
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="如何使用积分" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png">
				<view class="content">
					<img class="img_1" src="https://pic.youx365.com/aboutUs.png" />
					<view class="tit1">
						公司主要从事固体废弃物、污水、垃圾等处理处置服务，包括城市生活垃圾处理处置、重金属污染治理及资源化、土壤修复、污泥处理处置、工业废水处理等项目投资运营，以及环保设备销售、环境咨询服务等。公司的产品与服务主要应用于环保行业，可以为客户提供从投资、建设、技术服务、装备制造到运营管理、循环利用等全过程综合服务。  　
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="平台说明" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png">
				<view class="content">
					<img class="img_1" src="https://pic.youx365.com/aboutUs.png" />
					<view class="tit1">
						公司主要从事固体废弃物、污水、垃圾等处理处置服务，包括城市生活垃圾处理处置、重金属污染治理及资源化、土壤修复、污泥处理处置、工业废水处理等项目投资运营，以及环保设备销售、环境咨询服务等。公司的产品与服务主要应用于环保行业，可以为客户提供从投资、建设、技术服务、装备制造到运营管理、循环利用等全过程综合服务。  　
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="隐私条约" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png">
				<view class="content">
					<img class="img_1" src="https://pic.youx365.com/aboutUs.png" />
					<view class="tit1">
						公司主要从事固体废弃物、污水、垃圾等处理处置服务，包括城市生活垃圾处理处置、重金属污染治理及资源化、土壤修复、污泥处理处置、工业废水处理等项目投资运营，以及环保设备销售、环境咨询服务等。公司的产品与服务主要应用于环保行业，可以为客户提供从投资、建设、技术服务、装备制造到运营管理、循环利用等全过程综合服务。  　
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
	import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
	
	export default {
		components: {uniCollapse,uniCollapseItem},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	
	.container{
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	
	.content{
		text-align: center;
	}
	
	.img_1{
		width: 624rpx;
		height: 413rpx;
	}
	
	.tit1{
		width: 615rpx;
		margin: 50rpx auto;
		font-size:22rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(119,119,119,1);
		text-align: left;
	}
	
	/* colspan */
	.uni-collapse-cell__title{
		background-color: #FFFFFF !important;
	}
	
	/deep/ .uni-collapse-cell__title{
		background-color: #FFFFFF !important;
	}
	
	.uni-collapse:before{
		background-color:#E1E1E1 !important;
	}
	
	/deep/ .uni-collapse:before{
		background-color:#E1E1E1 !important;
	}
	
	.uni-collapse:after{
		background-color:#E1E1E1 !important;
	}
	
	/deep/ .uni-collapse:after{
		background-color:#E1E1E1 !important;
	}
	
	.uni-collapse-cell__title-img{
		width: 13rpx !important;
		height: 13rpx !important;
		border-radius: 50% !important;
	}
	
	/deep/ .uni-collapse-cell__title-img{
		width: 13rpx !important;
		height: 13rpx !important;
		border-radius: 50% !important;
	}
	
	.uni-collapse-cell__title-text{
		font-size:26rpx !important;
		font-family:Source Han Sans CN !important;
		font-weight:400 !important;
		color:rgba(51,51,51,1) !important;
	}
	
	/deep/ .uni-collapse-cell__title-text{
		font-size:26rpx !important;
		font-family:Source Han Sans CN !important;
		font-weight:400 !important;
		color:rgba(51,51,51,1) !important;
	}
</style>
