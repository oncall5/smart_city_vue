import Southcamera from '../views/camera/southcamera'
import EastExitCamera from '../views/camera/eastExitCamera'
import Northcamera from '../views/camera/northcamera'
import ColorCast from '../views/camera/colorCast'
import ColorCast2 from '../views/camera/colorCast2'

export default [
    {path:'/camera/southcamera', component: Southcamera},
    {path:'/camera/eastexitcamera', component: EastExitCamera},
    {path:'/camera/northcamera', component: Northcamera},
    {path:'/camera/colorCast', component: ColorCast},
    {path:'/camera/colorCast2', component: ColorCast2},
]
