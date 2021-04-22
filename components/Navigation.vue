<template>
  <nav>
    <ul class="flex flex-wrap md:flex-no-wrap justify-between mb-4 text-sm">
      <NavigationItem id="nav-overview" label="Overview" link="/" exact />
      <NavigationItem id="nav-goal1" link="/goal1"
        ><p>Goal 1</p>
        <p class="text-xs">Reading 3-8</p></NavigationItem
      >
      <NavigationItem id="nav-goal2" link="/goal2"
        ><p>Goal 2</p>
        <p class="text-xs">Reading K-3</p></NavigationItem
      >
      <NavigationItem id="nav-goal3" link="/goal3"
        ><p>Goal 3</p>
        <p class="text-xs">Math 3-8</p></NavigationItem
      >
      <NavigationItem id="nav-goal4" link="/goal4"
        ><p>Goal 4</p>
        <p class="text-xs">HS Performance</p></NavigationItem
      >
    </ul>
  </nav>
</template>

<script>
import NavigationItem from '~sdp-components/Navigation/NavigationItem'

export default {
  components: {
    NavigationItem,
  },
}
</script>
