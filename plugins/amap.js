import Vue from 'vue'
import AMap from 'vue-amap'
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '0a125e10974f3f7832802dbb904b29c1',
  plugin: [
    // 'AMap.Autocomplete',
    // 'AMap.PlaceSearch',
    // 'AMap.Scale',
    // 'AMap.OverView',
    // 'AMap.ToolBar',
    // 'AMap.MapType',
    // 'AMap.PolyEditor',
    // 'AMap.CircleEditor',
  ],
})
