<template>
  <div
  >
    <input
      v-model="searchHandler"
      class="faq_search"
      type="search"
    />
    <div class="faq_container">
      <button class="faq_button" @click="buttonHandler">
        Search
      </button>
    </div>

    <div v-for="(product,index) in prodDetail" :key="index">
      //product image
      <div>
        <SfImage
          :alt="productGetters.getName(product)"
          :height="326"
          :src="productGetters.getProductThumbnailImage(product)"
          :width="216"
        />
      </div>
      //selection
    <template v-for = "options in configurableOptions" >
      <div v-if="options.attribute_code === 'color'">
        <label for="">{{options.label}}</label>
          <select v-model="colorSelection">
            <option disabled value="">Please select a color</option>
            <option v-for="colorOptions in options.values" :value="colorOptions.uid"  >{{colorOptions.label}}</option>
          </select>
        {{colorSelection}}
      </div>


      <div v-else-if="options.attribute_code === 'size'">
        <label for="">{{options.label}}</label>
        <select v-model="sizeSelection">
          <option disabled value="">Please select a size</option>
          <option v-for="sizeOptions in options.values" :value="sizeOptions.uid" >{{sizeOptions.label}}</option>
        </select>
        {{sizeSelection}}
      </div>

    </template>
      <div>
        <SfHeading
          :title="productGetters.getName(product)"
        />
      </div>
      //add to cart
      <div>
        <SfAddToCart
          v-model="quantity"
          class="product__add-to-cart"
          @click="addToCartHandler"
        />
      </div>


    </div>
  </div>

</template>
<script>
import {computed, ref, useRoute, useRouter, watch} from '@nuxtjs/composition-api';
import {useProduct, useCart} from '~/composables';
import {SfImage, SfTile, SfHeading, SfPrice, SfAddToCart,SfSelect,SfColor} from '@storefront-ui/vue';
import productGetters from '~/modules/catalog/product/getters/productGetters';

export default {
  components: {
    SfTile,
    SfImage,
    SfHeading,
    SfPrice,
    SfSelect,
    SfAddToCart,
    SfColor
  },
  setup() {
    const searchHandler = ref('');
    const product = ref([]);
    const prodDetail = ref()
    const quantity = ref(1)
    const colorSelection = ref("")
    const sizeSelection = ref("")
    const configurableOptions = ref([])
    const updateConfiguration = ref({
      'MTQ0':"",
      'OTM=':""
    })
const update = ()=>{
  updateConfiguration.value['MTQ0'] = colorSelection.value.toString()
  updateConfiguration.value['OTM='] = sizeSelection.value.toString()
}
watch([colorSelection,sizeSelection],()=>{
  update()
  console.log(updateConfiguration)

})
    const {
      getProductList,
      getProductDetails,
    } = useProduct();
    const {
      addItem,
      error
    } = useCart()
    const buttonHandler = async () => {
      const productList = await getProductList(
        {
          filter: {
            sku: {
              eq: searchHandler.value.toString()
            }
          }
        }
      )
      const productDetail = await getProductDetails(
        {
          filter: {
            sku: {
              eq: searchHandler.value.toString()
            }
          },
        }
      )
      prodDetail.value = productDetail.items
      product.value = productList.items
     configurableOptions.value = prodDetail.value[0].configurable_options.map(config=>config)
      console.log(prodDetail.value, 'product detail')
      console.log(configurableOptions,"configurable Options")
}
// add to cart handler
    const addToCartHandler = async () => {
      await addItem({
        product: prodDetail.value[0],
        quantity: parseInt(quantity.value),
        productConfiguration: updateConfiguration.value
      })
    }
    return {
      searchHandler,
      product,
      productGetters,
      buttonHandler,
      prodDetail,
      addToCartHandler,
      SfImage,
      SfTile,
      SfHeading,
      SfPrice,
      SfSelect,
      SfAddToCart,
      SfColor,
      getProductDetails,
      getProductList,
      quantity,
      colorSelection,
      sizeSelection,
      configurableOptions
    }
  }
}
</script>
<style>
.faq_search {
  width: 25%;
  height: 2rem;
  font-size: 100%;
}

.faq_container {
  margin-top: 5px;
}

.faq_button {
  background: green;
  padding: 10px 23px;
  border: 1px solid black;
  border-radius: 2px;
  color: white;
  cursor: pointer;
}
</style>

