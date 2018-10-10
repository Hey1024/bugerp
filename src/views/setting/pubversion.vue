<template>
  <div>

    <el-form class="form-container" >
      <div style="height: 20px"></div>
    <el-form-item style="margin-bottom: 40px;" label="项目名称：">
      <el-select v-model="versionlist.projectname" placeholder="请选择">
        <el-option
          v-for="item in projectnames"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="运行平台：">
        <el-select v-model="versionlist.platform" placeholder="请选择">
          <el-option
            v-for="item in platforms"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="运行环境：">
        <el-select v-model="versionlist.runenv" placeholder="请选择">
          <el-option
            v-for="item in runenvs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="版本号：">
        <el-input
          placeholder="请输入标题"
          v-model="versionlist.version"
          clearable :maxlength="100" style="width: 30%;">
        </el-input>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;"  label="iphone下载地址 ：">
        <el-input
          placeholder="请输入标题"
          v-model="versionlist.iphoneurl"
          clearable :maxlength="100" style="width: 60%;">
        </el-input>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;"  label="非iphone下载地址:">
        <el-input
          placeholder="请输入标题"
          v-model="versionlist.notiphoneurl"
          clearable :maxlength="100" style="width: 60%;">
        </el-input>
      </el-form-item>

      <el-col :span="2" class="text-center">
        <el-button type="success" plain @click="addversion">修改</el-button>
      </el-col>
      <el-col :span="2" class="text-center">
        <el-button type="warning" plain @click="clean">清空</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { getplatform, getproject, getenvs } from '@/api/createarticle'
import { addversion } from '@/api/version'
export default {
  name: 'pubversion',
  data() {
    return {
      versionlist: {
        projectname: '',
        version: '',
        runenv: '',
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
    this.getprojectname()
    this.getrunenv()
    this.getplatformlist()
  },
  methods: {
    getprojectname() {
      getproject().then(response => {
        const data = response.data
        const ml = data.length
        for (let i = 0; i < ml; i++) {
          if (data[i] === 'all') {
            continue
          }
          const a = {}
          a.value = data[i]
          a.label = data[i]
          this.projectnames.push(a)
        }
      })
    },
    getrunenv() {
      getenvs().then(response => {
        const data = response.data
        const ml = data.length
        for (let i = 0; i < ml; i++) {
          const a = {}
          a.value = data[i]
          a.label = data[i]
          this.runenvs.push(a)
        }
      })
    },
    getplatformlist() {
      getplatform().then(response => {
        const data = response.data
        const ml = data.length
        for (let i = 0; i < ml; i++) {
          const a = {}
          a.value = data[i]
          a.label = data[i]
          this.platforms.push(a)
        }
      })
    },
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
      addversion(this.versionlist).then(response => {
        console.log(response.data)
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
