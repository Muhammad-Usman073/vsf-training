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
      <template v-for="options in configurableOptions">
        <div v-if="options.attribute_code === 'color'">
          <!--          <label for="">{{ options.label }}</label>-->
          <!--          <select v-model="colorSelection">-->
          <!--            <option disabled value="">Please select a color</option>-->
          <!--            <option v-for="colorOptions in options.values" :value="colorOptions.uid">{{ colorOptions.label }}</option>-->
          <!--          </select>-->
          <!--          {{ colorSelection }}-->
          <SfColor
            v-for="colorOptions in options.values"
            :key="colorOptions.uid"
            :color="productGetters.getSwatchData(colorOptions.swatch_data)"
            :color-uid="colorOptions.uid"
            :selected="colorOptions.uid === colorSelection "
            class="product__color"
            @click="updateColor(colorOptions.uid)"
          />

        </div>


        <div v-else-if="options.attribute_code === 'size'">
          <label for="">{{ options.label }}</label>
          <select v-model="sizeSelection">
            <option disabled value="">Please select a size</option>
            <option v-for="sizeOptions in options.values" :value="sizeOptions.uid">{{ sizeOptions.label }}</option>
          </select>
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
import {Logger} from '~/helpers/logger'
import {useProduct, useCart, useUiNotification} from '~/composables';
import {SfImage, SfTile, SfHeading, SfPrice, SfAddToCart, SfSelect, SfColor, SfNotification} from '@storefront-ui/vue';
import productGetters from '~/modules/catalog/product/getters/productGetters';

export default {
  components: {
    SfTile,
    SfImage,
    SfHeading,
    SfPrice,
    SfSelect,
    SfAddToCart,
    SfColor,
    SfNotification,
  },
  setup() {
    const searchHandler = ref('');
    const product = ref([]);
    const prodDetail = ref()
    const quantity = ref(1)
    const colorSelection = ref('')
    const sizeSelection = ref('')
    const configurableOptions = ref([])
    const updateConfiguration = ref({
      'MTQ0': '',
      'OTM=': ''
    })
    const update = () => {
      updateConfiguration.value['MTQ0'] = colorSelection.value.toString()
      updateConfiguration.value['OTM='] = sizeSelection.value.toString()
    }
    watch([colorSelection, sizeSelection], () => {
      update()
      console.log(updateConfiguration)
    })
    const updateColor = (uid) => {
      colorSelection.value = uid
    }
    const {
      getProductList,
      getProductDetails,
    } = useProduct();
    const {
      addItem,
      error
    } = useCart()
    const {send} = useUiNotification()
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
      configurableOptions.value = prodDetail.value[0].configurable_options.map(config => config)
      console.log(prodDetail.value, 'product detail')

      console.log(configurableOptions, 'configurable Options')
    }
// add to cart handler

    const addToCartHandler = async () => {
      if (colorSelection.value !== '' && sizeSelection.value !== '') {
        await addItem({
          product: prodDetail.value[0],
          quantity: parseInt(quantity.value),
          productConfiguration: updateConfiguration.value
        })
        if (colorSelection.value !== '' && sizeSelection.value !== '') {
          send({
            message: 'Product has added to the cart',
            type: 'success'
          })
        }

      } else {
        alert(' color or size is not selected ')
      }
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
      SfNotification,
      getProductDetails,
      getProductList,
      quantity,
      colorSelection,
      sizeSelection,
      configurableOptions,
      error,
      updateColor
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
.product__color{
  display:flex;
  gap: 2px;
}
</style>

