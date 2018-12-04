<template>
  <div>

    <el-form class="form-container" >
      <div style="height: 20px"/>
      <!--<el-form-item style="margin-bottom: 40px;" label="项目名称：">-->
      <!--<el-select v-model="versionlist.projectname" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="(item, index) in projectnames"-->
      <!--:key="index"-->
      <!--:label="item"-->
      <!--:value="item"/>-->
      <!--</el-select>-->
      <!--</el-form-item>-->

      <!--<el-form-item style="margin-bottom: 40px;" label="运行环境：">-->
      <!--<el-select v-model="versionlist.runenv" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="(item, index) in runenvs"-->
      <!--:key="index"-->
      <!--:label="item"-->
      <!--:value="item"/>-->
      <!--</el-select>-->
      <!--</el-form-item>-->

      <el-form-item style="margin-bottom: 40px;" label="版本号：">
        <el-input
          v-model="versionlist.version"
          :maxlength="100"
          placeholder="请输入版本号"
          clearable
          style="width: 30%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="iphone下载地址 ：">
        <el-input
          v-model="versionlist.iphoneurl"
          :maxlength="100"
          placeholder="请输入iphone下载地址"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="非iphone下载地址:">
        <el-input
          v-model="versionlist.notiphoneurl"
          :maxlength="100"
          placeholder="请输入非iphone下载地址"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-col :span="2" class="text-center">
        <el-button type="success" plain @click="addversion">增加</el-button>
      </el-col>
      <el-col :span="2" class="text-center">
        <el-button type="warning" plain @click="clean">清空</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
// import { getProject, getEnv } from '@/api/createarticle'
import { addVersion } from '@/api/version'
export default {
  name: 'Pubversion',
  data() {
    return {
      versionlist: {
        // projectname: '',
        version: '',
        // runenv: '',
        iphoneurl: '',
        notiphoneurl: '',
        platform: ''
      },
      projectnames: [],
      runenvs: [],
      platforms: []
    }
  },
  created() {
    // this.getprojectname()
    // this.getrunenv()
    // this.getplatformlist()
  },
  methods: {
    // getprojectname() {
    //   getProject().then(response => {
    //     if (response.data.statuscode === 0) {
    //       this.projectnames = response.data.projectlist
    //     }
    //   })
    // },
    // getrunenv() {
    //   getEnv().then(response => {
    //     if (response.data.statuscode === 0) {
    //       this.runenvs = response.data.envlist
    //     }
    //   })
    // },
    // getplatformlist() {
    //   getplatform().then(response => {
    //     const data = response.data
    //     const ml = data.length
    //     for (let i = 0; i < ml; i++) {
    //       const a = {}
    //       a.value = data[i]
    //       a.label = data[i]
    //       this.platforms.push(a)
    //     }
    //   })
    // },
    clean() {
      this.versionlist = {
        projectname: '',
        version: '',
        runenv: '',
        iphoneurl: '',
        notiphoneurl: '',
        platform: ''
      }
    },
    addversion() {
      addVersion(this.versionlist).then(response => {
        if (response.data.statuscode === 1 && response.data.id !== 0) {
          this.$message.success('版本存在')
        } else if (response.data.statuscode === 0) {
          this.$message.success('添加成功')
        } else {
          this.$message.success('错误码' + response.data.statuscode)
        }
      })
    }
  }
}
</script>

<style>
  .el-form-item {
    margin-left: 20px;
  }
</style>
