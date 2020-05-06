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
    <div class="main">
      <div class="main__title">
        {{title}}
      </div>
      <div class="main__text" v-html="content"></div>
    </div>
    <div class="footer">
      <div class="footer-map">
        <img class="footer-map__img" src="@/assets/images/map.png" alt="">
      </div>
      <div class="footer-title">Contact us</div>
      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <div class="footer-bottom__line">
            <div class="footer-bottom__line--address"></div>
            <div class="footer-bottom__line--text">No. 663 Hua Cheng Da Dao,Zhu Jiang New Town, TIanhe District, Guangzhou</div>
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
          <span class="footer-bottom-right__tips">Scan our QR code and follow us on WeChat</span>
        </div>
      </div>
      <div class="footer-backup">
        粤ICP备05003387号 Powered by XOOPS!
      </div>
    </div>
    <van-popup v-model="isShowNav" position="top">
      <div class="nav" v-show="isShowNav">
        <van-collapse v-model="nav" :border="false" :accordion="true">
          <div v-for="(item,index) in titleList" :key="index">
            <div class="nav-item" v-if="item.children.length === 0" @click="handleClick(item)">{{item.english_name}}</div>
            <van-collapse-item v-else :title="item.english_name" :name="item.english_name">
              <van-collapse v-model="navChildren" :border="false" :accordion="true">
                <div v-for="(itemChildren,indexChildren) in item.children" :key="indexChildren">
                  <div class="nav-item" v-if="itemChildren.children.length === 0" @click="handleClick(itemChildren)">{{itemChildren.english_name}}</div>
                  <van-collapse-item v-else :title="itemChildren.english_name" :name="itemChildren.english_name">
                    <div class="nav-item" v-for="(intemGrandChilder,indexGrandChildren) in itemChildren.children" :key="indexGrandChildren" @click="handleClick(intemGrandChilder)">{{intemGrandChilder.english_name}}</div>
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
import apiActions from '@/config/api.js'
import axios from 'axios'
export default {
  name: 'detail',
  data () {
    return {
      id: null,
      title: null,
      content: null,
      nav: [],
      navChildren: [],
      titleList: [],
      bannerList: [],
      isShowNav: false,
      baseUrl: 'http://api.trinitygz.com',
      video: {
        isShow: false,
        src: ''
      }
    }
  },
  computed: {

  },
  watch: {
    $route () {
      this.id = this.$route.query.id
      this.title = this.$route.query.title
      this.getArticle()
      this.getBanner()
    }
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
    async getArticle () {
      try {
        let data = await axios.get(`/api/v1/article/${this.id}`)
        this.content = data.data.data.english_content
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
      if (data.english_name === 'Home') {
        this.$router.push({ name: 'home_en' })
      } else {
        this.$router.push({ name: 'detail_en', query: { id: data.article_id, title: data.english_name } })
      }
      this.isShowNav = false
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = this.$route.query.title
    this.getTitle()
    this.getArticle()
    this.getBanner()
  },
  components: {
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
.main{
  width:100%;
  background:#fff;
  padding:40px;
  margin-top:-22px;
}
.main__title{
  color:#15325F;
  font-size:44px;
  text-align: center;
  font-weight: 800;
}
.main__text{
  text-align: left;
  /deep/img{
    width:100%;
  }
  /deep/p{
    font-size:1rem;
    line-height: 1.5;
  }
  /deep/.ql-size-small{
    font-size:0.75rem;
  }
  /deep/.ql-size-large{
    font-size:1.5rem;
  }
  /deep/.ql-size-huge{
    font-size:2.5rem;
  }
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
