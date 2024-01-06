<template>
    <div>
        <div style="display: flex;justify-content: space-around">
            <el-tag>数据量:{{conditions.total}}</el-tag>
            <el-tag type="danger">脏数据量:{{conditions.realDirtyData}}</el-tag>
            <el-tag type="info">检测到的脏数据量:{{conditions.checkedDirtyData}}</el-tag>
            <el-tag type="success">修复数据量:{{conditions.repairData}}</el-tag>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top: 20px">
            <el-tag type="warning">错误发现率:{{detection}}%</el-tag>
            <el-tag type="warning">修复率:{{repair}}%</el-tag>
        </div>
    </div>
</template>

<script>
    import {transofrmTime} from "../utils/time";

    export default {
        name: "condition_gps",
        data() {
            return {
                conditions: {
                    total: 0,
                    realDirtyData: 0,
                    checkedDirtyData: 0,
                    repairData: 0,
                    startTime: 0,
                    endTime: 0
                },
            }
        },
        computed: {
            delay() {
                return (this.conditions.delay / (this.conditions.total)).toFixed(2)
            },
            cleanSpeed() {
                return (this.conditions.total / (this.conditions.endTime - this.conditions.startTime)).toFixed(2)
            },
            repair() {
                return ((this.conditions.repairData / this.conditions.checkedDirtyData) * 100).toFixed(2)
            },
            detection() {
                return ((this.conditions.checkedDirtyData / this.conditions.realDirtyData) * 100).toFixed(2)
            },
            startTime() {
                return transofrmTime(this.conditions.startTime)
            },
            endTime() {
                return transofrmTime(this.conditions.endTime)
            }
        },
        methods: {
            updateData(val) {

                this.conditions.total = val.typeDataCount;
                this.conditions.realDirtyData = val.typeDirtyDataCount;
                this.conditions.checkedDirtyData = val.typeRightDetectionDataCount;
                this.conditions.repairData = val.typeRepairSuccessDataCount;
                this.conditions.startTime = val.startTime;
                this.conditions.endTime = val.endTime;
                this.conditions.delay = val.typeDataDelay;
                this.conditions.conversion = val.typeConversion;
            }
        }
    }
</script>

<style scoped>

</style>
