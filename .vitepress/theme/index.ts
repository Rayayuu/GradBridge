import DefaultTheme from "vitepress/theme"
import SemanticSearch from "./components/SemanticSearch.vue"
import GradBridgeLayout from "./components/GradBridgeLayout.vue"
import "./custom.css"

export default {
  extends: DefaultTheme,

  Layout: GradBridgeLayout,

  enhanceApp({ app }) {
    app.component("SemanticSearch", SemanticSearch)
  }
}
