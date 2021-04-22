<template>
  <div class="p-1">
    <h2 v-if="title" class="text-lg font-semibold m-2">{{ title }}</h2>
    <div class="flex flex-col" :style="{ 'padding-left': indentLinks }">
      <nuxt-link
        v-for="(link, lindex) in links"
        :key="lindex"
        :to="link.link"
        exact
        class="outline-none focus:outline-none text-left cursor-pointer px-2 py-2 hover:font-semibold"
      >
        {{ link.label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // required
    // an array of objects with { link: string, label: string }
    links: {
      type: Array,
      required: true,
    },
    // optional
    title: {
      type: String,
      required: false,
      default: '',
    },
    indentLinks: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
