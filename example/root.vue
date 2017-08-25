<template>
  <vue-tampan ref="tampan" :menuGroups="menuGroups">

    <template slot="header">
      <div class="brand">
        <h1>VUE TAMPAN</h1>
      </div>
      <div class="account">

      </div>
    </template>

    <template slot="content">
      <router-view></router-view>
    </template>

  </vue-tampan>
</template>

<script>
import { router } from './router'

export default {
  router,

  el: '#app',

  data() {
    return {
      menuGroups: [
        {
          name: 'About',
          menus: [
            { name: 'Perkenalan', iconText: 'info_outline', route: { name: 'introduction' } },
          ]
        },
        {
          name: 'Elemen',
          menus: [
            { name: 'Tombol', iconText: 'assignment', route: { name: 'button' } },
            { name: 'Tabel', iconText: 'assignment', route: { name: 'table' } },
          ]
        },
        {
          name: 'Komponen',
          menus: [
            { name: 'Formulir', iconText: 'assignment', route: { name: 'form' } },
          ]
        },
      ]
    }
  },

  mounted() {
    this.$watch(() => {
      const style = this.$refs.tampan.$el.style
      const client = this.$tampan.client
      style.height = `${client.height}px`
      style.width = `${client.width}px`
    })
  },
}
</script>

<style>
.brand > h1 {
  font-size: 20px;
  text-align: center;
  line-height: 56px;
  margin: 0px;
  background-color: #388E3C;
  color: #FFFFFF;
  font-weight: 500;
}
</style>