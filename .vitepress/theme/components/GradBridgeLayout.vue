<script setup>
import { computed, onMounted, ref } from "vue"
import DefaultTheme, { useSidebar } from "vitepress/theme"
import SemanticNavSearch from "./SemanticNavSearch.vue"

const { hasSidebar, hasAside } = useSidebar()
const collapsed = ref(false)
const outlineCollapsed = ref(false)
const storageKey = "gradbridge-sidebar-collapsed"
const outlineStorageKey = "gradbridge-outline-collapsed"
const toggleLabel = computed(() => collapsed.value ? "展开菜单" : "收起菜单")
const outlineToggleLabel = computed(() => outlineCollapsed.value ? "展开本页目录" : "收起本页目录")

onMounted(() => {
  try {
    collapsed.value = localStorage.getItem(storageKey) === "true"
    outlineCollapsed.value = localStorage.getItem(outlineStorageKey) === "true"
  } catch {
    // The toggle still works when browser storage is unavailable.
  }
})

function toggleSidebar() {
  collapsed.value = !collapsed.value
  try {
    localStorage.setItem(storageKey, String(collapsed.value))
  } catch {
    // Keep the preference in memory for this visit.
  }
}

function toggleOutline() {
  outlineCollapsed.value = !outlineCollapsed.value
  try {
    localStorage.setItem(outlineStorageKey, String(outlineCollapsed.value))
  } catch {
    // Keep the preference in memory for this visit.
  }
}
</script>

<template>
  <DefaultTheme.Layout :class="{
    'gb-sidebar-collapsed': hasSidebar && collapsed,
    'gb-outline-collapsed': hasAside && outlineCollapsed
  }">
    <template #nav-bar-title-after>
      <SemanticNavSearch />
    </template>
    <template #layout-bottom>
      <button
        v-if="hasSidebar"
        class="gb-panel-toggle gb-sidebar-toggle"
        type="button"
        :aria-label="toggleLabel"
        :title="toggleLabel"
        :aria-expanded="!collapsed"
        aria-controls="VPSidebarNav"
        @click="toggleSidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path :d="collapsed ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        v-if="hasAside"
        class="gb-panel-toggle gb-outline-toggle"
        type="button"
        :aria-label="outlineToggleLabel"
        :title="outlineToggleLabel"
        :aria-expanded="!outlineCollapsed"
        @click="toggleOutline"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path :d="outlineCollapsed ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </template>
  </DefaultTheme.Layout>
</template>
