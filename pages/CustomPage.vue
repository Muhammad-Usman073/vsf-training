<template>
  <div>
    <div>
      <h1>All products</h1>
    </div>
    <div class="image_container">
      <div v-for="(products, index) in product" :key="index">
        <SfProductCard
          :image="getProductThumbnailImage(products)"
          :imageWidth="216"
          :imageHeight="326"
          badgeLabel=""
          badgeColor=""
          :title="getName(products)"
          linkTag=""
          :scoreRating="getAverageRating(products)"
          :reviewsCount="getTotalReviews(products)"
          :regularPrice="getPrice(products).regular"
          wishlistIcon="heart"
          isInWishlistIcon="heart_fill"
          showAddToCartButton
          :isAddedToCart="true"
          :addToCartDisabled="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard } from "@storefront-ui/vue";
import { useProduct } from "~/composables";
import {
  getName,
  getProductThumbnailImage,
  getAverageRating,
  getPrice,
  getTotalReviews,
} from "~/modules/catalog/product/getters/productGetters";
import { onMounted } from "@nuxtjs/composition-api";
import { ref } from "@nuxtjs/composition-api";
export default {
  components: {
    SfProductCard,
  },
  setup() {
    const product = ref([]);
   const {getProductList} = useProduct()
    onMounted(async () => {
      const data = await getProductList({
        filter: {
          price: {
            from: "1",
            to: "40",
          },
        },
        sort:{
    price:"ASC"
  },pageSize:"50"
      });
      product.value = data.items.map((items) => items);
      console.log(product);
    });
    console.log(product);
    return {
      product,
      getName,
      getProductThumbnailImage,
      getAverageRating,
      getPrice,
      getTotalReviews,
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
