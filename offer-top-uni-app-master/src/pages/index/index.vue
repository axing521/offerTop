<template>
	<view>
    <skeleton
  :loading="loading"
  :imgTitle="skeleton1.imgTitle"
>
		<recommend></recommend>
		</skeleton>
    <skeleton
    :loading="loading"
    :showAvatar="skeleton2.showAvatar"
  :nameRow="skeleton2.nameRow"
  :avatarSize="skeleton2.avatarSize"
  :avatarShape="skeleton2.avatarShape"
  flexType="center"
>
		<record></record>
		<choicenav></choicenav>
		</skeleton>
    <skeleton
      :loading="loading"
      :avatarSize="skeleton3.avatarSize"
      :nameRow="3"
      avatarShape="square"
      flexType="space-between"
>
		<choicenav></choicenav>
		</skeleton>
    <skeleton
      :loading="loading"
      :avatarSize="skeleton3.avatarSize"
      :nameRow="3"
      avatarShape="square"
      flexType="space-between"
>
		</skeleton>
	</view>
</template>

<script>
// import login from "../login/login.vue"
import Skeleton from '../../components/J-skeleton/J-skeleton.vue'
import recommend from "./components/recommend"
import record from "./components/record.vue"
import choicenav from "./components/choice-nav.vue"
import { mapState} from 'vuex';
export default {
  data () {
    return {
		loading: true,
      skeleton1 : {
        showTitle: true,
        imgTitle:true
      },
      skeleton2:{
        showAvatar:true,
        nameRow:1,
        avatarSize:'120px',
        avatarShape:'round'
      },
      skeleton3:{
        avatarSize:'100px'
      }
    }
  },
  created() {
    this.reloadData()
  },
  mounted(){
	
  },
  methods: {
    reloadData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
  },
  computed: mapState(['hasLogin']),
  components: {
	//   login,
    recommend,
	record,
	choicenav,
  Skeleton
  }
}
</script>

<style>
</style>
