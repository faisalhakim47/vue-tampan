export default {
  props: {
    show: { type: Boolean, default: false },
    overflowX: { type: Boolean, default: false },
    transition: { type: String, default: 'zoom' },
    maxWidth: { type: [String, Number], default: 480 },
  },

  data() {
    return {
      isContentOverflow: false,
    }
  },

  methods: {
    controlBodyOverflow() {
      const { modal_content } = this.$refs
      if (modal_content) {
        this.isContentOverflow = modal_content.scrollHeight > modal_content.clientHeight
      }
    },

    close() {
      if (this.show) this.$emit('close')
    },
  },

  watch: {
    show: {
      handler(show) {
        const { activeModalList } = this.$tampan
        if (show) {
          this.$tampan.addEscGuard(this.close)
          activeModalList.unshift(this)
        } else {
          this.$tampan.removeEscGuard(this.close)
          const index = activeModalList.indexOf(this)
          if (index !== -1) activeModalList.splice(index, 1)
        }
      }
    },

    '$tampan.client': {
      deep: true,
      handler() {
        this.controlBodyOverflow()
      }
    },
  },

  mounted() {
    this.controlBodyOverflow()
    this.$tampan.$on('modal:close', this.close)
    this.$tampan.$on('window:resize', this.controlBodyOverflow)
    this.$tampan.$on('modal:overflowcontrol', this.controlBodyOverflow)
    addBackButtonGuard(this.$root)
  },

  updated() {
    this.controlBodyOverflow()
  },

  beforeDestroy() {
    this.$tampan.$off('modal:close', this.close)
    this.$tampan.$off('window:resize', this.controlBodyOverflow)
    this.$tampan.$off('modal:overflowcontrol', this.controlBodyOverflow)
  },

  template: `
    <section class="modal" :class="{ 'overflow': isContentOverflow }">

      <transition name="fade-overlay">
        <div v-if="show" class="modal-overlay"></div>
      </transition>

      <transition :name="transition">
        <div v-if="show" class="modal-wrapper" @click.self="close">
          <div class="modal-container" :style="{ maxWidth: maxWidth + 'px' }">
            <header class="modal-header">
              <slot name="header"></slot>
            </header>
            <div ref="modal_content" class="modal-content" :style="{ overflowX: overflowX ? 'auto' : 'hidden' }">
              <slot></slot>
            </div>
            <footer class="modal-footer">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </transition>

    </section>
  `
}

let isBackButtonGuarded = false
function addBackButtonGuard(root, backFn) {
  if (isBackButtonGuarded) return
  isBackButtonGuarded = true

  if (!root.$router) return

  root.$router.beforeEach((to, from, next) => {
    const activeModal = root.$tampan.activeModalList[0]

    if (!activeModal) return next()

    activeModal.close()
  })
}
