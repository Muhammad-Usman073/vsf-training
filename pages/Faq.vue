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
      //add to cart
      <div>
        <SfHeading
          :title="productGetters.getName(product)"
        />
      </div>
      //product price
      <div>
        <SfPrice :regular="productGetters.getPrice(product).regular"/>
      </div>
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
import {computed, ref, useRoute, useRouter} from '@nuxtjs/composition-api';
import {useProduct, useCart} from '~/composables';
import {SfImage, SfTile, SfHeading, SfPrice, SfSelect, SfAddToCart} from '@storefront-ui/vue';
import productGetters from '~/modules/catalog/product/getters/productGetters';

export default {
  components: {
    SfTile,
    SfImage,
    SfHeading,
    SfPrice,
    SfSelect,
    SfAddToCart,
  },
  setup() {
    const searchHandler = ref('');
    const product = ref([]);
    const prodDetail = ref([])
    const quantity = ref('')


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

      console.log(product.value[0], 'product list')
      console.log(prodDetail.value[0], 'product detail')

    }

// add to cart handler
    const addToCartHandler = async () => {

     const prod =  await addItem({
          product: prodDetail.value[0],
          quantity: parseInt(quantity.value),
        })
        console.log(error, 'error in composable')
        console.log(prod,'product added to the cart')
        console.log(quantity, 'quantity of the product')



    }
    // get product handler

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
      getProductDetails,
      getProductList,
      quantity,
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

