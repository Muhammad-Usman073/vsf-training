<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>User profile</h1>
      <h5>{{ userGetters.getFirstName(user) }} {{ userGetters.getLastName(user) }}</h5>
    </div>
    <div v-else>
      <h1>not logged in</h1>
    </div>
  </div>
</template>


<script>
import { onMounted} from '@nuxtjs/composition-api';
import userGetters from '~/modules/customer/getters/userGetters';
import { useUser } from '~/composables';

export default {
  components: {
    userGetters
  },
  setup() {
    let { user, isAuthenticated, load } = useUser();
    console.log("isAuthenticated: ");
    console.log(isAuthenticated);

    onMounted(async () => {
      console.log('onMounted called');
      await load();

    });
    return {
      userGetters,
      isAuthenticated,
      user
    };
  },

};
</script>
