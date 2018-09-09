import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage';
import CreateWallet from '@/components/CreateWallet';
import SendTransaction from '@/components/SendTransaction';
import LoadKey from '@/components/LoadKey';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/createWallet',
      name: 'CreateWallet',
      component: CreateWallet,
    },
    {
      path: '/sendTransaction',
      name: 'SendTransaction',
      component: SendTransaction,
    },
    {
      path: '/loadKey',
      name: 'loadKey',
      component: LoadKey,
    },
  ],
});
