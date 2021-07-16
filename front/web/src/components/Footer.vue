<template>
  <v-footer color="blue-grey darken-4" dark padless app>
    <div class="d-flex align-center justify-start ml-5">
          <strong>Copyright: Lucas Catolino</strong>
    </div>
          <v-btn v-for="icon in icons" :key="icon" dark icon href="https://www.linkedin.com/in/lucas-catolino-431b52167/" target="_blank">
            <v-icon size="22px">
              {{ icon }}
            </v-icon>
          </v-btn>
          <v-spacer/>
    <div class="mr-5">
      <strong>All rights reserved</strong>
    </div>

  </v-footer>
</template>


<script>
export default {
  data: () => ({
    icons: [
      'mdi-linkedin',
    ],
  }),
}
</script>

<style scoped>

</style>