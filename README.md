### 简介
  一个开源的bug管理系统，后面还会添加写需求文档，文件存储，接口文档功能

文档地址： https://www.hyahm.com/article/257  

### 展示页面： 
   [bugarp](http://bug.hyahm.com "bugarp")
   
###  正在进行  
   增加过滤的状态

### 版本更新内容   
   

### 项目优势  
 1， 部署简单,使用简单    
 2， 因为后端是go语言写的，跨平台，速度快（虽然这个没什么卵用的样子）  
 3， vue平台用的vue-element-admin框架上写的  
 4， 有需求就有更新  
 5， 永久开源  
 6， 后期后端代码会开源  
 7， 会有专门的接口文档，方便适应各种后端语言  
 8， 问题反馈迅速，作者不是程序员，不需要加班加点敲公司的代码  
 9， 开放源代码，可以自己二次开发
 
###   功能完成  
  1， 增加bug，改变bug状态，转交bug  
  2,  显示bug列表,搜索、分页  
  3， 用户创建及其操作  
  4， 上传个人头像  
  5， 添加部门  
  6, 增加缓存机制   
  7, 增加邮件通知功能  
  8, 增加admin用户的信息重置接口  
   admin用户有且只有一个，注册admin账户建议直接操作数据库，然后修改密码即可
   如果忘记admin的密码，可以执行下面命令重置密码，如下所示，只能在go服务器那台机器上执行
```
   curl http://127.0.0.1:10001/admin/reset?password=123
```
  9,  增加修改邮箱，昵称，姓名页面  
  10, 只允许修改自己部门的账号权限   增加用户修改权限功能  
  11, bug可以指定多人，自己的bug才可以转交，删除bug内部转交功能，增加缓存,增加查看所有bug的权限  
  12, 增加用户禁用功能，当此用户存在bug时，无法被删除  
  13， 禁用用户，此用户的所有发布的bug都将移动至垃圾箱，垃圾箱里面的bug只有管理员才能查看，启用用户会将此用户的bug改为非垃圾箱  
  14， 增加操作日志，只有管理员才能查看  
  
### QQ群
    928790087@qq.com
