<template>
  <page title="Tombol">
    <row>
      <column :width="{ lg: 1/2 }">
        <box title="Tombol Normal">
          <div class="button-group">
            <button-tampan class="primary" iconText="check">Primary</button-tampan>
            <button-tampan class="secondary" iconText="info_outline">Secondary</button-tampan>
            <button-tampan iconText="close">Normal</button-tampan>
          </div>
        </box>
      </column>
    </row>
  </page>
</template>