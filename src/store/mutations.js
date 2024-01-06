import { Message } from 'element-ui';
import fa from "element-ui/src/locale/lang/fa";

const mutations={
  ['SAVEVUEXMAP'](state,data){
    console.log('data',state,data)
    state.vuexMap=data;
  },
  ['SAVEVSENSOR'](state,data){
    let flag = false;
    state.sensors.forEach(item => {
      if(item.name === data.name){
        flag = true;
      }
    })
    if(flag){
      return Message.error({message:'该传感器已经存在'})
    }
    else{
      state.sensors.push(data);
      console.log(state.sensors);
      return Message.success({message:'插入成功'})
    }

  },
  ['RWMOVESENSOR'](state,data){

    state.sensors.forEach(item => {
      for(let i=0;i<state.sensors.length;i++){
        if(item.name === data.name){
          state.sensors.splice(i,1)
          return Message.success({message:'删除成功'})
        }
      }
    })


  },
};
export default mutations;
