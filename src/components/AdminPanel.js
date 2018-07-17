let timeTouchStart

export default {
  props: {
    menuGroups: { type: Array, default: () => [] },
    sidebarWidth: { type: Number, default: 240 },
  },

  data() {
    return {
      isSliding: false,
      touchX: 0,
      touchXStart: 0,
      isBypassNavigationGuard: false,
    }
  },

  computed: {
    isModalShow() {
      return this.$tampan.activeModalList.length !== 0
    },

    isSidebarVisible() {
      if (!this.$tampan.isSidebarToggleable) return true
      if (this.$tampan.isSidebarShow) return true
      return false
    },

    sidebarOffset() {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart
        if (this.isSidebarVisible) {
          return touchXDiff < -this.sidebarWidth
            ? -this.sidebarWidth
            : touchXDiff > 0 ? 0 : touchXDiff
        } else {
          return touchXDiff > this.sidebarWidth ? 0 : -this.sidebarWidth + touchXDiff
        }
      } else {
        return this.isSidebarVisible ? 0 : -this.sidebarWidth
      }
    },
  },

  methods: {
    touchstart(event) {
      if (this.isModalShow) return
      const touch = event.changedTouches[0]
      if (!touch) return
      if (!this.$tampan.isSidebarShow && touch.clientX <= 44) {
        this.isSliding = true
        this.touchX = this.touchXStart = touch.clientX
      }
      timeTouchStart = new Date().getTime()
    },

    touchmove(event) {
      if (this.isModalShow) return
      const touch = event.changedTouches[0]
      if (!touch) return
      if (this.isSliding) {
        this.touchX = touch.clientX
      }
      else if (this.$tampan.isSidebarShow) {
        this.isSliding = true
        this.touchX = this.touchXStart = touch.clientX
      }
    },

    touchend() {
      if (this.isModalShow) return
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart
        const touchTimeDiff = new Date().getTime() - timeTouchStart
        if (
          !this.$tampan.isSidebarShow
          && (touchXDiff > 120 || (touchXDiff > 16 && touchTimeDiff < 300))
        ) this.$tampan.showSidebar()
        else if (
          this.$tampan.isSidebarShow
          && (touchXDiff < -120 || (touchXDiff < -16 && touchTimeDiff < 300))
        ) this.$tampan.hideSidebar()
      }
      this.touchclear()
    },

    touchclear() {
      if (this.isModalShow) return
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
        window.addEventListener('touchcancel', this.touchclear, { passive: true })
      } else {
        window.removeEventListener('touchstart', this.touchstart)
        window.removeEventListener('touchmove', this.touchmove)
        window.removeEventListener('touchend', this.touchend)
        window.removeEventListener('touchcancel', this.touchclear)
      }
    })

    this.unwatch = this.$watch(() => {
      const style = this.$refs.sidebar.style
      style.transform = `translateX(${this.sidebarOffset}px)`
      if (this.isSliding) style.transition = 'none'
      else style.removeProperty('transition')
    })

    this.$router.beforeEach((to, from, next) => {
      if (this.$tampan.isSidebarToggleable && this.isSidebarVisible) {
        this.$nextTick().then(() => {
          this.$tampan.isSidebarShow = false
          next(this.isBypassNavigationGuard)
          this.isBypassNavigationGuard = false
        })
        console.warn(1, 'GUARDED')
      }
      else if (this.$tampan.escapeGuards.length !== 0) {
        const escape = this.$tampan.escapeGuards.shift()
        if (typeof escape === 'function') escape()
        console.warn(2, 'GUARDED')
        next(false)
      }
      else next()
    })
  },

  beforeDestroy() {
    this.unwatch()
  },

  template: `
    <div class="tampan admin-panel" :style="{ width: $tampan.client.width + 'px', height: $tampan.client.height + 'px' }">

      <main
        role="main"
        class="tampan-content"
        :style="{ paddingLeft: ($tampan.isSidebarToggleable ? 0 : sidebarWidth) + 'px' }"
      >
        <slot name="content"></slot>
      </main>

      <transition name="fade-overlay">
        <div v-if="$tampan.isSidebarShow && $tampan.isSidebarToggleable" class="tampan-sidebar-overlay" @click="$tampan.toggleSidebar"></div>
      </transition>

      <aside ref="sidebar" class="tampan-sidebar" :style="{ width: sidebarWidth + 'px' }">
        <header v-if="$slots.header" class="tampan-header">
          <slot name="header"></slot>
        </header>

        <nav class="tampan-navigation" role="navigation">
          <ul class="menu-groups">
            <li class="menu-group" v-for="menuGroup in menuGroups" :key="menuGroup.name">
              <span class="menu-group-title">{{ menuGroup.name }}</span>
              <ul v-for="menu in menuGroup.menus" class="menus" :key="menu.route ? menu.route.name : menu.name">
                <li class="menu" @click="isBypassNavigationGuard = true">
                  <router-link v-if="menu.route" class="menu-link" :to="menu.route" :exact="menu.exact">
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
        </nav>
      </aside>

    </div>
  `
}
