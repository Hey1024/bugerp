<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" :placeholder="$t('table.status')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="(item, index) in statuslist" :key="index" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.level" :placeholder="$t('table.level')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="(item, index) in levels" :key="index" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.project" :placeholder="$t('table.project')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item, index) in projectnames" :key="index" :label="item" :value="item"/>
      </el-select>
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column :label="$t('table.id')" align="center" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.project')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectname }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.level')" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.importance')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.importance }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.status')" align="center" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" style="width: 100px" class="filter-item" @change="changestatus(scope.row)" >
            <el-option v-for="(item, index) in statuslist" :key="index" :label="item" :value="item"/>
          </el-select>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.title')" min-width="300px" align="center">
        <template slot-scope="scope">

          <router-link :to="'/showbug/'+scope.row.id" class="link-type" align="center">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/bug/edit/'+scope.row.id">
            <el-button type="primary" size="mini" >{{ $t('list.edit') }}</el-button>
          </router-link>
          <el-button type="success" size="mini" @click="handleClose(scope.row)">{{ $t('list.close') }}</el-button>
          <el-button type="danger" size="mini" @click="handleRemove(scope.row)">{{ $t('list.remove') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,15,20, 30]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getAllBugs, closeBug, removeBug } from '@/api/bugs'
import { changeStatus } from '@/api/bugs'
import { searchMyBugs } from '@/api/search'
import waves from '@/directive/waves' // 水波纹指令
import { getProject, getStatus } from '@/api/get'

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
  name: 'ArticleList',
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
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
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
  activated() {
    this.getList()
    this.getpname()
  },
  created() {
    this.getList()
    this.getstatus()
    this.getpname()
  },
  methods: {
    getstatus() {
      getStatus().then(response => {
        if (response.data.statuscode === 0) {
          this.statuslist = response.data.statuslist
        }
      })
    },
    getpname() {
      getProject().then(response => {
        if (response.data.statuscode === 0) {
          this.projectnames = response.data.projectlist
        }
      })
    },
    handleClose(row) {
      this.$confirm('此操作将关闭bug, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeBug(row.id).then(response => {
          if (response.data.statuscode === 0) {
            console.log(response.data)
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
        if (response.data.statuscode === 0) {
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
      searchMyBugs(this.listQuery).then(resp => {
        console.log(resp.data)
      })
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
    getList() {
      this.listLoading = true
      getAllBugs(this.listQuery).then(response => {
        console.log(response.data)
        if (response.data.statuscode === 0) {
          this.list = response.data.articlelist
          this.total = response.data.articlelist.length
        }
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
