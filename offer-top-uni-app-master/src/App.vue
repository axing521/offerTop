<!--
 * @Author: scg
 * @Date: 2021-08-15 15:11:53
 * @LastEditTime: 2021-08-21 23:02:21
 * @LastEditors: scg
 * @Description: 
-->
<script>
import {  
        mapMutations  
    } from 'vuex';  
    export default {  
        onLaunch: function () { 
			console.log('App Launch') 
            uni.getStorage({//获得保存在本地的用户信息  
                key: 'user',  
                success:(res) => {  
                      this.$store.state.hasLogin = true;
                } 
            });  
        },  
        methods: {  
            ...mapMutations(['login'])  
        }  
    
	,
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
    @import "./colorui/icon.css";
    @import "./colorui/main.css";
	/*每个页面公共css */
	  page {
			background-color: #f1f1f1;
		}
</style>
