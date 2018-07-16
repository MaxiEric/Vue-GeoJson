import Vue from 'vue'
import App from './App'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../static/images/marker-icon-2x.png'),
  iconUrl: require('../static/images/marker-icon.png'),
  shadowUrl: require('../static/images/marker-shadow.png'),
});

new Vue({
  el: '#main',
  template: '<App/>',
  components: { App }
});
