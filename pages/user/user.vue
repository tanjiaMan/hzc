<template>  
    <view>
		<!-- <user-normal ref="usernomal"></user-normal> -->
		<user-vip ref="uservip"></user-vip>
	</view>  
</template>  
<script>
	
	import userNormal from "./userNormal.vue";
	import userVip from "./userVip.vue";
	
    export default {
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
        computed: {
			
		},
        methods: {
			
        }  
    }  
</script>  
<style lang='scss'>
	
</style>