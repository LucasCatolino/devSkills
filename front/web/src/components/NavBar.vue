<template>
    <v-app-bar app color="blue-grey lighten-1" flat>
        <div class="d-flex align-center justify-start">
            <v-img
                alt="Sportify Logo"
                class="pl-0"
                contain
                src="@/assets/logo.svg"
                transition="scale-transition"
                max-height="50"
                max-width="100"
                to="/"
                style="cursor: pointer" @click="$router.push('/')"/>
            <v-toolbar-title style="cursor: pointer" @click="$router.push('/')" class="ml-3 white--text" > Dev Skills </v-toolbar-title>
        </div>
        <v-spacer/>

        <v-btn
            text
            color="contrast"
            class="white--text"
            v-for="(item, index) in nav_buttons"
            :key="index"
            :to="item.path"
            >{{ item.title }}</v-btn>

        <v-spacer/>
        <v-spacer/>
    </v-app-bar>
</template>
<script>
export default {
    name: "NavBar",

    data: () => ({
        nav_buttons: [
            { title: "Home", path: "/" },
            { title: "Other page", path: "/ups" },
        ],

    })

}
</script>