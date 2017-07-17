<template>
  <page title="Modal" titleButton="back">
    <box title="Custom Modal">
      <p>
        <button-tampan @click="openModal" iconClass="material-icons" iconText="alarm">Test Modal</button-tampan>
      </p>
    </box>
  </page>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: 'Herry'
      }
    }
  },

  methods: {
    openModal() {
      const option = {
        type: 'form',
        title: 'Test Modal',
        body: {
          syncValue: this.data,
          fieldList: [
            { label: 'Nama', type: 'text', target: 'name' },
            { label: 'Nama', type: 'textarea', target: 'name' },
            { label: 'Nama', type: 'text', target: 'name' },
            { label: 'Nama', type: 'text', target: 'name' },
          ]
        },
        footer: [
          {
            type: 'button',
            text: 'Tutup',
            iconClass: 'material-icons',
            iconText: 'close',
            onClick: () => {
              modal.close()
            }
          }
        ],
        onSubmit: () => modal.close()
      }
      const modal = this.$tampan.createModal(option)
    }
  }
}
</script>
