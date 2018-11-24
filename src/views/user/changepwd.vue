<template>
  <div>
    <el-form class="form-container" >
      <div style="height: 20px"/>
      <el-form-item style="margin-bottom: 40px;" label="旧密码:">
        <el-input
          v-model="oldpassword"
          :maxlength="100"
          placeholder="请输入标题"
          type="password"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="新密码:">
        <el-input
          v-model="newpassword"
          :maxlength="100"
          placeholder="请输入标题"
          type="password"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="新密码:">
        <el-input
          v-model="repassword"
          :maxlength="100"
          placeholder="请输入标题"
          type="password"
          clearable
          style="width: 60%;"/>
      </el-form-item>

      <el-col :span="2" class="text-center">
        <el-button type="success" plain @click="changepwd">修改</el-button>
      </el-col>
      <el-col :span="2" class="text-center">
        <el-button type="warning" plain @click="clean">清空</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { chpwd } from '@/api/setting'
export default {
  name: 'Changepwd',
  data() {
    return {
      oldpassword: '',
      newpassword: '',
      repassword: ''
    }
  },
  methods: {
    changepwd() {
      if (this.newpassword !== this.repassword) {
        this.$message({
          message: '新密码不一致',
          type: 'error'
        })
        return
      }
      const ch = {
        oldpassword: this.oldpassword,
        newpassword: this.newpassword
      }
      chpwd(ch).then(response => {
        if (response.data === 'ok') {
          this.$message({
            message: '修改密码成功',
            type: 'success'
          })
          this.clean()
          return
        }
        this.$message({
          message: '修改密码失败',
          type: 'error'
        })
      })
    },
    clean() {
      this.oldpassword = ''
      this.newpassword = ''
      this.repassword = ''
    }
  }
}
</script>

<style>
.el-form-item {
  margin-left: 20px;
}
</style>
