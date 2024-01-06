import groups from '../views/sensor/group/groups'
import custom from '../views/sensor/group/custom'
export default [
  {
    path:'groups',
    component: groups,
    name: 'groups'
  },
  {
    path:'custom',
    component: custom,
    name: 'custom'
  },
]
