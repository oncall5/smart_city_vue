<template>
    <div>
        <!--卡片视图区域-->
        <el-card>
            <!--搜索与添加区域-->
            <el-row :gutter=20>
                <el-col :span="7">
                    <!--搜索与添加区域-->
                    <el-input placeholder="请输入数据名称" v-model="queryInfo.query" :clearable="true" @clear="">
                        <el-button slot="append" icon="el-icon-search" @click=""></el-button>
                    </el-input>
                </el-col>
                <el-col :span="5">
                    <div class="block">
                        <el-cascader
                                style="width: 100%"
                                :options="options"
                                :props="props"
                                collapse-tags
                                clearable
                                v-model="selecetedData"
                                @change="queryData">
                        </el-cascader>
                    </div>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary">筛选</el-button>
                </el-col>
                <el-col :span="5">
                    <el-switch
                            v-model="displayMode"
                            active-text="列表显示"
                            inactive-text="在地图上显示"
                            inactive-color="#67C23A"
                            @change="changeDisplayMode">
                    </el-switch>
                </el-col>
            </el-row>
            <!--数据源列表区域-->
            <div v-if="displayMode">
                <el-table :data="DataList" border stripe max-height="650">
                    <!--缩印列-->
                    <el-table-column type="selection" label="#"></el-table-column>
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column label="名称" prop="username"></el-table-column>
                    <el-table-column label="应用领域" prop="app_area"></el-table-column>
                    <el-table-column label="设备类型" prop="equ_type"></el-table-column>
                    <el-table-column label="数据源类型" prop="source_type"></el-table-column>
                    <el-table-column label="设备物理地址" prop="phy_address"></el-table-column>
                    <el-table-column label="设备网络地址" prop="ip_address"></el-table-column>
                    <!--<el-table-column label="数据类型" prop="mobile"></el-table-column>-->
                    <el-table-column label="清洗状态" prop="role_name">
                        <el-tag>未清洗</el-tag>
                    </el-table-column>
                    <el-table-column label="算法" prop="role_name"></el-table-column>
                    <el-table-column label="清洗结果(F1)" prop="role_name">
                        <el-tag type="success" @click="showResult">0.8<i class="el-icon-view"></i></el-tag>
                    </el-table-column>
                    <el-table-column label="操作" width="240px">
                        <template slot-scope="scope">
                            <!--配置结点按钮-->
                            <el-tooltip class="item" effect="dark" content="配置结点" :enterable="false" placement="top">
                                <el-button type="warning" icon="el-icon-setting" size="mini"
                                           @click="setConfig"></el-button>
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
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="width: 100%;height: 600px" v-else>
                <Map style="width: 100%;height: 100%"></Map>
            </div>
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
                    ref="addFormRef"
                    label-width="100px"
            >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addDataForm.name"></el-input>
                </el-form-item>
                <el-form-item label="应用领域" prop="region">
                    <el-select v-model="selectType04" placeholder="选择类型">
                        <el-option v-for="item in regionType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="selectType01" placeholder="选择类型">
                        <el-option v-for="item in equipmentType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据源类型">
                    <el-select v-model="selectType02" placeholder="选择类型">
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
                    <el-select v-model="selectType05" placeholder="选择协议">
                        <el-option v-for="item in AgreementType" :label="item.label" :value="item.value"
                                   :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备所在地区" prop="address">
                    <div class="block">
                        <el-cascader
                                v-model="cascaderValue"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                @change="handleChange">

                        </el-cascader>
                    </div>
                </el-form-item>
                <el-form-item label="设备详细地址" prop="address">
                    <el-input v-model="addDataForm.physicaladdress"></el-input>
                </el-form-item>
                <el-form-item label="网络地址" prop="address">
                    <el-input v-model="addDataForm.address"></el-input>
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
                    <el-transfer v-model="edgeServer" :data="data" :titles="['备选服务器','选中服务器']"></el-transfer>
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
  import {mapGetters} from "vuex";
  import axios from '../../../api/axios'
  import {area, city, coordinate, province} from '@/utils/region'
  import Map from '@/views/map/map'
  import L from 'leaflet';
  import marker1 from '@/assets/marker1.jpg'

  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 5; i++) {
          data.push({
            key: i,
            label: `边缘服务器 ${ i }`,
            // disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        cascaderValue: {},
        displayMode: true,
        value01: true,
        value02: true,
        // 省市区选择器
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
        selecetedData: {},
        // 对话框是否显示
        resultDialogVisible: false,
        data: generateData(),
        edgeServer: [1],
        queryInfo: {
          query: '',
          //当前的页数
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize: 2
        },
        //表格数据
        DataList: [
          {
            username: "数据源1",
            app_area: '飞机航班',
            equ_type: "传感器",
            source_type: "轨迹数据",
            phy_address: "ai小镇",
            ip_address: "10.5.26.50",
            role_name: 'raha',
            reigon: [1, 1, 1]
          },
          {
            username: "数据源2",
            app_area: '飞机航班',
            equ_type: "传感器",
            source_type: "轨迹数据",
            phy_address: "ai小镇",
            ip_address: "10.5.26.51",
            role_name: 'raha',
            reigon: [1, 1, 2]
          },
          {
            username: "数据源2",
            app_area: '飞机航班',
            equ_type: "传感器",
            source_type: "轨迹数据",
            phy_address: "ai小镇",
            ip_address: "10.5.26.51",
            role_name: 'raha',
            reigon: [1, 1, 8]
          },
          {
            username: "数据源2",
            app_area: '飞机航班',
            equ_type: "传感器",
            source_type: "轨迹数据",
            phy_address: "ai小镇",
            ip_address: "10.5.26.51",
            role_name: 'raha',
            reigon: [1, 1, 6]
          },
        ],
        // 添加用户对话框
        addDialogVisible: false,
        addDataForm: {},
        addUserFormRules: {},
        regionType: [{value: 0, label: '其它'},
          {value: 1, label: '城市汽车'},
          {value: 2, label: '飞机航班'}],
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
        selectType01: 0,
        selectType02: 0,
        selectType03: 0,
        selectType04: 0,
        selectType05: 0,
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
        fileList: [],
        marker: {},
        markers: []
      }

    },
    components: {
      Map
    },
    methods: {
      handleChange() {

      },
      changeDisplayMode(val) {
        if (val === false) {
          setTimeout(a => {
            this.vuexMap.setView(L.latLng(30.42, 120.3));
            this.DataList.forEach(item => {
              let regionName = province[item.reigon[0]] + city[item.reigon[1]] + area[item.reigon[2]];
              let latlng = coordinate[regionName];
              console.log(L.latLng(latlng[1], latlng[0]));
              let Icon = L.icon({
                iconUrl: marker1,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              });
              let tip = `${item.username ? "数据源名称: " + item.username + "<br>" : ""}
            ${item.equ_type ? "设备类型: " + item.equ_type + "<br>" : ""}
            ${item.source_type ? "数据类型: " + item.source_type + "<br>" : ""}
            ${item.ip_address ? "设备网络地址: " + item.ip_address + "<br>" : ""}`;
              let circleMarker = L.marker(L.latLng(latlng[1], latlng[0]), {
                icon: Icon,
                draggable: false,
                opacity: 1,
              }).unbindTooltip().bindTooltip(tip, {
                direction: 'right',
                opacity: 1,
                className: 'ls_tooltip_ty'
              }).addTo(this.vuexMap);
            })
          })
        }
      },
      queryData(item) {
        console.log(item);
        console.log(this.selecetedData);
      },
      //配置云边协同操作
      setConfig(row) {
        this.addNodeVisible = true;
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

        });
        this.$message.success('数据源连接成功！！！');
      },
      addDataSource() {
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
        axios.$get('addData', param).then(res => {

        });
        this.addDialogVisible = false;
      },
      // 监听 添加用户对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      //进入详情页面
      gotoDataclean(val) {
        let regionName = province[val.reigon[0]] + city[val.reigon[1]] + area[val.reigon[2]];
        let latlng = coordinate[regionName];
        //console.log(latlng);
        this.$router.push({
          path: '/dataclean/datasource/trajectoryData/trajectoryResult', query: {
            dataRow: val,
            coordinate: latlng,
            region: regionName
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
        this.$router.push('/dataclean/datasource/AdvantageVisualization')
      }
    },
    computed: {
      ...mapGetters([
        "vuexMap",
      ])
    },
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
