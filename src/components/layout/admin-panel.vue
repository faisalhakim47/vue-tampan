<template>
  <div class="tampan">

    <transition name="overlay-fade">
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
          window.addEventListener('touchstart', this.touchstart)
          window.addEventListener('touchmove', this.touchmove)
          window.addEventListener('touchend', this.touchend)
          window.addEventListener('touchcancel', this.touchcancel)
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

<style>
  .tampan {
    height: 100%;
    width: 100%;
  }

  .tampan-sidebar {
    height: inherit;
    width: 250px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    transition-duration: 300ms;
    z-index: 1;
  }

  body.is-sidebar-toggleable .tampan-sidebar {
    width: 280px;
  }

  .overlay-fade-enter-active {
    transition-timing-function: ease-in-out;
    transition-property: opacity;
    transition-duration: 1200ms;
  }

  .overlay-fade-leave-active {
    transition-timing-function: ease-in-out;
    transition-property: opacity;
    transition-duration: 300ms;
    transition-delay: 100ms;
  }

  .overlay-fade-enter,
  .overlay-fade-leave-to {
    opacity: 0;
  }

  .tampan-sidebar-overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2);
  }

  .menu-groups {
    flex: 1;
    overflow-y: auto;
    list-style: none;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
    border-right: 1px solid #FFFFFF;
  }

  .menu-group-title {
    user-select: none;
    cursor: default;
    display: flex;
    height: 24px;
    align-items: center;
    padding: 0px 8px;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .menus {
    list-style: none;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
  }

  .menu-link {
    user-select: none;
    display: flex;
    height: 48px;
    align-items: center;
    font-size: 14px;
    text-decoration: none;
    transition-property: background-color;
    transition-duration: 150ms;
  }

  .is-smallscreen .menu-link {
    height: 56px;
  }

  .menu-link:hover {}

  .menu-link:active,
  .menu-link:focus {
    font-weight: 500;
  }

  .menu-link.is-active,
  .menu-link.router-link-active {
    font-weight: 500;
  }

  .menu-icon {
    display: flex;
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }

  .tampan-content {
    box-sizing: border-box;
    height: inherit;
    width: inherit;
    padding-left: 250px;
  }

  body.is-sidebar-toggleable .tampan-content {
    padding-left: 0px;
  }
</style>