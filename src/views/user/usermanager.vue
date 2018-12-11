<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">-->
      <!--</el-input>-->
      <!--<el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">-->
      <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">-->
      <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>-->
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="userlist"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:350px;">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.realname')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column min-width="150px" align="center" :label="$t('table.title')">-->
      <!--<template slot-scope="scope">-->
      <!--<router-link class="link-type" :to="'/components/back-to-top/'+scope.row.id">-->
      <!--<span class="link-type" >{{scope.row.title}}</span>-->
      <!--</router-link>-->
      <!--&lt;!&ndash;<el-tag>{{scope.row.type | typeFilter}}</el-tag>&ndash;&gt;-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.nickname')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
      <!--<template slot-scope="scope">-->
      <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.role')" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <!--<el-table-column width="80px" align="center" :label="$t('table.importance')">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scope.row.importance}}</span>-->
      <!--&lt;!&ndash;<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>&ndash;&gt;-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
      <!--<span v-else>0</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.email')" class-name="status-col" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleResetPwd(scope.row)">{{ $t('table.changepassword') }}</el-button>
          <!--<el-button size="mini" type="success" :disabled="scope.row.disable" @click="handleModifyStatus(scope.row)">{{ scope.row.action }}-->
          <!--</el-button>-->
          <!--v-if="scope.row.status!='published'"-->
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}-->
          <!--</el-button>-->
          <el-button size="mini" type="danger" @click="handlePermission(scope.row)">{{ $t('table.updatepermission') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleRemove(scope.row)">{{ $t('table.remove') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="提示"
      width="30%">
      <el-form ref="postForm" class="form-container" style="padding: 20px">
        <el-checkbox-group v-model="checkroles" style="padding: 20px">
          <div v-for="(status, index) in rolelist" :key="index" style="margin: 5px;">
            <el-checkbox :label="status"/>
          </div>
        </el-checkbox-group>
        <!--<el-button type="success" round @click="HandlerAddGroup">添加部门</el-button>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandlerUpdateRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!--<div class="pagination-container">-->
    <!--<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">-->
    <!--</el-pagination>-->
    <!--</div>-->

    <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">-->
    <!--<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.type')" prop="type">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-select class="filter-item" v-model="temp.type" placeholder="Please select">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">&ndash;&gt;-->
    <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.date')" prop="timestamp">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">&ndash;&gt;-->
    <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.title')" prop="title">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input v-model="temp.title"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.status')">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-select class="filter-item" v-model="temp.status" placeholder="Please select">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-option v-for="(item, index) in  statusOptions" :key="index" :label="item" :value="item">&ndash;&gt;-->
    <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.importance')">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='5'></el-rate>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--<el-form-item style="margin-bottom: 40px;" label="任务给：">-->
    <!--<el-select-->
    <!--v-model="temp.selectusers"-->
    <!--multiple-->
    <!--filterable-->
    <!--allow-create-->
    <!--default-first-option-->
    <!--placeholder="请选择指定的用户">-->
    <!--<el-option-->
    <!--v-for="(item, index) in users"-->
    <!--:key="index"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.reason')">-->
    <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>-->
    <!--&lt;!&ndash;<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>&ndash;&gt;-->
    <!--</div>-->
    <!--</el-dialog>-->

    <!--<el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">-->
    <!--<el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
    <!--<el-table-column prop="key" label="Channel"> </el-table-column>-->
    <!--<el-table-column prop="pv" label="Pv"> </el-table-column>-->
    <!--</el-table>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
import { userList, resetPwd, updateRoles, userRemove } from '@/api/user'
import { getRoles, getThisRole } from '@/api/get'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Usermanager',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      uid: -1,
      rolelist: [],
      checkroles: [],
      dialogVisible: false,
      // users: [],
      tableKey: 0,
      userlist: null,
      admin: false,
      // total: null,
      listLoading: false,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }]
    }
  },
  activated() {
    this.getuserList()
  },
  created() {
    this.getuserList()
    this.getroles()
  },
  methods: {
    getroles() {
      getRoles().then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          this.rolelist = resp.data.rolelist
        }
      })
    },
    HandlerUpdateRoles() {
      const data = {
        id: this.uid,
        rolelist: this.checkroles
      }
      updateRoles(data).then(resp => {
        if (resp.data.statuscode === 0) {
          const l = this.userlist.length
          for (let i = 0; i < l; i++) {
            if (this.userlist[i].id === this.uid) {
              this.userlist[i].role = resp.data.rolestring
            }
          }
          this.$message.success('修改成功')
        }
      })
      this.dialogVisible = false
    },
    handleClose() {
      this.dialogVisible = false
    },
    getuserList() {
      userList().then(resp => {
        if (resp.data.statuscode === 0) {
          this.userlist = resp.data.userlist
          console.log(this.userlist)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handlePermission(row) {
      this.uid = parseInt(row.id)
      getThisRole(this.uid).then(resp => {
        if (resp.data.statuscode === 0) {
          this.checkroles = resp.data.rolelist
          this.dialogVisible = true
        } else {
          this.$message.error('Network error')
          return
        }
      })

      // this.resetTemp()
      // this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleRemove(row) {
      userRemove(row.id).then(resp => {
        if (resp.data.statuscode === 600) {
          this.$message.warning('这个用户有bug，请先移除')
          return
        }
        if (resp.data.statuscode === 0) {
          this.$message.warning('删除成功')
          const l = this.userlist.length
          for (let i = 1; i < l; i++) {
            if (this.userlist[i].id === row.id) {
              this.userlist.splice(i, 1)
            }
          }
          return
        }
        this.$message.warning('删除失败')
      })
    },
    handleResetPwd(row) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const data = {
          id: row.id,
          newpassword: value
        }
        resetPwd(data).then(resp => {
          if (resp.data.statuscode === 0) {
            this.$message({
              type: 'success',
              message: '你的密码是: ' + value
            })
            return
          }
          this.$message({
            message: '密码重置失败',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>
