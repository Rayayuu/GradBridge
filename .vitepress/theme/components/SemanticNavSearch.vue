<script setup>
import { onMounted, onBeforeUnmount } from "vue"
import { withBase } from "vitepress"

const searchHref = withBase("/search/")

function handleShortcut(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault()
    window.location.assign(searchHref)
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleShortcut)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleShortcut)
})
</script>

<template>
  <a
    class="gb-nav-semantic-search"
    :href="searchHref"
    aria-label="GradBridge 语义搜索"
  >
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>

    <span>语义搜索</span>
    <kbd>Ctrl K</kbd>
  </a>
</template>

<style scoped>
.gb-nav-semantic-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  margin-left: 14px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color .15s ease, color .15s ease, background .15s ease;
}

.gb-nav-semantic-search:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elv);
}

.gb-nav-semantic-search kbd {
  padding: 2px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-family: inherit;
  font-size: 11px;
}

@media (max-width: 760px) {
  .gb-nav-semantic-search {
    margin-left: 8px;
  }

  .gb-nav-semantic-search span,
  .gb-nav-semantic-search kbd {
    display: none;
  }
}
</style>
