<template>
    <div>
        <!--卡片视图区域-->
        <el-card>
            <!--搜索与添加区域-->
            <el-row :gutter=20>
                <el-col :span=7>
                    <!--搜索与添加区域-->
                    <el-input placeholder="请输入数据名称" v-model="queryInfo.query" :clearable="true" @clear="null">
                        <el-button slot="append" icon="el-icon-search" @click="null"></el-button>
                    </el-input>
                </el-col>
                <el-col :span=5>
                    <div class="block">
                        <el-cascader
                                style="width: 100%"
                                :options="options"
                                :props="props"
                                collapse-tags
                                clearable>
                        </el-cascader>
                    </div>
                </el-col>
                <el-col :span=5>
                    <el-button type="primary">筛选</el-button>
                </el-col>
            </el-row>
            <!--用户列表区域-->
            <el-table :data="DataList" border stripe max-height="650">
                <!--缩印列-->
                <el-table-column type="selection" ></el-table-column>
<!--                <el-table-column type="id" label="序号"></el-table-column>-->
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="应用领域" prop="app_area"></el-table-column>
                <el-table-column label="设备类型" prop="type"></el-table-column>
                <el-table-column label="数据源类型" prop="data_type"></el-table-column>
                <el-table-column label="设备物理地址" prop="address"></el-table-column>
                <el-table-column label="设备网络地址" prop="ip_address"></el-table-column>
                <!--<el-table-column label="数据类型" prop="mobile"></el-table-column>-->
                <el-table-column label="清洗状态" prop="state">
                    <el-tag>未清洗</el-tag>
                </el-table-column>
                <el-table-column label="算法" prop="algorithm"></el-table-column>
                <el-table-column label="清洗结果(F1)" prop="result">
                    <el-tag type="success" @click="showResult">0.8<i class="el-icon-view"></i></el-tag>
                </el-table-column>
                <el-table-column label="操作" width="240px">
                    <template slot-scope="scope">
                        <!--配置结点按钮-->
                        <el-tooltip class="item" effect="dark" content="配置结点" :enterable="false" placement="top">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setConfig"></el-button>
                        </el-tooltip>
                        <!--开始清洗按钮-->
                        <el-tooltip class="item" effect="dark" content="开始清洗" :enterable="false" placement="top">
                            <!--开始清洗-->
                            <el-button type="success" icon="el-icon-video-play" size="mini"></el-button>
                        </el-tooltip>
                        <!--查看数据详情结点按钮-->
                        <el-tooltip class="item" effect="dark" content="查看详情" :enterable="false" placement="top">
                            <!--修改按钮-->
                            <el-button type="primary" icon="el-icon-view" size="mini"
                                       @click="gotoDataclean(scope.row)"></el-button>
                        </el-tooltip>
                        <!--删除按钮-->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete1(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top: 20px">
                <el-col :span=4>
                    <el-button type="primary" @click="addDialogVisible = true">添加外部数据</el-button>
                </el-col>
                <el-col :span=8>
                    <el-upload
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                        <el-button slot="trigger" type="primary">添加本地数据</el-button>
                        <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
                    </el-upload>
                </el-col>
            </el-row>
        </el-card>

        <!-- 添加数据源的对话框 -->
        <el-dialog title="添加数据" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体 -->
            <el-form
                    :model="addDataForm"
                    :rules="rules"
                    ref="addFormRef"
                    label-width="100px"
            >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addDataForm.name"></el-input>
                </el-form-item>
                <el-form-item label="应用领域" prop="region">
                    <el-select v-model="selectType04" placeholder="选择类型" @change="selectChange1">
                        <el-option v-for="item in regionType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="selectType01" placeholder="选择类型" @change="selectChange2">
                        <el-option v-for="item in equipmentType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据源类型">
                    <el-select v-model="selectType02" placeholder="选择类型" @change="selectChange3">
                        <el-option v-for="item in dataSourceType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="数据类型">-->
                <!--<el-select v-model="selectType03" placeholder="选择类型">-->
                <!--<el-option v-for="item in dataType" :label="item.label" :value="item.value" :key="item.value"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="协议">
                    <el-select v-model="selectType05" placeholder="选择协议" @change="selectChange4">
                        <el-option v-for="item in AgreementType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备所在地区" prop="address">
                    <div class="block">
                        <el-cascader
                                v-model="value"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                @change="handleChange">
                        </el-cascader>
                    </div>
                </el-form-item>
                <el-form-item label="设备详细地址" prop="address">
                    <el-input v-model="addDataForm.address"></el-input>
                </el-form-item>
                <el-form-item label="网络地址" prop="ip_address">
                    <el-input v-model="addDataForm.ip_address"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="addDataForm.port"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addDataForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addDataForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="testDataSource">测 试</el-button>
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDataSource">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 配置结点的对话框 -->
        <el-dialog title="配置结点" :visible.sync="addNodeVisible" width="70%" @close="addDialogClosed">
            <!-- 内容主体 -->
            <el-form :model="addNodeForm" ref="addFormRef" label-width="130px">
                <h3>云端清洗结点配置</h3>
                <el-form-item label="是否开启">
                    <el-switch
                            v-model="value01"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="云端服务器" v-if="value01">
                    <el-select v-model="selectNode" placeholder="选择云端结点">
                        <el-option v-for="item in Node" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="清洗算法" v-if="value01">
                    <el-select v-model="selectAlgorithmType" placeholder="选择算法">
                        <el-option v-for="item in AlgorithmType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <h3>云边协同清洗结点配置</h3>
                <el-form-item label="是否开启">
                    <el-switch
                            v-model="value02"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="云端服务器" v-if="value02">
                    <el-select v-model="selectNode" placeholder="选择类型">
                        <el-option v-for="item in Node" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="清洗算法" v-if="value02">
                    <el-select v-model="selectAlgorithmType2" placeholder="选择算法">
                        <el-option v-for="item in AlgorithmType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="边缘端服务器" v-if="value02">
                    <el-transfer v-model="edgeServer" :data="dataEdgeServer" :titles="['备选服务器','选中服务器']"></el-transfer>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="addNodeVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNodeVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 添加数据源的对话框 -->
        <el-dialog title="结果对比" :visible.sync="resultDialogVisible" width="50%" @close="addDialogClosed">
            <router-view></router-view>
        </el-dialog>
    </div>
</template>

<script>
  import axios from '../../../api/axios'

  export default {
    data() {
      const generateData = () => {
        const datas = [];
        for (let i = 1; i <= 5; i++) {
          datas.push({
            key: i,
            label: `边缘服务器 ${ i }`,
            // disabled: i % 4 === 0
          });
        }
        return datas;
      };
        /*ip正则验证*/
        var validcodeip = (rule, value, callback) => {
            let regexp = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
            let valdata = value.split(',');
            let isCorrect = true;
            if (valdata.length) {
                for (let i = 0; i < valdata.length; i++) {
                    if (regexp.test(valdata[i]) == false) {
                        isCorrect = false;
                    }
                }
            }

            if (value == '') {
                return callback(new Error('请输入iP地址'));
            } else if (!isCorrect) {
                callback(new Error('请输入正确对ip地址'));
            } else {
                callback()
            }
        };
      return {
        value:0,
        value01: true,
        value02: true,
        props: {multiple: true},
        options: [
          {
            value: 1,
            label: '浙江',
            children: [{
              value: 2,
              label: '杭州',
              children: [
                {value: 3, label: '上城区'},
                {value: 4, label: '下城区'},
                {value: 6, label: '拱墅区'},
                {value: 7, label: '西湖区'},
                {value: 8, label: '滨江区'},
                {value: 9, label: '萧山区'},
                {value: 10, label: '余杭区'},
              ]
            }
            ]
          }
        ],
          rules:{
            ip_address:[
                { required: true, message: '请输入ip', trigger: 'blur' },
                {validator:validcodeip,trigger:'blur'}
            ],
          },
        resultDialogVisible: false,
        dataEdgeServer: generateData(),
        edgeServer: [1],
        queryInfo: {
          query: '',
          //当前的页数
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize: 2
        },
        DataList: [{
          name: "数据源1",
          app_area: '飞机航班',
          type: "传感器",
          data_type: "结构化数据",
          address: "ai小镇",
          ip_address: "10.5.26.50",
          algorithm: 'raha'
        },
          {
              name: "数据源1",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.50",
              algorithm: 'raha'
          },
          {
              name: "数据源2",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.51",
              algorithm: 'raha'
          },
          {
              name: "数据源1",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.50",
              algorithm: 'raha'
          },
          {
              name: "数据源1",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.50",
              algorithm: 'raha'
          },
          {
              name: "数据源1",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.50",
              algorithm: 'raha'
          },
          {
              name: "数据源1",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.50",
              algorithm: 'raha'
          },
          {
              name: "数据源1",
              app_area: '飞机航班',
              type: "传感器",
              data_type: "结构化数据",
              address: "ai小镇",
              ip_address: "10.5.26.50",
              algorithm: 'raha'
          },],
        // 添加用户对话框
        addDialogVisible: false,
        addDataForm: {},
        addUserFormRules: {},
        regionType: [{value: 0, label: '其它'},
          {value: 1, label: '城市汽车'},
          {value: 2, label: '飞机航班'},],
        equipmentType: [
          {value: 0, label: '物理设备'},
          {value: 1, label: '虚拟设备'}],
        dataSourceType: [
          {value: 0, label: '流式数据'},
          {value: 1, label: '非流式数据'},
        ],
        dataType: [
          {value: 0, label: '数值'},
          {value: 1, label: '文本'},
          {value: 2, label: '视频'},
          {value: 3, label: '结构化'},
          {value: 4, label: '轨迹'},
        ],
        selectType01: "",
        selectType02: "",
        selectType03: "",
        selectType04: "",
        selectType05: "",
        AgreementType: [
          {value: 0, label: 'http'},
          {value: 1, label: 'https'},
          {value: 2, label: 'mqtt'},
          {value: 3, label: 'webSocket'},
          {value: 4, label: 'ftp'},
        ],
        selectAlgorithmType: 0,
        selectAlgorithmType2: 0,
        AlgorithmType: [
          {value: 0, label: '规则校验'},
          {value: 1, label: '概率统计'},
          {value: 2, label: '自动选择'},
        ],
        addNodeVisible: false,
        addNodeForm: {},
        selectNode: 0,
        Node: [
          {value: 0, label: 'cloudServer01'},
          {value: 1, label: 'cloudServer02'},
          {value: 2, label: 'cloudServer03'},
        ],
        fileList: []
      }

    },
      created() {
          axios.$get('http://10.11.24.169:8181//dataclean/source/findAll').then(res => {
              console.log(res)
              this.DataList=res
          });
          console.log(this.addDataForm)
      },
    methods: {
        handleChange(val){
            this.addDataForm.province=val[0];
            this.addDataForm.city=val[1];
            this.addDataForm.area=val[2];
        },
        selectChange1(val) {
            console.log(val);
            this.addDataForm.app_area=this.regionType[val].label
            console.log(this.addDataForm.app_area)
        },
        selectChange2(val) {
            console.log(val);
            this.addDataForm.type=this.equipmentType[val].label
            console.log(this.addDataForm.type)
        },
        selectChange3(val) {
            console.log(val);
            this.addDataForm.data_type=this.dataType[val].label
            console.log(this.addDataForm.data_type)
        },
        selectChange4(val) {
            console.log(val);
            this.addDataForm.agreement=this.AgreementType[val].label
            console.log(this.addDataForm.agreement)
        },
      selectChange(val) {
        console.log(val);
      },
      //配置云边协同操作
      setConfig(row) {
        this.addNodeVisible = true;
        console.log(row);
      },
        //测试数据源
        testDataSource() {
            let param = {
                name: null,
                region: null,
                type: null,
                socket: null,
                address: null,
                port: null,
                username: null,
                password: null
            };
            axios.$get('testData', param).then(res => {
                console.log(res)
            });
            this.$message.success('数据源连接成功！！！');
        },
        addDataSource() {
            axios.$post('http://10.0.104.207:8181/dataclean/source/add',this.addDataForm
            ).then(res => {
                if(res=="success")
                {this.$message({
                    message: '添加成功',
                    type: 'success'
                });}
                else if(res=="error")
                {
                    this.$message.error('添加失败');
                }
            });
            location.reload();
            this.addDialogVisible = false;
        },
        // 监听 添加用户对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        //进入对比页面
        gotoDataclean(val) {
            this.$router.push({
                path: '/dataclean/datasource/dataCleanResult', query: {
                    dataId: val
                }
            });
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        showResult() {
            this.resultDialogVisible = true;
            this.$router.push('/dataclean/datasource/AdvantageVisualization');
        },
        delete1(val){
            axios.$get('http://10.0.104.207:8181//dataclean/source/del',{"id":parseInt(val)}).then(res => {
                console.log(res)
            });
            location.reload();
        }
    }
  }
</script>

<style scoped lang="less">
    .el-card {
        height: 850px;
    }

    .data-oper {
        padding: 20px;
        float: right;
    }

    .upload {
        box-sizing: border-box;
        display: block;
        height: 40px;
    }

</style>
