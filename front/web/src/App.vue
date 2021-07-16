<template>
  <v-app>
    <navbar/>
    <v-main class="grey lighten-2" >
      <router-view/>
    </v-main>
    <foot/>
  </v-app>
</template>

<script>
import navbar from './components/NavBar';
import foot from './components/Footer';

export default {
  name: 'App',

  components: {
    foot,
    navbar,
  },

  data: () => ({
    //
  }),
};
</script>
