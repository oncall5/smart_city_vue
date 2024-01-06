import advantageVisualization from '@/views/DataSource/compare/AdvantageVisualization'
import dataCleanResult from '@/views/DataSource/StructedData/dataCleanResult'
import StructedDataInfo from '@/views/DataSource/StructedData/DataInfo'
import VideoDataInfo from '@/views/DataSource/VideoData/DataInfo'
import trajectoryDataInfo from '@/views/DataSource/trajectoryData/dataInfo'
import trajectoryResult from '@/views/DataSource/trajectoryData/trajectoryResult'
import resultInMap from '@/views/DataSource/trajectoryData/resultInMap'
import testquota from '@/views/DataSource/StructedData/testquota'
import testdata from '@/views/DataSource/StructedData/testdata'
export default [
  {
    path: '/dataclean/datasource/StructedData/DataInfo', component: StructedDataInfo, children: [
      {path: '/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]
  },
  {path: '/dataclean/datasource/VideoData/DataInfo', component: VideoDataInfo},
  {
    path: '/dataclean/datasource/dataCleanResult', component: dataCleanResult, children: [
      {path: '/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]
  },
  {
    path: '/dataclean/datasource/dataCleanResult', component: dataCleanResult, children: [
      {path: '/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]
  },
  {path: '/dataclean/datasource/trajectoryData/DataInfo', component: trajectoryDataInfo},
  {
    path: '/dataclean/datasource/trajectoryData/trajectoryResult', component: trajectoryResult
  },
  {
    path: '/dataclean/datasource/trajectoryData/resultInMap', component: resultInMap
  },
  {
    path: '/dataclean/datasource/structedData/testquota', component: testquota
  },
  {
    path: '/dataclean/datasource/structedData/testdata', component: testdata
  },

]
