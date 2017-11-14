<template>
  <div class="admin-panel">

    <transition name="fade-overlay">
      <div v-if="$tampan.isSidebarShow && $tampan.isSidebarToggleable" class="tampan-sidebar-overlay" @click="$tampan.toggleSidebar"></div>
    </transition>

    <section class="tampan-sidebar" :style="sidebarStyle">
      <header v-if="$slots.header" class="tampan-header">
        <slot name="header"></slot>
      </header>

      <ul role="navigation" class="menu-groups">
        <li class="menu-group" v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <span class="menu-group-title">{{ menuGroup.name }}</span>
          <ul v-for="menu in menuGroup.menus" class="menus" :key="menu.route ? menu.route.name : menu.name">
            <li class="menu">
              <router-link v-if="menu.route" class="menu-link" :to="menu.route">
                <i class="menu-icon" :class="menu.iconClass || 'material-icons'">{{ menu.iconText }}</i>
                <span class="menu-text">{{ menu.name }}</span>
              </router-link>
              <a v-else class="menu-link exteral-link" :href="menu.href" target="_blank">
                <i class="menu-icon" :class="menu.iconClass || 'material-icons'">
                  {{ menu.iconText }}
                </i>
                <span class="menu-text">{{ menu.name }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

    </section>

    <section role="main" class="tampan-content">
      <slot name="content"></slot>
    </section>

  </div>
</template>

<script>
const sidebarWidth = 280
let timeTouchStart

export default {
  props: {
    menuGroups: { type: Array, default: () => [] },
  },

  data() {
    return {
      isSliding: false,
      isScrolling: false,
      touchX: 0,
      touchXStart: 0,
    }
  },

  computed: {
    sidebarOffset() {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart
        if (!(this.$tampan.isSidebarVisible || !this.menuGroups.length)) {
          return touchXDiff > sidebarWidth ? 0 : -sidebarWidth + touchXDiff
        } else {
          return touchXDiff < -sidebarWidth ? -sidebarWidth : (touchXDiff > 0 ? 0 : touchXDiff)
        }
      } else {
        return this.$tampan.isSidebarVisible ? 0 : -sidebarWidth
      }
    },

    sidebarStyle() {
      const style = { 'transform': `translateX(${this.sidebarOffset}px)` }
      if (this.isSliding) style['transition'] = 'none'
      return style
    },
  },

  methods: {
    touchstart(event) {
      const touch = event.changedTouches[0]
      if (!touch) return
      if (!this.$tampan.isSidebarShow && touch.clientX <= 44) {
        this.isSliding = true
        this.touchX = this.touchXStart = touch.clientX
      }
      timeTouchStart = new Date().getTime()
    },

    touchmove(event) {
      const touch = event.changedTouches[0]
      if (!touch) return
      if (this.isSliding) {
        this.touchX = touch.clientX
      }
      if (this.$tampan.isSidebarShow && !this.isSliding) {
        this.isSliding = true
        this.touchX = this.touchXStart = touch.clientX
      }
    },

    touchend(event) {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart
        const touchTimeDiff = new Date().getTime() - timeTouchStart
        if (
          !this.$tampan.isSidebarShow
          && (touchXDiff > 120 || (touchXDiff > 50 && touchTimeDiff < 300))
        ) this.$tampan.showSidebar()
        else if (
          this.$tampan.isSidebarShow
          && (touchXDiff < -120 || (touchXDiff < -50 && touchTimeDiff < 300))
        ) this.$tampan.hideSidebar()
      }
      this.touchX = this.touchXStart = 0
      this.isSliding = false
    },

    touchcancel() {
      this.touchX = this.touchXStart = 0
      this.isSliding = false
    },
  },

  mounted() {
    this.$watch(() => {
      if (this.$tampan.isSidebarToggleable) {
        window.addEventListener('touchstart', this.touchstart, { passive: true })
        window.addEventListener('touchmove', this.touchmove, { passive: true })
        window.addEventListener('touchend', this.touchend, { passive: true })
        window.addEventListener('touchcancel', this.touchcancel, { passive: true })
      } else {
        window.removeEventListener('touchstart', this.touchstart)
        window.removeEventListener('touchmove', this.touchmove)
        window.removeEventListener('touchend', this.touchend)
        window.removeEventListener('touchcancel', this.touchcancel)
      }
    })

    this.$router.beforeEach((to, from, next) => {
      if (this.$tampan.isSidebarToggleable) {
        this.$tampan.isSidebarShow = false
      }
      next()
    })
  },
}

</script>