import {computed,  ref, useContext} from '@nuxtjs/composition-api'
import type { Ref } from '@nuxtjs/composition-api';

const useCustomApi = ():object => {
  const data:Ref<object[]> = ref([])
  const {app} = useContext()
  const getItems = async():Promise<void>=>{
    data.value =  await app.$vsf.$newIntegration.api.getAllItems()
  }
  return {
    getItems,
    data
  }
}

export default useCustomApi
