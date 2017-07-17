<template>
  <page title="Formulir" titleButton="menu">
    <row>
      <column :sm="3/3" :md="2/3">
        <box title="Input Pilihan Tunggal">
          <field label="Input Select">
            <input-select v-model="select" :options="options"></input-select>
          </field>
          <field label="Input Switch">
            <input-switch v-model="switchVal"></input-switch>
          </field>
        </box>
  
        <box title="Input Tanggal">
          <field label="Input Date Simple">
            <input-date-simple v-model="date"></input-date-simple>
          </field>
        </box>
  
        <box title="Input Lokal Indonesia">
          <field label="Input Address">
            <idn-input-address v-model="address"></idn-input-address>
          </field>
        </box>
      </column>
  
      <column :sm="3/3" :md="1/3">
        <box title="Input Teks dan Angka">
          <field label="Input Text">
            <input-text v-model="text"></input-text>
          </field>
          <field label="Input Text Area">
            <input-textarea v-model="text"></input-textarea>
          </field>
          <field label="Input Number">
            <input-number v-model="number"></input-number>
          </field>
        </box>
      </column>
    </row>
  
  </page>
</template>

<script>
export default {
  data() {
    return {
      text: 'text',
      number: 1,
      select: 1,
      date: new Date().toISOString(),
      switchVal: true,
      address: '{}',
      options: [
        { value: 1, label: 'Satu' },
        { value: 2, label: 'Dua' },
        { value: 3, label: 'Tiga' },
        { value: 4, label: 'Empat' },
      ]
    }
  }
}
</script>
