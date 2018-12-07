<template>
  <el-form ref="postForm" :model="postForm" class="form-container">

    <div class="createPost-main-container">
      <!--<el-col :span="24" >-->
      <div style="height: 30px"/>
      <el-form-item style="margin-bottom: 40px;" prop="title" label="昵称:">
        <el-input
          v-model="postForm.nickname"
          :maxlength="100"
          placeholder="姓名首字母"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" prop="title" label="姓名:">
        <el-input
          v-model="postForm.realname"
          :maxlength="100"
          placeholder="请输入姓名"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" prop="title" label="邮箱:">
        <el-input
          v-model="postForm.email"
          :maxlength="100"
          placeholder="请输入邮箱"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" prop="title" label="密码:">
        <el-input
          v-model="postForm.password"
          :maxlength="100"
          placeholder="请输入密码"
          type="password"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" prop="title" label="确认:">
        <el-input
          v-model="postForm.repassword"
          :maxlength="100"
          placeholder="请输入密码"
          type="password"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" prop="title" label="所属部门:">
        <el-select v-model="postForm.group" class="filter-item" style="width: 130px">
          <el-option v-for="(group, index) in groups" :key="index" :label="group" :value="group"/>
        </el-select>
      </el-form-item>
      <div style="margin-top: 30px;margin-bottom: 30px;padding-left: 20px">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"/>
        <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(role, index) in rolelist" :label="role" :key="index">{{ role }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-col :span="2" class="text-center">
        <el-button type="success" plain @click="adduser">添加</el-button>
      </el-col>
      <el-col :span="2" class="text-center">
        <el-button type="warning" plain @click="clean">清空</el-button>
      </el-col>
      <div style="margin-bottom: 30px;height: 30px"/>
    </div>
  </el-form >
</template>

<script>
import { createUser } from '@/api/user'
import { getRoles, getGroup } from '@/api/get'

export default {
  name: 'Adduser',
  data() {
    return {
      postForm: {
        nickname: '',
        email: '',
        password: '',
        repassword: '',
        realname: '',
        group: ''
      },
      checkAll: false,
      rolelist: [],
      checkedRoles: [],
      isIndeterminate: true,
      groups: null
    }
  },
  created() {
    this.getroles()
    this.getgroup()
  },
  methods: {
    getgroup() {
      getGroup().then(resp => {
        if (resp.data.statuscode === 0) {
          this.groups = resp.data.groups
        }
        if (this.groups.length === 0) {
          this.$message.warning('请先添加部门')
        }
      })
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.rolelist : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.rolelist.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.rolelist.length
    },
    getroles() {
      getRoles().then(response => {
        if (response.data.statuscode === 0) {
          this.rolelist = response.data.rolelist
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
      if (this.postForm.group === '') {
        this.$message({
          message: '请选择部门',
          type: 'error'
        })
        return
      }
      const senddata = {
        nickname: this.postForm.nickname,
        email: this.postForm.email,
        password: this.postForm.password,
        role: this.checkedRoles,
        realname: this.postForm.realname,
        group: this.postForm.group
      }
      createUser(senddata).then(response => {
        if (response.data.statuscode === 0) {
          this.$message({
            message: '添加用户成功',
            type: 'success'
          })
          this.clean()
        } else {
          this.$message({
            message: '添加用户失败',
            type: 'error'
          })
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
