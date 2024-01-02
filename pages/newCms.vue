<template>
  <div>
    <div v-if="isAuthenticated">
      <content-block :content=" userBlock " title="user block"/>
    </div>
    <div v-else>
      <content-block :content=" guestBlock " title="guest block"/>
    </div>
  </div>
</template>
<script>
import {onMounted, ref} from '@nuxtjs/composition-api';
import ContentBlock from '~/components/ContentBlock.vue';
import ContentBlocks from '~/components/ContentBlocks.vue';
import {useContent, useUser} from '~/composables';
import userGetters from '~/modules/customer/getters/userGetters';

export default {
  components: {
    ContentBlock,
    ContentBlocks
  },
  setup() {
    const userBlock = ref(null)
    const guestBlock = ref(null)
    const {loadBlocks} = useContent();
    const {
      isAuthenticated,
      load
    } = useUser()
    onMounted(async () => {
      await load();
      const newBlock = await loadBlocks({identifiers: ['my-block', 'guest-block']})
      const blockValue = newBlock.map(items => items)
      userBlock.value = blockValue?.[0].content
      guestBlock.value = blockValue?.[1].content
    })
    return {
      ContentBlock,
      ContentBlocks,
      isAuthenticated,
      userBlock,
      guestBlock
    }
  }

}

</script>
