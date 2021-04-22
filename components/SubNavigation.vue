<template>
  <nav>
    <ul class="flex flex-wrap md:flex-no-wrap justify-between mb-4 text-sm">
      <NavigationItem id="nav-goal" label="Annual" :link="`/${goal}`" exact />
      <NavigationItem
        id="nav-fall"
        label="Fall"
        :link="`/${goal}/fall`"
        exact
      />
      <NavigationItem
        id="nav-winter"
        label="Winter"
        :link="`/${goal}/winter`"
        exact
        :append="false"
      />
      <NavigationItem
        id="nav-spring"
        label="Spring"
        :link="`/${goal}/spring`"
        exact
      />
    </ul>
  </nav>
</template>

<script>
import NavigationItem from '~sdp-components/Navigation/NavigationItem'

export default {
  components: {
    NavigationItem,
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    goal() {
      const splitpath = this.currentRouteName.split('/')
      if (splitpath.length > 0) {
        return splitpath[0]
      } else {
        return ''
      }
    },
  },
}
</script>
