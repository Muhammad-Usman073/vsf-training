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
  <div v-for="(products) in product">

      <SfImage
        :src="productGetters.getProductThumbnailImage(products)"
        alt="Vila stripe maxi shirt dress"
        :width="140"
        :height="200"
        class="product__gallery"
        image-tag="nuxt-img"
        thumb-image-tag="nuxt-img"
      />
          <SfHeading
            :level="1"
            :title="productGetters.getName(products)"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfPrice :regular="'$'+productGetters.getPrice(products).regular"/>
          <SfAddToCart
            v-if="products"
            v-model="qty"
            class="product__add-to-cart"
            @click="addToCartHandler"
          />
  </div>
  </div>
</template>
<script>
import {
  SfImage,
  SfGallery,
  SfHeading,
  SfPrice,
  SfRating,
  SfIcon,
  SfTabs,
  SfProperty,
  SfButton,
  SfReview,
  SfAddToCart,
  SfColor,
  SfSelect,
  SfBreadcrumbs,
  SfNotification, SfProductCard, SfProductCardHorizontal,
} from '@storefront-ui/vue';
import {ref} from '@nuxtjs/composition-api';
import useProduct from '~/modules/catalog/product/composables/useProduct';
import productGetters from '~/modules/catalog/product/getters/productGetters';

export default {
  name: 'Product',
  components: {
    SfImage,
    SfGallery,
    SfHeading,
    SfPrice,
    SfRating,
    SfIcon,
    SfTabs,
    SfProperty,
    SfButton,
    SfReview,
    SfAddToCart,
    SfColor,
    SfSelect,
    SfBreadcrumbs,
    SfNotification,
    SfProductCard,
    SfProductCardHorizontal
  },
  setup() {
    const searchHandler = ref('');
    const product = ref([]);
    const prodDetail = ref([])
    const qty = ref("")
    const {
      getProductList,
      getProductDetails,
      getProductPath
    } = useProduct();
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
          }
        }
      )
      prodDetail.value = productDetail.items.map((items) => items);
      product.value = productList.items.map((items) => items);

       console.log(product.value, 'product list')
      console.log(prodDetail.value, 'product detail')
    }
    const addToCartHandler = ()=>{
      console.log("add to cart handler")
      console.log(qty.value)
    }

    return {
      searchHandler,
      product,
      SfProductCard,
      productGetters,
      getProductPath,
      prodDetail,
      buttonHandler,
      addToCartHandler,
      qty
    }
  }


}
;
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-xs) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }

  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }

  &__count {
    @include font(
        --count-font,
        var(--font-weight--normal),
        var(--font-size--sm),
        1.4,
        var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    color: var(--c-link);
    @include font(
        --product-description-font,
        var(--font-weight--light),
        var(--font-size--base),
        1.6,
        var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
        --product-color-font,
        var(--font-weight--normal),
        var(--font-size--lg),
        1.6,
        var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(
        --additional-info-font,
        var(--font-weight--light),
        var(--font-size--sm),
        1.6,
        var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.notification {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  --notification-border-radius: 0;
  --notification-max-width: 100%;
  --notification-background: var(--c-link);
  --notification-font-size: var(--font-size--sm);
  --notification-font-family: var(--font-family--primary);
  --notification-font-weight: var(--font-weight--normal);
  --notification-padding: var(--spacer-base) var(--spacer-lg);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter {
  transform: translateY(40px);
}

.slide-leave-to {
  transform: translateY(-80px);
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
Copy
