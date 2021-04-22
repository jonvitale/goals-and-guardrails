<template>
  <div>
    <div class="container mx-auto px-2 lg:px-6 py-4 md:py-6">
      <Header>
        <div class="text-3xl font-semibold">
          Board of Education | Progress Monitoring
        </div>
      </Header>
      <br />
      <Navigation />
      <br />
      <SubNavigation />
      <br />
      <Nuxt />
      <br />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from '~sdp-components/Header/Header'
import Navigation from '~/components/Navigation'
import SubNavigation from '~/components/SubNavigation'
import Footer from '~sdp-components/Footer/Footer'

export default {
  components: {
    Header,
    Navigation,
    SubNavigation,
    Footer,
  },
  computed: {
    print() {
      return this.$route.query.print === 'true' ?? false
    },
  },
}
</script>
