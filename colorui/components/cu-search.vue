<template>
	<view>
		<view class="cu-custom cu-custom-search" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action shop-name">
					社集优选
				</view>
				<view class="input-view">
					<uni-icon type="search" size="16" color="#fff" style="height: 0px !important;line-height: 30px;" ></uni-icon>
					<input confirm-type="search" @confirm="confirm" value="" class="input" type="text" placeholder="输入搜索关键词" placeholder-style="color:#fff;font-size:13px;" />
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.cu-custom-search{
		background-color: #00A08E;
	}
	
	.cu-custom .shop-name{
		font-size: 16px !important;
		font-weight: 600 !important;
	}
	
	.cu-custom .input-view {
		width: 65%;
		display: flex;
		background-color: #2da797;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		/* margin: 7px 0; */
		line-height: 30px;
	}
	
	.cu-custom .input-view .input {
		height: 30px;
		line-height: 30px;
		/* width: 94%; */
		padding: 0 3%;
	}
	
	.cu-custom .input-view /deep/ .uni-input-form{
		height: 100%;
	}
	
	.cu-custom .input-view /deep/ .uni-input-placeholder{
		color: #ececec;
		font-size: 13px;
		font-weight: 400;
	}
</style>
