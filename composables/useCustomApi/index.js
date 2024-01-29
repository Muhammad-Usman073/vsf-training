import {computed, ref, useContext} from '@nuxtjs/composition-api'
const useCustomApi = ()=> {
  const data = ref([])
  const {app} = useContext()
  const getItems = async()=>{
    data.value =  await app.$vsf.$newIntegration.api.getAllItems()
  }
  return {
    getItems,
    data
  }
}

export default useCustomApi
