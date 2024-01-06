<template>
    <div>
        <el-card>
            <el-button type="primary" @click="">启动raha</el-button>
            <el-button type="primary">检测</el-button>
        </el-card>
    </div>
</template>

<script>
    import axios from '@/api/axios.js'
    export default{
        data(){

        },
        mounted(){

        },
        methods:{
            initRaha(){
                axios.$get(this.comm.CLEAN_URL + '/initRaha').then(res => {
                    console.log('初始化引擎')
                    console.log(res)
                })
            },
        }
    }
</script>