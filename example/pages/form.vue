<template>
  <page title="Formulir">
    <row>

      <column :width="{ md: 1/2 }">
        <box title="Normal Input 2">
          <field label="Nama">
            <input type="text">
          </field>
          <field label="NIK">
            <input type="number">
          </field>
          <field label="Nomor Syahadah">
            <input type="text">
          </field>
          <field label="Alamat">
            <input-address-ind></input-address-ind>
          </field>
          <field label="Mulai Aktif Mengajar">
            <input-date></input-date>
          </field>
          <field label="Nomor Telepon">
            <input type="tel">
          </field>
          <field label="Email">
            <input type="email">
          </field>
          <div class="button-group" style="display: flex; justify-content: space-between; flex-direction: row-reverse;">
            <button-tampan class="positive" iconText="check">Primary</button-tampan>
            <button-tampan iconText="info_outline">Secondary</button-tampan>
          </div>
        </box>
      </column>

    </row>
  </page>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          name: 'Faisal Hakim',
          nik: '337455676578437',
          name: 'Faisal Hakim',
          name: 'Faisal Hakim',
        }
      }
    }
  }

</script>