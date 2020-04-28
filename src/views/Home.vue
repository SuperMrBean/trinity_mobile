<template>
  <div class="main-wrapper home">
    <div class="header">
      <div class="header-left"></div>
      <div class="header-right">
        <div class="header-right__lang">ch</div>
        <div class="header-right__lang">en</div>
        <div :class="{'header-right__nav':!isShowNav,'header-right__nav--close':isShowNav}" @click="handleShowNav"></div>
      </div>
    </div>
    <van-swipe class="swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="(image, index) in bannerList" :key="index">
        <img class="swipe-img" v-lazy="`${baseUrl}${image.path}`" />
      </van-swipe-item>
    </van-swipe>
    <div class="title">Trinity International Kindergarten</div>
    <div class="principle">
      <div class="principle-line1">我们的使命</div>
      <div class="principle-line2">用圣心培育每一个孩子，让他们成为具有创造性，充满爱心和热情的学习者。</div>
    </div>
    <toggle>
      <div class="video">
        <div class="video-item" v-for="(item,index) in 7" :key="index" v-if="index < 4 || (index>=4 && isShowVideo)">
          <img class="video-item__img" src="@/assets/images/video.jpg" alt="">
          <div class="video-item__play"></div>
          <br>
          <span class="video-item__title">Our Chefs</span>
        </div>
      </div>
    </toggle>
    <div class="video-button" @click="handleShowVideo">
      <span class="video-button__text" >更多</span>
    </div>
    <van-popup v-model="isShowNav" position="top">
      <div class="nav" v-show="isShowNav">
        <van-collapse v-model="nav" :border="false" :accordion="true">
          <div v-for="(item,index) in titleList" :key="index">
            <div class="nav-item" v-if="item.children.length === 0" @click="handleClick(item)">{{item.name}}</div>
            <van-collapse-item v-else :title="item.name" :name="item.name">
              <van-collapse v-model="navChildren" :border="false" :accordion="true">
                <div v-for="(itemChildren,indexChildren) in item.children" :key="indexChildren">
                  <div class="nav-item" v-if="itemChildren.children.length === 0" @click="handleClick(itemChildren)">{{itemChildren.name}}</div>
                  <van-collapse-item v-else :title="itemChildren.name" :name="itemChildren.name">
                    <div class="nav-item" v-for="(intemGrandChilder,indexGrandChildren) in itemChildren.children" :key="indexGrandChildren" @click="handleClick(intemGrandChilder)">{{intemGrandChilder.name}}</div>
                  </van-collapse-item>
                </div>
              </van-collapse>
            </van-collapse-item>
          </div>
        </van-collapse>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import apiActions from '@/config/api.js'
import toggle from '@/components/Toggle.js'
export default {
  name: 'home',
  data () {
    return {
      nav: [],
      navChildren: [],
      titleList: [],
      bannerList: [],
      videoList: [],
      isShowNav: false,
      isShowVideo: false,
      baseUrl: 'http://www.boatng.cn:7002'
    }
  },
  computed: {
    // vuex辅助函数
    ...mapState({
      // isApp: state => state.sdk.isApp // 与上面等价
    })
  },
  methods: {
    async getTitle () {
      try {
        let { data } = await apiActions.basic.getTitle({ params: { is_format: 1 } })
        this.titleList = data
      } catch (error) {
        console.log(error)
      }
    },
    async getBanner () {
      try {
        let { data } = await apiActions.basic.getStatic({ params: { type: 'banner' } })
        this.bannerList = data
      } catch (error) {
        console.log(error)
      }
    },
    async getVideo () {
      try {
        let { data } = await apiActions.basic.getStatic({ params: { type: 'video' } })
        this.videoList = data
      } catch (error) {
        console.log(error)
      }
    },
    handleShowNav () {
      this.isShowNav = !this.isShowNav
    },
    handleClick (data) {
      console.log(data)
    },
    handleShowVideo () {
      this.isShowVideo = !this.isShowVideo
    }
  },
  mounted () {
    this.getTitle()
    this.getBanner()
    this.getVideo()
  },
  components: {
    toggle
  }
}
</script>
<style lang="less" scoped>
/deep/.van-cell{
  color:#fff;
  background-color:#15325F;
  padding:10px 32px;
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
/deep/.van-popup{
  background:#15325F;
}
/deep/.van-popup--top{
  top:86px;
}
.header{
  position:relative;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-top:20px;
  background:#15325F;
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
.header-right__nav--close{
  display: inline-block;
  width:36px;
  height:32px;
  background:url('~@/assets/images/nav_close.png') 0 0 no-repeat;
  background-size:100%;
}
.swipe{
  position:relative;
  margin-top:20px;
}
.swipe-img{
  width:100%;
  height:360px;
}
.title{
  position:absolute;
  top:400px;
  left:50%;
  transform: translateX(-50%);
  text-align: center;
  font-size:34px;
  font-weight: 800;
  color:#e8c473;
  width:86%;
  background:url('~@/assets/images/title_background.png') 0 0 no-repeat;
  background-size:100%;
}
.nav{
  padding-top:10px;
  padding-bottom:20px;
}
.nav-item{
  background:#15325F;
  color:#fff;
  padding:10px 32px;
  padding-top:20px;
}
.principle{
  text-align: center;
}
.principle-line1{
  display: inline-block;
  font-size:30px;
  color:#fff;
  padding-top:80px;
  font-weight: 800;
}
.principle-line2{
  display: inline-block;
  color:#fff;
  text-align: left;
  padding:0 30px;
  font-size:14px;
  padding-top:10px;
}
.video{
  display:flex;
  flex-wrap: wrap;
  padding:0 20px;
}
.video-item{
  width:338px;
  height:260px;
  margin-top:40px;
  font-size:0;
  position:relative;
}
.video-item:nth-child(even){
  margin-left:34px;
}
.video-item__img{
  width:338px;
  height:200px;
  object-fit: cover;
  border-radius: 10px;
}
.video-item__play{
  position: absolute;
  left:52%;
  transform: translateX(-50%);
  top:60px;
  width:80px;
  height:80px;
  background: url('~@/assets/images/play.png') 0 0 no-repeat;
  background-size:100%;
}
.video-item__title{
  display: inline-block;
  padding-top:10px;
  font-size:28px;
  font-weight: 800;
  color:#E8C474;
}
.video-button{
  margin-top:40px;
  text-align:center;
}
.video-button__text{
  font-size:28px;
  color:#15325F;
  background:#fff;
  padding:6px 40px;
  border-radius:40px;
}
</style>
