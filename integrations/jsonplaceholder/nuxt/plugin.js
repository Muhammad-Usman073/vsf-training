import {integrationPlugin} from '@vue-storefront/core';

export default integrationPlugin(({ integration }) => {
  const configuration = {};
  integration.configure('newIntegration', configuration)
});
