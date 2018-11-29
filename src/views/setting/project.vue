<template>
  <div>
    <el-table
      :data="tableData"
      height="250"
      style="width: 100%">
      <el-table-column
        label="Id"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="项目名"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.projectname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updatep(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addp">添加项目名</el-button>
    <el-dialog :visible.sync="dialogFormVisible" title="项目管理">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="项目名">
          <el-input v-model="form.projectname" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectName, addProjectName, updateProjectName, deleteProjectName } from '@/api/project'
export default {
  name: 'Addproject',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        projectname: '',
        delivery: false,
        id: -1
      },
      formLabelWidth: '120px',
      tableData: []
    }
  },
  created() {
    this.getprojectname()
  },
  methods: {
    getprojectname() {
      getProjectName().then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          if (resp.data.projectlist === null) {
            this.$message.info('no data')
            return
          }
          this.tableData = resp.data.projectlist
        }
      })
    },
    addp() {
      this.form.id = -1
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      deleteProjectName(id).then(resp => {
        if (resp.data.statuscode === 0) {
          const fl = this.tableData.length
          for (let i = 0; i < fl; i++) {
            if (this.tableData[i].id === id) {
              this.tableData.splice(i, 1)
              break
            }
          }
        } else if (resp.data.statuscode === 500) {
          this.$message.warning('这个项目存在bug，请先删除')
        }
      })
    },
    updatep(row) {
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.projectname = row.projectname
    },
    confirm() {
      this.dialogFormVisible = false
      console.log(this.form)
      if (this.form.id === -1) {
        addProjectName(this.form.projectname).then(resp => {
          if (resp.data.statuscode === 0) {
            this.tableData.push({
              id: resp.data.id,
              projectname: this.form.projectname
            })
          }
        })
      } else {
        updateProjectName(this.form).then(resp => {
          if (resp.data.statuscode === 0) {
            const fl = this.tableData.length
            for (let i = 0; i < fl; i++) {
              if (this.tableData[i].id === this.form.id) {
                this.tableData[i].projectname = this.form.projectname
                break
              }
            }
          }
        })
      }
    },
    cancel() {
      this.dialogFormVisible = false
      this.form.name = ''
      this.form.id = -1
    }
  }
}
</script>

<style scoped>

</style>
