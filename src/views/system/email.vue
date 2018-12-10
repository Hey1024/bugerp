<template>
  <div>
    <el-form ref="form" label-width="120px" class="form-container" style="margin-top: 40px;" prop="title">
      <el-switch
        :active-value="email.createuser"
        :inactive-value="email.createuser"
        v-model="email.createuser"
        style="display: block;margin: 20px"
        active-color="#13ce66"
        active-text="启用创建用户通知"
        inactive-text="禁用"/>
      <el-switch
        :active-value="email.createbug"
        :inactive-value="email.createbug"
        v-model="email.createbug"
        active-color="#13ce66"
        style="display: block;margin: 20px"
        active-text="启用创建bug通知"
        inactive-text="禁用"/>
      <el-switch
        v-model="email.passbug"
        :active-value="email.passbug"
        :inactive-value="email.passbug"
        style="display: block;margin: 20px"
        active-color="#13ce66"
        active-text="启用转交bug通知"
        inactive-text="禁用"/>
      <el-form-item
        label="邮箱地址："
        clearable
        style="width: 40%;">
        <el-input v-model="email.emailaddr" type="email" placeholder="请输入邮箱地址" />
      </el-form-item>
      <el-form-item
        label="邮箱密码："
        clearable
        style="width: 40%;">
        <el-input v-model="email.password" type="password" placeholder="请输入邮箱密码" />
      </el-form-item>
      <el-form-item
        label="邮箱端口："
        clearable
        style="width: 40%;">
        <el-input v-model="email.port" type="number" placeholder="请输入邮箱端口" />
      </el-form-item>
      <el-form-item
        label="测试邮箱："
        clearable
        style="width: 40%;">
        <el-input v-model="email.to" type="email" placeholder="请输入测试邮箱" />
      </el-form-item>
      <el-button style="margin-left: 40px" type="primary" @click="handleTest">验证</el-button>
      <el-button style="margin-left: 40px" type="primary" @click="handleSave">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { testEmail, saveEmail, getEmailStatus } from '@/api/email'
export default {
  name: 'Email',
  data() {
    return {
      email: {
        emailaddr: '',
        password: '',
        port: 25,
        to: '',
        createuser: 0,
        createbug: 0,
        passbug: 0,
        id: -1
      }
    }
  },
  created() {
    this.getemail()
  },
  methods: {
    getemail() {
      getEmailStatus().then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          this.email = resp.data
        }
      })
    },
    handleTest() {
      testEmail(this.email).then(resp => {
        if (resp.data.statuscode === 0) {
          this.$message.success('发送成功')
        } else {
          this.$message.success('发送失败')
        }
      })
    },
    handleSave() {
      this.email.port = parseInt(this.email.port)
      this.email.createuser = parseInt(this.email.createuser)
      this.email.createbug = parseInt(this.email.createbug)
      this.email.passbug = parseInt(this.email.passbug)
      saveEmail(this.email).then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          this.$message.success('保存成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
