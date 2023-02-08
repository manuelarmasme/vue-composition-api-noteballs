<template>
  <nav
    class="navbar is-success"
    aria-label="main navigation"
    role="navigation"
  >

  <div class="container is-max-desktop px-2">
    <div class="navbar-brand">
      <div class="navbar-item is-size-4 is-family-monospace" >
        Noteballs
      </div>

      <a
        @click.prevent="showMobileNav = !showMobileNav"
        class="navbar-burger"
        :class="{ 'is-active': showMobileNav }"
        aria-expanded="false"
        aria-label="menu"
        data-target="navbarBasicExample"
        role="button"
        ref="navbarBurgerRef"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': showMobileNav }"
      ref="navbarMenuRef"
    >

      <div class="navbar-start">
        <button
          v-if="storeAuth.user.id"
          @click="logOut"
          class="button is-small is-info mt-3 ml-3"
        >
          Log out - {{ storeAuth.user.email }}
        </button>
      </div>

      <div class="navbar-end">
        <router-link
          @click="showMobileNav= false"
          to="/"
          class="navbar-item"
          active-class="is-active"
        >
          Notes
        </router-link>

        <router-link
          @click="showMobileNav= false"
          to="/stats"
          class="navbar-item"
          active-class="is-active"
        >
          Stats
        </router-link>

      </div>
    </div>
  </div>
  </nav>
</template>

<script setup>

/* imports */
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth'

/* store */
const storeAuth = useStoreAuth()

/* Show Mobile Navbar */
const showMobileNav = ref(false)

/* click outside menu */

const navbarMenuRef= ref(null)
const navbarBurgerRef= ref(null)

onClickOutside(navbarMenuRef, () => {
  showMobileNav.value = false
  }, {
    ignore: [navbarBurgerRef]
  })

/* log out */

const logOut = ()=>{
  showMobileNav.value = false
  storeAuth.logOutUser()
}
</script>

<style>

@media (max-width: 1023px){
  .navbar-menu{
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>