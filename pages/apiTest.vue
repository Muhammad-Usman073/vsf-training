<template>
  <div>
    <div v-if="!test">
      <h3>Loading...</h3>
    </div>
    <div v-else >
      <SfCarousel>
        <SfCarouselItem v-for="(items,index) in arrData" :key="index" >
          <SfProductCard
            :image=" items.avatar"
            :imageWidth="216"
            :imageHeight="326"
            badgeLabel=""
            badgeColor=""
            :title="items.item ? items.item.titles.default : items.name "
            linkTag=""
            :scoreRating="4"
            :reviewsCount="7"
            :maxRating="5"
            :regularPrice="items.item ?items.item.pricing.price : 'price'"
            specialPrice=""
            wishlistIcon="heart"
            isInWishlistIcon="heart_fill"
            :isInWishlist="false"
            showAddToCartButton
            :isAddedToCart="false"
            :addToCartDisabled="false"
          />
        </SfCarouselItem>
      </SfCarousel>
    </div>
  </div>
</template>
<script>
import useCustomApi from '~/composables/useCustomApi/index';
import {ref,onMounted,watch } from '@nuxtjs/composition-api'
import {SfCarousel,SfProductCard,SfHero} from '@storefront-ui/vue'
export default {
  components:{
    SfCarousel,
    SfProductCard,
    SfHero
  },
  setup(){
    let test = ref(false);
    let arrData = ref([])
   const {data,getItems} = useCustomApi()
    onMounted(async()=>{
      await getItems();
      test.value=true;
      arrData.value = data.value.map(e=>e);
    })
    return {
      SfCarousel,
      SfProductCard,
      SfHero,
     arrData,
      data,
      test
    }
  }
}
</script>

