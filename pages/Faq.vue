<template>
  <div>
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
    <div v-for="(products,index) in product" :key="index">
      <SfProductCard
        :addToCartDisabled="false"
        :image="productGetters.getProductThumbnailImage(products)"
        :imageHeight="326"
        :imageWidth="216"
        :isAddedToCart="true"
        :regularPrice="productGetters.getPrice(products).regular"
        :reviewsCount="productGetters.getTotalReviews(products)"
        :scoreRating="productGetters.getAverageRating(products)"
        :title="productGetters.getName(products)"
        badgeColor=""
        badgeLabel=""
        isInWishlistIcon="heart_fill"
        linkTag=""
        showAddToCartButton
        wishlistIcon="heart"
      />

    </div>
  </div>

</template>

<script>
import {useProduct} from '~/composables';
import {ref} from '@nuxtjs/composition-api';
import {SfProductCard} from '@storefront-ui/vue';
import productGetters from '~/modules/catalog/product/getters/productGetters';

export default {
  components: {
    SfProductCard
  },
  setup() {
    const searchHandler = ref('');
    const product = ref([]);
    const {getProductList} = useProduct();
    const buttonHandler = async () => {
      const data = await getProductList(
        {
          filter: {
            sku: {
              eq: searchHandler.value.toString()
            }
          }
        }
      )
      product.value = data.items.map((items) => items)
      console.log(product.value, 'product')

    }
    return {
      searchHandler,
      product,
      SfProductCard,
      productGetters,
      buttonHandler

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

