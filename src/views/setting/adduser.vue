<template>
  <el-form class="form-container" :model="postForm" ref="postForm">

  <div class="createPost-main-container">
    <!--<el-col :span="24" >-->
    <div style="height: 30px"></div>
    <el-form-item style="margin-bottom: 40px;" prop="title" label="昵称:">
      <el-input
        placeholder="姓名首字母"
        v-model="postForm.nickname"
        clearable :maxlength="100" style="width: 60%;">
      </el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 40px;" prop="title" label="姓名:">
      <el-input
        placeholder="请输入姓名"
        v-model="postForm.realname"
        clearable :maxlength="100" style="width: 60%;">
      </el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 40px;" prop="title" label="邮箱:">
      <el-input
        placeholder="请输入邮箱"
        v-model="postForm.email"
        clearable :maxlength="100" style="width: 60%;">
      </el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 40px;" prop="title" label="密码:">
      <el-input
        placeholder="请输入密码"
        v-model="postForm.password"
        type="password"
        clearable :maxlength="100" style="width: 60%;">
      </el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 40px;" prop="title" label="确认:">
      <el-input
        placeholder="请输入密码"
        v-model="postForm.repassword"
        type="password"
        clearable :maxlength="100" style="width: 60%;">
      </el-input>
    </el-form-item>

    <el-form-item style="margin-bottom: 40px;" label="权限：">
      <el-select v-model="postForm.role" placeholder="请选择">
        <el-option
          v-for="item in rolelist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-col :span="2" class="text-center">
      <el-button type="success" plain @click="adduser">添加</el-button>
    </el-col>
    <el-col :span="2" class="text-center">
      <el-button type="warning" plain @click="clean">清空</el-button>
    </el-col>
    <div style="margin-bottom: 30px;height: 30px"></div>
    <!--<el-form-item style="margin-bottom: 40px;" label="环境：">-->
      <!--<el-select v-model="postForm.envname" placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="item in envnames"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
    <!--</el-form-item>-->

    <!--<el-form-item style="margin-bottom: 40px;" label="类别：">-->
      <!--<el-select v-model="postForm.selectclass" placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="item in classname"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
    <!--</el-form-item>-->
  </div>
    </el-form >
</template>

<script>
import { getroles, createuser } from '@/api/setting'

export default {
  name: 'adduser',
  data() {
    return {
      postForm: {
        nickname: '',
        email: '',
        password: '',
        repassword: '',
        role: 'guest',
        realname: ''
      },
      rolelist: []
    }
  },
  created() {
    this.showroles()
  },
  methods: {
    showroles() {
      getroles().then(response => {
        const data = response.data
        const rl = data.length
        for (let i = 0; i < rl; i++) {
          const aa = {}
          aa.label = data[i]
          aa.value = data[i]
          this.rolelist.push(aa)
        }
      })
    },
    adduser() {
      const regEmail = /^.*@.+\.[A-Za-zd]{2,5}$/
      if (this.postForm.email === '') {
        this.$message({
          message: '请输入邮箱',
          type: 'error'
        })
        return
      }
      if (!regEmail.test(this.postForm.email)) {
        this.$message({
          message: '邮箱格式正确',
          type: 'error'
        })
        return
      }
      if (this.postForm.repassword !== this.postForm.password) {
        this.$message({
          message: '2次密码不对',
          type: 'error'
        })
        return
      }
      const senddata = {
        nickname: this.postForm.nickname,
        email: this.postForm.email,
        password: this.postForm.password,
        role: this.postForm.role,
        realname: this.postForm.realname
      }
      createuser(senddata).then(response => {
        if (response.data === 'fail') {
          this.$message({
            message: '添加用户失败',
            type: 'error'
          })
        }
        if (response.data === 'ok') {
          this.$message({
            message: '添加用户成功',
            type: 'success'
          })
          this.clean()
        }
      })
    },
    clean() {
      this.postForm = {
        nickname: '',
        email: '',
        password: '',
        repassword: '',
        role: 'guest'
      }
    }
  }
}
</script>

<style lang="css" >
  .form-container .createPost-main-container .el-form-item {
    padding: 0px 15px 0px 15px;
  }
</style>
