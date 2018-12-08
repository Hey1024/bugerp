<template>
  <div>
    <p class="warn-content">
      增加选择可以改变bug状态的部门
    </p>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;padding: 10px">

      <el-table-column :label="$t('table.id')" align="center" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.project')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.statusperm')" width="500" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.permlist }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('list.edit') }}</el-button>
          <el-button type="success" size="mini" @click="handleRemove(scope.row)">{{ $t('list.remove') }}</el-button>
          <!--<el-button type="danger" size="mini" @click="handleRemove(scope.row)">{{ $t('list.remove') }}</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin: 20px" type="success" size="mini" @click="handleAdd">添加部门</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="提示"
      width="30%">
      <el-form ref="postForm" class="form-container" style="padding: 20px">
        <el-form-item prop="title" label="部门名:">
          <el-input
            v-model="departmentname"
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
        <!--<el-button type="success" round @click="HandlerAddGroup">添加部门</el-button>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandlerAddGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStatus } from '@/api/get'
import { addDepartment, editDepartment, removeDepartment } from '@/api/department'
import { departmentList } from '@/api/department'
export default {
  name: 'Group',
  data() {
    return {
      departmentname: '',
      checkList: [],
      statuslist: [],
      dialogVisible: false,
      listLoading: false,
      list: null,
      id: -1
    }
  },
  created() {
    this.getstatus()
    this.getlist()
  },
  methods: {
    handleEdit(row) {
      this.dialogVisible = true
      this.departmentname = row.department
      this.id = parseInt(row.id)
      this.checkList = row.permlist
    },
    getlist() {
      departmentList().then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          this.list = resp.data.departmentlist
        }
      })
    },
    handleAdd() {
      this.dialogVisible = true
      this.departmentname = ''
      this.checkList = []
    },
    handleRemove(row) {
      this.$confirm('确认关闭？')
        .then(_ => {
          const data = {
            id: row.id,
            statuslist: row.permlist,
            department: row.department
          }
          removeDepartment(data).then(resp => {
            if (resp.data.statuscode === 500) {
              this.$message.warning('删除失败，此部门有用户在使用')
              return
            }
            if (resp.data.statuscode === 0) {
              this.$message.success('删除成功')
              return
            }
            this.$message.success('删除成功,错误码：' + resp.data.statuscode)
          })
        })
        .catch(_ => {})
    },
    getstatus() {
      getStatus().then(resp => {
        if (resp.data.statuscode === 0) {
          this.statuslist = resp.data.statuslist
        }
      })
    },
    HandlerAddGroup() {
      if (this.id === -1) {
        const data = {
          statuslist: this.checkList,
          department: this.departmentname
        }
        addDepartment(data).then(resp => {
          console.log(resp.data)
          if (resp.data.statuscode === 0) {
            this.list.push({
              id: resp.data.id,
              department: this.departmentname,
              permlist: this.checkList
            })
            this.$message.success('添加成功')
          }
        })
      } else {
        const data = {
          id: this.id,
          statuslist: this.checkList,
          department: this.departmentname
        }
        editDepartment(data).then(resp => {
          if (resp.data.statuscode === 0) {
            const l = this.list.length
            for (let i = 0; i < l; i++) {
              if (this.list[i].id === this.id) {
                this.list[i].department = this.departmentname
                this.list[i].permlist = this.checkList
              }
            }
            this.$message.success('修改成功')
          }
        })
      }

      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
label {
  padding: 10px;
}
</style>
