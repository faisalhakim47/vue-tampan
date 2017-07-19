<template>
  <page title="Tabel" title-button="menu">
    <box>
      <table-cluster :column-map="columnMap" :data-provider="tableProvider" :row-height="44"></table-cluster>
    </box>
  </page>
</template>

<script>
export default {
  data() {
    return {
      columnMap: {
        'No.': 'num',
        'Progress': 'progress',
      },
    }
  },

  methods: {
    tableProvider({ skip, limit }) {
       const length = 100000
       const items = []
      console.log({ skip, limit })
      //  do {
      //   items.push({
      //     num: skip,
      //     progress: `${skip/10000*100}%`
      //   })
      //   skip += 1
      //  } while (skip !== limit)
       return Promise.resolve({ items, length })
    },
  }
}
</script>

