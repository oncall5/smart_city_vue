import flights from '@/views/citybrain/traffic/flights'
import trajectory_interpolation from '@/views/citybrain/traffic/trajectory_interpolation'
import text from '../views/citybrain/text/text'
import flightData1 from '../views/citybrain/traffic/filightData1'
import licensePlate from '../views/citybrain/traffic/licensePlate'
import mobileGps from '../views/citybrain/traffic/mobileGps'
import trajectoryDetail from '../views/citybrain/traffic/trajectoryDetail'
import trajectory_detection2 from '../views/citybrain/traffic/trajectory_detection2'
import trajectory_interpolation2 from '@/views/citybrain/traffic/trajectory_interpolation2'
import trajectoryDetail2 from '../views/citybrain/traffic/trajectoryDetail2'
import trajectory_detection from '../views/citybrain/traffic/trajectory_detection'
import trajectory_detection_detail from '../views/citybrain/traffic/trajectory_detection_detail'

export default [
    {path: '/dataclean/citybrain/traffic/queryFilghtsData', component: flights},
    {path: 'trajectory_interpolation', component: trajectory_interpolation, name: 'trajectory_interpolation'},
    {path: 'trajectory_detection2', component: trajectory_detection2, name: 'trajectory_detection2'},
    {path: '/citybrain/traffic/flightData1', component: flightData1},
    {path: '/dataclean/citybrain/traffic/licensePlate', component: licensePlate},
    {path: '/dataclean/citybrain/traffic/mobileGps', component: mobileGps},
    {path: 'trajectoryDetail', component: trajectoryDetail, name: 'trajectoryDetail'},
    {path: 'trajectory_interpolation2', component: trajectory_interpolation2, name: 'trajectory_interpolation2'},
    {path: 'trajectoryDetail2', component: trajectoryDetail2, name: 'trajectoryDetail2'},
    {path: 'trajectory_detection', component: trajectory_detection, name: 'trajectory_detection'},
    {path: 'trajectory_detection_detail', component: trajectory_detection_detail, name: 'trajectory_detection_detail'},
    {path: 'text', component: text, name: 'text'},

]
