<template>
	<view class="container">
		<view class="header uni-flex uni-row">
			<view class="title flex-item">{{title}}</view>
			<view class="d-img flex-item">
				<img class="img" style="margin-right: 31rpx;" src="https://pic.youx365.com/article-sc.png" />
				<img class="img" src="https://pic.youx365.com/article-zf.png" />
			</view>
		</view>
		<image class="main-img" mode="widthFix" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90" />
		<text class="main-content">
			6月20日，在朝鲜人民欢快的口号和热情的笑容中，中共中央总书记、国家主席习近平正式开始十八大以来朝鲜首访，15个月来与朝鲜最高领导人金正恩的第五次见面敦交隆谊史页新，山水相连倍相亲。时隔14年中国党和国家最高领导人再次访问朝鲜，将中朝友谊推上新高潮为中朝传统友谊赋予新内涵中朝之间的深厚友情成长于共同反对外来侵略、争取国家独立和民族解放的斗争中，发展于开展社会主义革命和建设事业的伟大进程中，历久弥坚，经岁愈醇。”习近平在署名文章中这样强调。“中方支持推进半岛问题政治解决进程，为解决问题积累和创造条件。中方愿为朝方解决自身合理安全和发展关切提供力所能及的帮助，愿同朝方及有关各方加强协调和配合，为实现半岛无核化和地区长治久安发挥积极建设性作用。”在会谈中，习近平再作强调。只要高举和平对话旗帜，地区和平稳定的光明前景可期继承传统友谊，面向光明未来，中朝友谊的“新篇章”必将翻开灿烂新页，中朝友谊这棵参天大树一定会枝繁叶茂、万古长青
		</text>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad(e) {
			this.title = e.title || '';
		}
	}
</script>
<style lang='scss'>
	page{
		background-color: #FFFFFF;
	}
	
	.container{
		width: 710rpx;
		margin: 0 auto;
	}
	
	.header{
		margin-top: 40rpx;
		
		.title{
			width: 510rpx;
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
		}
		
		.d-img{
			width: 200rpx;
			text-align: right;
			
			.img{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	
	.main-img{
		width: 100%;
		margin-top: 50rpx;
		margin-bottom: 70rpx;
	}
	
	.main-content{
		font-size:22rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(82,82,82,1);
	}
</style>
