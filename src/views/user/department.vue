<template>
  <div>
    <p class="warn-content">
      增加选择可以改变bug状态的部门
    </p>
    <el-form ref="postForm" class="form-container" style="padding: 20px">
      <el-form-item prop="title" label="部门名:">
        <el-input
          v-model="groupname"
          :maxlength="100"
          placeholder="请输入部门名"
          clearable
          style="width: 30%;"/>
      </el-form-item>
      <el-checkbox-group v-model="checkList" style="padding: 20px">
        <div v-for="(status, index) in statuslist" :key="index">
          <el-checkbox :label="status"/>
        </div>
      </el-checkbox-group>
      <el-button type="success" round @click="HandlerAddGroup">添加部门</el-button>
    </el-form>
  </div>
</template>

<script>
import { getStatus } from '@/api/get'
import { addGroup } from '@/api/group'
export default {
  name: 'Group',
  data() {
    return {
      groupname: '',
      checkList: [],
      statuslist: []
    }
  },
  created() {
    this.getstatus()
  },
  methods: {
    getstatus() {
      getStatus().then(resp => {
        if (resp.data.statuscode === 0) {
          this.statuslist = resp.data.statuslist
        }
      })
    },
    HandlerAddGroup() {
      const data = {
        statuslist: this.checkList,
        groupname: this.groupname
      }
      console.log(data)
      addGroup(data).then(resp => {
        if (resp.data.statuscode === 0) {
          this.$message.success('添加成功')
        }
      })
    }
  }
}
</script>

<style scoped>
label {
  padding: 10px;
}
</style>
