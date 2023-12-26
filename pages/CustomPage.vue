<template>
  <div>
    <div><h1>All products</h1></div>
    <div>
      <h3>filter by price:</h3>
      <div>
        <label for="from">From</label>
        <input
          id="from"
          v-model="inputFrom"
          type="number"
        >

        <label for="to">To</label>
        <input
          id="to"
          v-model="inputTo"
          type="number"
        >
      </div>
      <h3>Sort products:</h3>
      <div>
        <select v-model="selected">
          <option>ASC</option>
          <option>DESC</option>
        </select>
      </div>
    </div>
    <div class="image_container">
      <div
        v-for="(products, index) in product"
        :key="index"
      >
        <SfProductCard
          :image="getProductThumbnailImage(products)"
          :image-width="216"
          :image-height="326"
          badge-label=""
          badge-color=""
          :title="getName(products)"
          link-tag=""
          :score-rating="getAverageRating(products)"
          :reviews-count="getTotalReviews(products)"
          :regular-price="getPrice(products).regular"
          wishlist-icon="heart"
          is-in-wishlist-icon="heart_fill"
          show-add-to-cart-button
          :is-added-to-cart="true"
          :add-to-cart-disabled="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard } from '@storefront-ui/vue';
import { useProduct } from '~/composables';
import {
  getName,
  getProductThumbnailImage,
  getAverageRating,
  getPrice,
  getTotalReviews,
} from '~/modules/catalog/product/getters/productGetters';
import { onMounted, ref, watch } from '@nuxtjs/composition-api';

export default {
  components: {
    SfProductCard,
  },

  setup() {
    const product = ref([]);
    const inputFrom = ref('');
    const inputTo = ref('');
    const selected = ref();
    const { getProductList } = useProduct();

    // if i m getting filtered products
    const fetchProducts = async () => {
      const data = await getProductList({
        pageSize: '100',
      });
      product.value = data.items.map((items) => items);
      console.log(product);
    };
    const fetchFilteredProducts = async () => {
      const data = await getProductList({
        filter: {
          price: {
            from: inputFrom.value.toString(),
            to: inputTo.value.toString(),
          },
        },
        sort: {
          price: selected.value,
        },
        pageSize: '30',
      });
      product.value = data.items.map((items) => items);
      console.log(product);
    };
    // else other query that is not filtered with any query

    if (
      inputFrom.value.length === 0
      || inputTo.value.length === 0
      || selected.value.length === 0
    ) {
      onMounted(() => fetchProducts());
    } else {
      onMounted(() => fetchFilteredProducts());
    }
    let timer;
    watch([inputFrom, inputTo, selected], () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetchFilteredProducts();
      }, 1000);
    });
    return {
      product,
      getName,
      getProductThumbnailImage,
      getAverageRating,
      getPrice,
      getTotalReviews,
      inputFrom,
      inputTo,
      selected,
    };
  },
};
</script>
<style>
.image_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
