import { h } from "vue"
import DefaultTheme from "vitepress/theme"
import SemanticSearch from "./components/SemanticSearch.vue"
import SemanticNavSearch from "./components/SemanticNavSearch.vue"
import "./custom.css"

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-title-after": () => h(SemanticNavSearch)
    })
  },

  enhanceApp({ app }) {
    app.component("SemanticSearch", SemanticSearch)
  }
}
