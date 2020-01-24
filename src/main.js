import Vue from 'vue'
import App from './App.vue'
import Web3 from 'web3'
// import web3Contract from './web3/web3';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// eslint-disable-next-line
let name = 'ufegbhuietge';
// web3Contract.init()
//     .then(() => web3Contract.createBallot(name))
//     .then(() => web3Contract.getBallot(name))
//     .then((res) => {
//     // eslint-disable-next-line
//     console.log(res);
// });

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app');
