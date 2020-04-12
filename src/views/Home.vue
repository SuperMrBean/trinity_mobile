<template>
  <div class="main-wrapper home">
    <div class="header">
      <div class="header-left"></div>
      <div class="header-right">
        <div class="header-right__lang">ch</div>
        <div class="header-right__lang">en</div>
        <div class="header-right__nav"></div>
      </div>
    </div>
    <div class="nav">
      <van-collapse v-model="nav" :border="false" :accordion="true">
        <van-collapse-item title="标题1" name="1" >
          <div class="nav-item" @click="test">标题111</div>
          <van-collapse v-model="navChild" :border="false">
            <van-collapse-item title="标题1" name="1"></van-collapse-item>
          </van-collapse>
          <van-collapse v-model="navChild2" :border="false">
            <van-collapse-item title="标题1" name="1"></van-collapse-item>
          </van-collapse>
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import apiActions from '@/config/api.js'

export default {
  name: 'home',
  data () {
    return {
      nav: [],
      navChild: [],
      navChild2: []
    }
  },
  computed: {
    // vuex辅助函数
    ...mapState({
      // isApp: state => state.sdk.isApp // 与上面等价
    })
  },
  methods: {
    test () {
      console.log(123)
    }
  },
  async created () {

  },
  mounted () {
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
/deep/.van-cell{
  color:#fff;
  background-color:#15325F;
}
/deep/.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after,.van-hairline--top::after{
  border-width: 0px;;
}
/deep/.van-cell:not(:last-child)::after{
  border-width: 0px;
}
/deep/.van-collapse-item__content{
  background-color:#15325F;
  color:#fff;
}
/deep/.van-collapse-item__content{
  padding-top:0px;
  padding-bottom:0px;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-top:20px;
}
.header-left{
  width:56px;
  height:68px;
  background:url('~@/assets/images/logo.png') 0 0 no-repeat;
  background-size:100%;
  margin-left:20px;
}
.header-right{
  margin-right:20px;
}
.header-right__lang{
  display: inline-block;
  border:1px solid #E8C474;
  color:#E8C474;
  padding:6px 10px;
  border-radius:8px;
  margin-right:40px;
  align-items:flex-end;
}
.header-right__nav{
  display: inline-block;
  width:36px;
  height:32px;
  background:url('~@/assets/images/nav.png') 0 0 no-repeat;
  background-size:100%;
}
.nav{

}
.nav-item{
  padding:14px 30px;
}
</style>
