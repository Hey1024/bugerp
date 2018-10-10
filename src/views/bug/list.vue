<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.status" :placeholder="$t('table.status')">
        <el-option v-for="item,index in statuslist" :key="index" :label="item.value" :value="item.label">
        </el-option>
      </el-select>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.level" :placeholder="$t('table.level')">
        <el-option v-for="item in levels" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.project" :placeholder="$t('table.project')">
        <el-option v-for="item in  projectnames" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" :label="$t('table.id')" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" :label="$t('table.project')">
        <template slot-scope="scope">
          <span>{{scope.row.projectname}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" :label="$t('table.level')">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" :label="$t('table.importance')">
        <template slot-scope="scope">
          <span>{{scope.row.importance}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.status')" width="110">
        <template slot-scope="scope">
          <el-select  style="width: 100px" class="filter-item" v-model="scope.row.status" @change="changestatus(scope.row)" >
            <el-option v-for="item,index in statuslist" :key="index" :label="item.value" :value="item.label">
            </el-option>
          </el-select>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>

      <el-table-column min-width="300px" align="center" :label="$t('table.title')">
        <template slot-scope="scope">

          <router-link class="link-type" align="center" :to="'/showbug/'+scope.row.id">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="mini" >{{$t('list.edit')}}</el-button>
          </router-link>
          <el-button type="success" size="mini" @click="handleClose(scope.row)">{{$t('list.close')}}</el-button>
          <el-button type="danger" size="mini" @click="handleRemove(scope.row)">{{$t('list.remove')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="listQuery.page"
       :page-sizes="[10,15,20, 30]"
       :page-size="listQuery.limit"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList, gettotalcount, closeBug, removeBug } from '@/api/list'
import { changeStatus, getstatuslist } from '@/api/bugs'
import waves from '@/directive/waves' // 水波纹指令
import { getproject, getTotal } from '@/api/createarticle'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'articleList',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        level: undefined,
        project: undefined,
        title: undefined,
        status: undefined
      },
      projectnames: [],
      statuslist: [],
      levels: ['高', '中', '低']
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  activated() {
    this.getList()
    this.getpname()
  },
  created() {
    this.getList()
    this.gettotalcount()
    this.getstatus()
    this.getpname()
  },
  methods: {
    getstatus() {
      getstatuslist().then(response => {
        const tmp = response.data
        const sl = response.data.length
        for (let i = 0; i < sl; i++) {
          const aa = {}
          aa.value = tmp[i]
          aa.label = tmp[i]
          this.statuslist.push(aa)
        }
      })
    },
    getpname() {
      getproject().then(response => {
        this.projectnames = response.data
        // const arr = response.data
        // for (let i = 0; i < arr.length; i++) {
        //   const aa = {}
        //   aa.value = arr[i]
        //   aa.label = arr[i]
        //   if (arr[i] === 'all') {
        //     continue
        //   }
        //   this.projectnames.push(aa)
        // }
      })
    },
    handleClose(row) {
      this.$confirm('此操作将关闭bug, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeBug(row.id).then(response => {
          if (response.data === 'ok') {
            this.list = this.list.filter(items => {
              return items.id !== row.id
            })
            this.$message({
              message: '已关闭',
              type: 'success'
            })
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changestatus(row) {
      const param = {
        id: row.id,
        status: row.status
      }
      changeStatus(param).then(response => {
        if (response.data === 'ok') {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '操作失败',
            type: 'error'
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleRemove(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeBug(row.id).then(response => {
          if (response.data === 'ok') {
            this.$message({
              message: '已删除',
              type: 'success'
            })
            this.list = this.list.filter(items => {
              return items.id !== row.id
            })
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    gettotalcount() {
      gettotalcount().then(response => {
        this.total = parseInt(response.data)
      })
    },
    getList() {
      this.listLoading = true
      getTotal(this.listQuery).then(response => {
        this.total = response.data
      })
      fetchList(this.listQuery).then(response => {
        if (response.data.length === 0) {
          this.$notify({
            message: '没有查到数据',
            type: 'notice'
          })
          this.list = null
          this.listLoading = false
          return
        }
        if (response.data === 'fail') {
          this.$notify({
            message: '查询失败',
            type: 'error'
          })
          this.listLoading = false
          return
        }
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
