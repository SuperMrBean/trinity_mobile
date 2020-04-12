<template>
  <div @click="()=>{}" @touchstart="()=>{}" id="app">
    <transition appear mode="out-in" name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

  },
  components: {
  }
}
</script>
<style lang="less">
// 第三方库样式在此引用，以防构建后样式的覆盖顺序错乱
// @import '~animate.css/animate.css';

@import './assets/less/lib-reset.less';
@import './assets/less/lib-ui.less';
@import './assets/less/style.less';
</style>
