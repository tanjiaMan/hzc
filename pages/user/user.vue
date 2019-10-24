<template>  
    <view>
		<user-vip v-if="userInfo && userInfo.userType == 2" ref="uservip"></user-vip>
		<user-normal v-else ref="usernomal"></user-normal>
	</view>  
</template>  
<script>
	
	import userNormal from "./userNormal.vue";
	import userVip from "./userVip.vue";
	import {mapMutations,mapState} from 'vuex';
	
    export default {
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			userNormal,userVip
		},
		data(){
			return {
				
			}
		},
		onLoad(){
			if(this.$refs.uservip){
				this.$refs.uservip.load();
			}
			if(this.$refs.usernomal){
				this.$refs.usernomal.load();
			}
		},
		onShow(){
			if(this.$refs.uservip){
				this.$refs.uservip.show();
			}
			if(this.$refs.usernomal){
				this.$refs.usernomal.show();
			}
		},
        methods: {
			
        }  
    }  
</script>  
<style lang='scss'>
	
</style>