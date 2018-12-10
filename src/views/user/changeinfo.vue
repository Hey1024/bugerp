<template>
  <div>
    <el-form ref="postForm" :model="postForm" class="form-container" style="margin: 20px">

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
        <el-col :span="2" class="text-center">
          <el-button type="success" plain @click="handleUpdate">修改</el-button>
        </el-col>
      </div>
    </el-form >
  </div>
</template>

<script>
import { updateInfo, getInfo } from '@/api/user'
export default {
  name: 'Changeinfo',
  data() {
    return {
      postForm: {
        nickname: '',
        realname: '',
        email: ''
      }
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    getinfo() {
      getInfo().then(resp => {
        if (resp.data.statuscode === 0) {
          this.postForm = resp.data
        }
      })
    },
    handleUpdate() {
      updateInfo(this.postForm).then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          this.$message.success('修改成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
