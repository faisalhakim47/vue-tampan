<template>
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
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    overflowX: { type: Boolean, default: false },
    transition: { type: String, default: 'zoom' },
    maxWidth: { type: Number, default: 480 },
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
      this.$emit('close')
    },
  },

  watch: {
    '$tampan.client': {
      deep: true,
      handler() {
        this.controlBodyOverflow()
      }
    },
  },

  mounted() {
    this.controlBodyOverflow()
    this.$tampan.$on('window:resize', this.controlBodyOverflow)
    this.$tampan.$on('modal:overflowcontrol', this.controlBodyOverflow)
  },

  updated() {
    this.controlBodyOverflow()
  },

  beforeDestroy() {
    this.$tampan.$off('window:resize', this.controlBodyOverflow)
    this.$tampan.$off('modal:overflowcontrol', this.controlBodyOverflow)
  },
}

</script>

<style>
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  z-index: 2;
}

.modal-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  max-height: 98%;
  width: 98%;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
}

.modal-header,
.modal-footer {
  box-sizing: border-box;
  flex-basis: 44px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0px 16px;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 0px;
}

.modal-content {
  overflow-y: auto;
  overflow-x: hidden;
  flex-basis: 100%;
}

.modal-content p {
  padding: 0px 16px;
  margin: 4px 0px;
}

.modal.overflow .modal-content {
  box-shadow: 8px 14px 16px -16px rgba(0, 0, 0, .4) inset, 8px -14px 16px -16px rgba(0, 0, 0, .4) inset;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>