<template>
  <page title="Tabel">
    <row>

      <column :width="{ lg: 1/2 }">
        <box>
          <table class="table table-clickable">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in 100">
                <td>{{ name() }}</td>
              </tr>
            </tbody>
          </table>
        </box>
      </column>

    </row>
  </page>
</template>

<script>
  export default {
    methods: {
      name() {
        return faker.name.findName()
      },
    },
  }

</script>