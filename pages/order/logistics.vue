<template>
	<view class="container">
		<view v-if="options.length == 0" class="no-content">暂无物流信息</view>
		<uni-steps :options="options" direction="column" :active="active" active-color="#00A491"></uni-steps>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	
	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				list:[],
				active:1,
				options:[],
			}
		},
		onLoad(option){
			let orderDetailId = option.orderDetailId;
			this.$request.ModelOrder.getLogistics(orderDetailId).then(result => {
				this.active = result.length;
				result.map(item => {
					this.options.push({
						title: item.time,
						desc: item.context
					})
				})
			});
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.container{
		min-height: 100vh;
		background-color: #FFFFFF;
		padding: 40rpx;
	}
	
	.no-content{
		font-size: 30rpx;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
