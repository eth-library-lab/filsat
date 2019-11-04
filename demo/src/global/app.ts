import '@ionic/core';
// import { setupConfig } from '@ionic/core';

import {setupConfig as setupFilsatConfig} from '../app/services/environment/environment-config';

export default () => {
  // setupConfig({
  //   mode: 'ios'
  // });

  setupFilsatConfig({
    graphQL: 'http://localhost:8000/graphql/'
  });
};
