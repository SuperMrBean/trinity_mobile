<template>
  <div class="main-wrapper home">
    <div class="header">
      <div class="header-left"></div>
      <div class="header-right">
        <div class="header-right__lang" @click="handleChangeLanguage('ch')">ch</div>
        <div class="header-right__lang" @click="handleChangeLanguage('en')">en</div>
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
        <div class="video-item" v-for="(item,index) in videoList" :key="index" v-if="index < 4 || (index>=4 && isShowVideo)">
          <img class="video-item__img" :src="`${baseUrl}${item.path}`" alt="">
          <div class="video-item__play" @click="handlePlay(item)"></div>
          <br>
          <span class="video-item__title">{{item.video_title}}</span>
        </div>
      </div>
    </toggle>
    <div class="video-button" @click="handleShowVideo">
      <span class="video-button__text" >{{isShowVideo ? '收起' : '更多'}}</span>
    </div>
    <div class="introduction">
      <img class="introduction__img" src="@/assets/images/director.png" alt="">
      <div class="introduction-main">
        <div class="introductin-main__line1">Elaine Whelen</div>
        <div class="introductin-main__line2">Director of Education</div>
        <div class="introductin-main__line3">Ms. Whelen是圣心国际幼稚园的创校校长。她有30多年国际教育的经验，是华南最知名的国际教育者之一。在担任广州裕达隆国际学校校长（2007-2014）和爱莎国际学校创校校长(2014-2017)之前，她是伦敦国际学校校长(2001-2005)和乌干达Kabira国际学校校长(2005-2007)。</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-map">
        <img class="footer-map__img" src="@/assets/images/map.png" alt="">
      </div>
      <div class="footer-title">联系我们</div>
      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <div class="footer-bottom__line">
            <div class="footer-bottom__line--address"></div>
            <div class="footer-bottom__line--text">广州市天河区珠江新城花城大道663号</div>
          </div>
          <div class="footer-bottom__line">
            <div class="footer-bottom__line--tel"></div>
            <div class="footer-bottom__line--text">+86(20)8558 3287</div>
          </div>
          <div class="footer-bottom__line">
            <div class="footer-bottom__line--web"></div>
            <div class="footer-bottom__line--text">www.trinitygz.com</div>
          </div>
        </div>
        <div class="footer-bottom-right">
          <div class="footer-bottom-right__code"></div>
          <span class="footer-bottom-right__tips">微信扫描二维码关注</span>
        </div>
      </div>
      <div class="footer-backup">
        粤ICP备05003387号 Powered by XOOPS!
      </div>
    </div>
    <van-popup v-model="isShowNav" position="top">
      <div class="nav" v-show="isShowNav">
        <van-collapse v-model="nav" :border="false" :accordion="true">
          <div v-for="(item,index) in titleList" :key="index" v-if="!item.is_deleted">
            <div class="nav-item" v-if="item.children.length === 0" @click="handleClick(item)">{{item.name}}</div>
            <van-collapse-item v-else :title="item.name" :name="item.name">
              <van-collapse v-model="navChildren" :border="false" :accordion="true">
                <div v-for="(itemChildren,indexChildren) in item.children" :key="indexChildren" v-if="!item.is_deleted">
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
    <transition name="fade">
      <div class="mask" v-show="video.isShow">
        <div class="close" @click="handleClose"></div>
        <video class="player" controls="" :data-src="video.src" :src="video.src"></video>
      </div>
    </transition>
  </div>
</template>

<script>
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
      baseUrl: process.env.VUE_APP_BUILD_URL,
      video: {
        isShow: false,
        src: ''
      }
    }
  },
  computed: {
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
    handleChangeLanguage (type) {
      if (type === 'ch') {
        this.$router.push({ name: 'home' })
      } else if (type === 'en') {
        this.$router.push({ name: 'home_en' })
      }
    },
    handleShowNav () {
      this.isShowNav = !this.isShowNav
    },
    handleClick (data) {
      if (data.name === '首页') {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'detail', query: { id: data.article_id, title: data.name } })
      }
      this.isShowNav = false
    },
    handleShowVideo () {
      this.isShowVideo = !this.isShowVideo
    },
    handlePlay (data) {
      this.video.isShow = true
      this.video.src = `${this.baseUrl}${data.video_path}`
    },
    handleClose () {
      this.video.isShow = false
      this.video.src = ''
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
  font-size:28px;
  padding-top:10px;
}
.video{
  display:flex;
  flex-wrap: wrap;
  padding:0 20px;
  margin-top:40px;
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
  margin-top:30px;
  text-align:center;
}
.video-button__text{
  font-size:28px;
  color:#15325F;
  background:#fff;
  padding:6px 40px;
  border-radius:40px;
}
.mask{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.74);
  position: fixed;
  top:0;
  left:0;
  bottom: 0;
  right:0;
  z-index:9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player{
  width:800px;
  max-height:500px;
}
.close{
  position: absolute;
  width:40px;
  height:40px;
  background:url('~@/assets/images/close.png') 0 0 no-repeat;
  background-size:100%;
  top:360px;
  right:40px;
  cursor: pointer;
}
.introduction{
  margin-top:100px;
  font-size:0;
  text-align:center;
}
.introduction__img{
  width:300px;
  height:300px;
}
.introductin-main__line1{
  margin-top:20px;
  font-size:36px;
  font-weight:800;
  color:#fff;
}
.introductin-main__line2{
  font-size:24px;
  color:#fff;
}
.introductin-main__line3{
  margin:0 auto;
  margin-top:40px;
  padding:0 40px;
  font-size:24px;
  color:#fff;
  text-align: justify;
  line-height:40px;
}
.footer{
  margin-top:100px
}
.footer-map{
  padding:0 40px;
}
.footer-map__img{
  width:100%;
}
.footer-title{
  font-size:32px;
  color:#fff;
  margin-top:40px;
  padding-left:40px;
}
.footer-bottom{
  padding:40px 40px;
  display:flex;
}
.footer-bottom-left{
  margin-top:10px;
}
.footer-bottom__line{
  display:flex;
  align-items:center;
  margin-bottom:30px;
}
.footer-bottom__line--address{
  display:inline-block;
  width:33px;
  height:36px;
  background:url('~@/assets/images/address.png') 0 0 no-repeat;
  background-size:100%;
}
.footer-bottom__line--tel{
  display:inline-block;
  width:33px;
  height:36px;
  background:url('~@/assets/images/tel.png') 0 0 no-repeat;
  background-size:100%;
}
.footer-bottom__line--web{
  display:inline-block;
  width:33px;
  height:36px;
  background:url('~@/assets/images/web.png') 0 0 no-repeat;
  background-size:100%;
}
.footer-bottom__line--text{
  display:inline-block;
  color:#fff;
  font-size:24px;
  margin-left:10px;
}
.footer-bottom-right{
  font-size:0;
  text-align:center;
}
.footer-bottom-right__code{
  width:140px;
  height:140px;
  background:url('~@/assets/images/qrcode.png') 0 0 no-repeat;
  background-size:100%;
  margin:0 auto;
}
.footer-bottom-right__tips{
  display:inline-block;
  font-size:20px;
  color:#fff;
  margin-top:20px;
}
.footer-backup{
  font-size:20px;
  color:#ccc;
  text-align: center;
  padding-bottom:100px;
}
</style>
