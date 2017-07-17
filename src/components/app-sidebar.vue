<template>
  <section class="app-sidebar">
    <transition name="overlay-fade">
      <div v-if="$tampan.isMainMenuShow && $tampan.isMainMenuToggleable" class="app-sidebar__overlay" @click="$tampan.toggleMainMenu"></div>
    </transition>
    <div class="app-sidebar__container" :style="{ 'transform': `translateX(${sidebarOffset}px)` }">
      <div class="brand">
  
      </div>
      <ul v-for="menuGroupItem in menuGroupList" class="menu-group-list" :key="menuGroupItem.name">
        <li class="menu-group-item">
          <span class="menu-group-item__title">{{ menuGroupItem.name }}</span>
          <ul v-for="menuItem in menuGroupItem.menuList" class="menu-list" :key="menuItem.route ? menuItem.route.name : menuItem.name">
            <li class="menu-item">
              <router-link v-if="menuItem.route" class="menu-item__link" :to="menuItem.route">
                <i class="menu-item__icon" :class="menuItem.iconClass">{{menuItem.iconText}}</i>
                <span class="menu-item__text">{{ menuItem.name }}</span>
              </router-link>
              <a v-else class="menu-item__link exteral-link" :href="menuItem.href" target="_blank">
                <i class="menu-item__icon" :class="menuItem.iconClass">
                  {{menuItem.iconText}}
                </i>
                <span class="menu-item__text">{{ menuItem.name }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
const sidebarWidth = 240
let timeTouchStart

export default {
  props: {
    menuGroupList: { type: Array, default: () => [] }
  },

  data() {
    return {
      isSliding: false,
      isScrolling: false,
      touchX: 0,
      touchy: 0,
      touchXStart: 0,
      touchYStart: 0,
    }
  },

  computed: {
    sidebarOffset() {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart
        console.log(this.$tampan.isMainMenuShow, this.touchX, this.touchXStart, { touchXDiff })
        if (!this.$tampan.isMainMenuShow) {
          return touchXDiff > sidebarWidth ? 0 : -sidebarWidth + touchXDiff
        } else {
          return touchXDiff < -sidebarWidth ? -sidebarWidth : (touchXDiff > 0 ? 0 : touchXDiff)
        }
      } else {
        return this.$tampan.isMainMenuShow ? 0 : -sidebarWidth
      }
    },
  },

  methods: {
    touchstart(event) {
      const touch = event.changedTouches[0]
      if (!touch) return
      console.log(this.$tampan.isMainMenuShow, touch.clientX)
      if (!this.$tampan.isMainMenuShow && touch.clientX <= 44) {
        this.isSliding = true
        this.touchX = this.touchXStart = touch.clientX
        this.touchY = this.touchYStart = touch.clientY
      }
      timeTouchStart = new Date().getTime()
    },

    touchmove(event) {
      const touch = event.changedTouches[0]
      if (!touch) return
      if (this.isSliding) {
        this.touchX = touch.clientX
      }
      if (this.$tampan.isMainMenuShow && !this.isSliding) {
        this.isSliding = true
        this.touchX = this.touchXStart = touch.clientX
      }
    },

    touchend(event) {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart
        const touchTimeDiff = new Date().getTime() - timeTouchStart
        if (
          !this.$tampan.isMainMenuShow
          && (touchXDiff > 120 || (touchXDiff > 50 && touchTimeDiff < 300))
        ) this.$tampan.showMainMenu()
        else if (
          this.$tampan.isMainMenuShow
          && (touchXDiff < -120 || (touchXDiff < -50 && touchTimeDiff < 300))
        ) this.$tampan.hideMainMenu()
        console.log({ touchXDiff, touchTimeDiff })
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
      if (this.$tampan.isMainMenuToggleable) {
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
  },
}
</script>


<style>
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
  opacity: 0
}


.app-sidebar__overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
}

.app-sidebar__container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: hidden;
  background-color: #FFFFFF;
}

.brand {
  min-height: 64px;
  max-height: 64px;
  background-color: #388E3C;
  width: 100%;
}

.is-smallscreen .brand {
  flex-basis: 56px;
  min-height: 56px;
  max-height: 56px;
}

.menu-group-list,
.menu-list {
  list-style: none;
  padding-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.menu-group-list {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #E0E0E0;
}

.menu-group-item__title {
  display: block;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #ECEFF1;
  color: #757575;
}

.menu-item__link {
  display: flex;
  height: 44px;
  align-items: center;
  font-size: 14px;
  text-decoration: none;
  transition-property: background-color;
  transition-duration: 150ms;
  color: #37474F;
}

.menu-item__link:hover {
  background-color: #EEEEEE;
}

.menu-item__link:active,
.menu-item__link:focus {
  font-weight: 500;
  color: #43A047;
}

.menu-item__link.is-active {
  font-weight: 500;
  background-color: #F5F5F5;
  color: #43A047;
}

.menu-item__icon {
  display: flex;
  height: 44px;
  width: 44px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>
