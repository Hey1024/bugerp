<template>
  <div id="head">
    <el-button type="primary" @click="toggleShow">设置头像</el-button>
    <my-upload
      :params="params"
      :headers="headers"
      :url="url"
      v-model="show"
      field="upload"
      method="POST"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"/>
    <img :src="imgDataUrl">
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import g from '@/config/config'
import { getToken } from '@/utils/auth'
export default {
  name: 'HeadImg',
  components: {
    myUpload
  },
  data() {
    return {
      show: false,
      imgname: 'head',
      url: g.headImgUrl,
      params: {
        token: getToken(),
        name: 'avatar'
      },
      headers: {
        smail: '*_~',
        'X-Token': getToken()
      },
      imgDataUrl: ''
    }
  },
  created() {
    this.checktoken()
  },
  methods: {
    checktoken() {
      if (getToken() === '') {
        this.$router.push('/login')
      }
    },
    toggleShow() {
      this.show = !this.show
      this.imgname = (new Date()).valueOf().toString()
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      // this.$store.dispatch('ChangeHeadImg', jsonData.url).then(() => {
      //   this.loading = false
      //   // this.$router.push({ path: this.redirect || '/' })
      // }).catch(() => {
      //   this.loading = false
      // })
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}
</script>

<style scoped>

</style>
