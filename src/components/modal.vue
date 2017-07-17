<template>
  <section class="modal" :class="{ 'modal--overflow': isContentOverflow }">
    <div class="modal__overlay" @click.self="$emit('close')">
      <div class="modal__container">
        <header class="modal__header">
          <slot name="header"></slot>
        </header>
        <div ref="modal__content" class="modal__content">
          <slot></slot>
        </div>
        <footer class="modal__footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isContentOverflow: false,
    }
  },

  methods: {
    controlBodyOverflow() {
      const { modal__content } = this.$refs
      if (modal__content) {
        this.isContentOverflow = modal__content.scrollHeight > modal__content.clientHeight
      }
    }
  },

  mounted() {
    this.controlBodyOverflow()
    this.$tampan.$on('window:resize', this.controlBodyOverflow)
  },

  updated() {
    this.controlBodyOverflow()
  },

  beforeDestroy() {
    this.$tampan.$off('window:resize', this.controlBodyOverflow)
  }
}
</script>

<style>
.modal__overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.modal__container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  max-height: 98%;
  width: 98%;
  max-width: 480px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
}

.modal__header,
.modal__footer {
  box-sizing: border-box;
  flex-basis: 44px;
  max-height: 44px;
  display: flex;
  align-items: center;
  padding: 16px;
}

.modal__title {
  font-size: 18px;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 0px;
}

.modal__content {
  overflow-y: auto;
  overflow-x: hidden;
  flex-basis: 100%;
}

.modal--overflow .modal__content {
  box-shadow: 8px 14px 16px -16px rgba(0, 0, 0, .4) inset, 8px -14px 16px -16px rgba(0, 0, 0, .4) inset;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
