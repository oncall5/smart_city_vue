<template>
    <div>
        <el-card>
            <el-row :gutter="10" type="flex" align="middle">
                <el-col :span="5">
                    <el-input v-model="searchusername" placeholder="输入用户微博昵称,搜索用户" prefix-icon="el-icon-search" clearable></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search" circle @click="searchUserInfo" :loading=searchloading></el-button>
                </el-col>
            <!-- </el-row>
            <el-row :gutter="10" type="flex" align="middle"> -->
                <el-col :span="2.5" v-show="showuserinformation">
                    <el-image style="width: 100px; height: 100px; border-radius: 50%;" :src="url"></el-image>
                </el-col>
                <el-col :span="5" v-show="showuserinformation">
                    <el-row>
                        <span style="font-weight:bold">{{username}}</span>
                    </el-row>
                    <el-row>
                        <el-button type="text" style="padding-right:20px" @click="dialogVisible=true;searchfans()" :disabled=fansbutton>粉丝{{fansnumber}}</el-button>
                        <span>关注{{focusnumber}}</span>
                    </el-row>
                    <el-dialog 
                    title="粉丝信息" 
                    :visible.sync="dialogVisible" 
                    :modal="false"
                    append-to-body
                    class="fansdialog">
                            <div v-for="item in fansinformation">
                                <el-card style="margin:10px; padding:0;">
                                    <div style="padding:3px">
                                        <span v-if="item.fan_name">
                                            <i class="el-icon-user-solid"></i>
                                            昵称：
                                            {{item.fan_name}}
                                        </span>
                                        <span v-if="item.gender == 'm'">
                                            <i class="el-icon-male"></i>
                                        </span>
                                        <span v-if="item.gender == 'f'">
                                            <i class="el-icon-female"></i>
                                        </span>
                                    </div>
                                    <div style="padding:3px">
                                        <span v-if="item.description">
                                            <i class="el-icon-document"></i>
                                            {{item.description}}
                                        </span>
                                    </div>
                                    <div style="padding:3px">
                                        <el-row>
                                            <el-col :span="12">
                                                <span v-if="item.birthday">
                                                    <i class="el-icon-date"></i>
                                                    {{item.birthday}}
                                                </span>
                                            </el-col>
                                            <el-col :span="12">
                                                <span v-if="item.created_at">
                                                    <i class="el-icon-date"></i>
                                                    {{item.created_at}}
                                                    加入微博
                                                </span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div style="padding:3px">
                                        <el-row>
                                            <el-col :span="12">
                                                <span v-if="item.ip_location">
                                                    <i class="el-icon-location-information"></i>
                                                    {{item.ip_location}}
                                                </span>
                                            </el-col>
                                            <el-col :span="12">
                                                <span v-if="item.location">
                                                    <i class="el-icon-place"></i>
                                                    {{item.location}}
                                                </span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div style="padding:3px">
                                        <el-row>
                                            <el-col :span="12">
                                                <span v-if="item.school" >
                                                    <i class="el-icon-school"></i>
                                                    {{item.school}}
                                                </span>
                                            </el-col>
                                            <el-col :span="12">
                                                <span v-if="item.company">
                                                    <i class="el-icon-office-building"></i>
                                                    {{item.company}}
                                                </span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-card>
                            </div>
                    </el-dialog>
                    <el-row>
                        <span>全部微博({{total}})</span>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
        <el-card v-show="true">
            <el-row :gutter="10" type="flex" align="middle">
                <el-col :span="4.5">
                    <el-input v-model="params.name" placeholder="请输入用户微博昵称" prefix-icon="el-icon-search" clearable></el-input>
                </el-col>
                <el-col :span="4.5">
                    <el-input v-model="params.n" placeholder="请输入要爬取的微博数量" prefix-icon="el-icon-search" clearable></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="searchweibo()" :loading=disabled>获取新数据</el-button>
                </el-col>
                <el-col :span="1.5" v-show="showpercent">
                    <span>内容进度：</span>
                </el-col>
                <el-col :span="2.5" v-show="showpercent">
                    <el-progress type="circle" :status=color1 :percentage=percentage1 :width=width></el-progress>
                </el-col>
                <el-col :span="1.5" v-show="showpercent">
                    <span>评论进度：</span>
                </el-col>
                <el-col :span="3" v-show="showpercent">
                    <el-progress type="circle" :percentage=percentage2 :status=color2 :width=width></el-progress>
                </el-col>
                <el-col :span="3.5" v-show="showpercent">
                    <div>
                        <span style="color:brown">爬取时长：</span>
                        <span style="color:brown">{{gettime}}</span>
                    </div>
                    <div>
                        <span style="color:brown">获取到数据：</span>
                        <span style="color:brown">{{getcount}}</span>
                    </div>
                </el-col>
                <!-- <el-col :span="2">
                    <el-button type="primary">生成词云</el-button>
                </el-col> -->
                <!-- <el-col :span="2">
                    <el-button type="primary">查看</el-button>
                </el-col> -->
            </el-row>
        </el-card>
        <el-card>
            <el-table
                v-loading="loading"
                element-loading-text="拼命获取中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                border
                
                style="width: 100%">
                <el-table-column
                fixed
                prop="username"
                label="用户"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                fixed
                prop="created_at"
                label="日期"
                width="150"
                align="center">
                </el-table-column>
                <el-table-column
                prop="content_type"
                label="内容类型"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="content"
                label="内容"
                width="400">
                </el-table-column>
                <el-table-column
                prop="retweeted_name"
                label="转发用户名"
                width="100"
                align="center"
                max-height="200px">
                </el-table-column>
                <el-table-column
                prop="retweeted_content"
                label="转发内容"
                width="300">
                </el-table-column>
                <el-table-column
                prop="reposts_count"
                label="转发数"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="comments_count"
                label="评论数"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="attitudes_count"
                label="点赞数"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="查看评论"
                width="100"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row);dialogTableVisible = true" type="text" size="small">查看</el-button>
                </template>
                <el-dialog 
                title="评论" 
                :visible.sync="dialogTableVisible" 
                :modal="false"
                append-to-body>
                    <el-table :data="comment" border max-height="500">
                        <el-table-column property="username" label="昵称" width="150" ></el-table-column>
                        <el-table-column property="content" label="内容" ></el-table-column>
                        <el-table-column property="created_at" label="日期" width="200" ></el-table-column>
                    </el-table>
                </el-dialog>
                </el-table-column>
            </el-table>
            <el-row type="flex" justify="center">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.page"
                  :page-size="queryInfo.pageSize"
                  :page-sizes="[10, 20, 50, 100]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="queryInfo.total"
                >
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import axios from '@/api/axios.js'
    // import {comm} from '../../global/common'
    export default{
        data(){
            return{
                pa:[],
                params:{name:'',n:''},          //要传给后端的用户昵称和要爬取的微博数量
                loading: false,                 //表单数据遮罩层
                disabled:false,                 //点击搜索后，将按钮设为disabled不可点击状态
                total:'',                       //用户的全部微博数
                expire:'',
                color1:null,                    //进度条1的样式
                color2:null,                    //进度条2的样式
                width:110,                      //进度条的宽度大小
                percentage1:0,                  //进度条1的百分比值
                percentage2:0,
                dialogVisible: false,           //
                dialogTableVisible: false,      //评论弹窗的控制属性
                tableData:[],                   //微博内容
                comment:[],                     //微博对应的评论内容
                getnumber1:0,                   //已爬取到的内容条数
                getnumber2:0,                   //已爬取到的评论条数(以数量为准)
                gettime:'',                     //爬取时长
                getcount:'',                     //爬取到的数据数
                fansnumber:'0',                 //用户粉丝数
                focusnumber:'0',                //用户关注数
                username:'',                    //用户昵称
                showuserinformation:false,       //是否展示用户信息(获得用户信息后展示)
                showpercent:false,               //是否展示进度信息和爬取时间
                url:'',                         //用户头像
                fansinformation:[],             //粉丝信息
                searchusername:'',              //要查找的用户名
                searchloading:false,             //搜索按钮是否加载中
                searchfansinfo:{"n":100,"headers":{},"userid":0},
                fansbutton:true,                 //粉丝数文字按钮是否可点击
                isend:false,                     //是否获取完毕，以此来终止时钟请求
                queryInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
            }
        },
        mounted(){
            this.fetchTableData()
        },
        methods:{
            open(){
                this.$message({
                    message: '搜索内容不能有空',
                    type: 'warning',
                    center: true
                })
            },
            open1(){
                this.$message({
                    message: '获取新数据失败',
                    type: 'warning',
                    center: true
                })
            },
            open2(){
                this.$message({
                    message: '用户全部微博数为'+this.total,
                    type: 'warning',
                    center: true
                })
            },
            handleClick(row) {
                console.log(row.id)
                axios.$get(this.comm.WEIBO_URL + '/select_comments/' + row.id).then(res => {
                    console.log(res)
                    this.comment = res.data
                })
            },
            searchweibo(){
                // 初始化进度条样式以及爬取时间的内容
                this.getnumber1 = 0
                this.getnumber2 = 0
                this.percentage1 = 0
                this.percentage2 = 0
                this.color1 = null
                this.color2 = null
                this.gettime = ''
                this.getcount = ''
                this.disabled = true
                this.showpercent = true
                this.isend = false
                // 如果两个输入框存在空，则弹出消息进行提示
                if (this.params.name == ''||this.params.n == ''){
                    console.log("输入为空")
                    this.open()
                    this.disabled = false
                }else{
                    // 在爬取内容时设置遮罩层
                    this.loading = true
                    this.pa = JSON.parse(JSON.stringify(this.params))
                    console.log(this.pa)
                    axios.$post(this.comm.WEIBO_URL+'/searchWeiboData',this.pa).then(res => {
                        console.log(res)
                        // coded=0表示正常运行，将获取到的内容进行赋值，同时赋值操作结束后直接将进度条设置成百分百状态
                        if(res.code == 0){
                            this.fetchTableData()
                            this.loading = false
                            this.gettime = res.data.time
                            this.getcount = res.data.count + ' 条'
                            this.isend = true
                        }
                        // code=412时弹出消息框进行提示
                        else if(res.code == 412){
                            this.total = res.message
                            console.log(this.total)
                            this.open2()
                        }
                        else{
                            this.open1()
                        }
                        this.percentage2 = this.percentage1
                        this.color2 = this.color1
                        this.isend = true
                        this.loading = false
                        this.disabled = false
                    })
                    // 请求后每五秒获取一次进度
                    this.$nextTick(function(){
                        this.searchpercent()
                    })
                }
            },
            searchpercent(){
                console.log(this.params.n)
                console.log(this.percentage1)
                let changepercent=setInterval(() => {
                    if(this.percentage2 == 0){
                        axios.$get(this.comm.WEIBO_URL + '/get_count').then(res => {
                        console.log(res)
                        this.getnumber1 = res.data.data_count
                        this.getnumber2 = res.data.comment_count
                        this.percentage1 = Math.round(this.getnumber1/this.params.n*100)
                        this.percentage2 = Math.round(this.getnumber2/this.params.n*100)
                        })
                    }else{
                        axios.$get(this.comm.WEIBO_URL + '/get_count').then(res => {
                        console.log(res)
                        this.getnumber2 = res.data.comment_count
                        this.percentage2 = Math.round(this.getnumber2/this.params.n*100)
                        })
                    }
                    console.log(12345);
                    console.log(this.getnumber1)
                    console.log(this.getnumber2)
                    // this.percentage1 = Math.round(this.getnumber1/this.params.n*100)
                    // this.percentage2 = Math.round(this.getnumber2/this.params.n*100)
                    if(this.percentage1 == 100){this.color1 = 'success'}
                    if(this.percentage2 == 100){this.color2 = 'success'}
                    console.log(this.isend)
                    if(this.isend == true){
                        clearInterval(changepercent)
                    }
                },3000)
                // }
            },
            // async query() {
            //     const { content, totalElements } = await this.fetchTableData()
            //     this.tableData = content
            //     //console.log(this.tableData)
            //     this.queryInfo.total = totalElements
            // },
            fetchTableData() {
                console.log(this.comm.WEIBO_URL + '/select_all')
                console.log(
                    {
                        page: this.queryInfo.page,
                        pageSize: this.queryInfo.pageSize,
                    })
                axios.$get(this.comm.WEIBO_URL + '/select_all',
                    {
                        page: this.queryInfo.page,
                        pageSize: this.queryInfo.pageSize,
                    }).then(res => {
                    this.tableData = res.data.tableData
                    this.queryInfo.total = res.data.total
                    console.log(res)
                })
            },
            searchUserInfo(){
                this.searchloading = true
                console.log(this.comm.WEIBO_URL + '/searchUserInfo/' + this.searchusername)
                axios.$post(this.comm.WEIBO_URL + '/searchUserInfo/' + this.searchusername).then(res => {
                    console.log(res)
                    this.searchloading = false
                    this.username = res.data.username
                    this.fansnumber = res.data.fans
                    this.focusnumber = res.data.focus
                    this.url = res.data.img
                    this.total = res.data.weibo_count
                    this.searchfansinfo.userid = res.data.userid
                    this.searchfansinfo.headers = res.data.headers
                    console.log(this.searchfansinfo)
                    this.showuserinformation = true
                    axios.$post(this.comm.WEIBO_URL + '/searchFansInfo', this.searchfansinfo).then(res => {
                        console.log(res)
                        this.fansbutton = false
                    })
                })
            },
            searchfans(){
                axios.$get(this.comm.WEIBO_URL + '/selectFansInfo').then(res => {
                    console.log(res)
                    this.fansinformation = res.data
                })
            },
            handleSizeChange(newPageSize) {
                this.queryInfo = { ...this.queryInfo, pageSize: newPageSize }
                this.fetchTableData()
            },
            handleCurrentChange(currentPage) {
                this.queryInfo = { ...this.queryInfo, page: currentPage }
                this.fetchTableData()
            },
        }
    }
</script>


<style scoped>
.el-table /deep/.cell {
    white-space: pre-wrap;   /*这是重点。文本换行。要进行深层穿透，否则刷新后换行效果会消失*/
}
.fansdialog /deep/ .el-dialog__body {
    height: 60vh;
    overflow: auto;
}
</style>
