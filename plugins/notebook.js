import Vue from 'vue'
import { Runtime, Inspector } from 'https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js'
import notebook from 'https://api.observablehq.com/d/3f03c8ac5dc1a903.js?v=3'

export { Runtime, Inspector, notebook }

const PObservable = {
  install (Vue, options) {
    Vue.prototype.$Observable = {
      Runtime, Inspector, notebook
    }
  }
}
Vue.use(PObservable)

export default PObservable
