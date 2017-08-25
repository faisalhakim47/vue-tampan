<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style>
.row {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-left: -4px;
  margin-right: -4px;
}

.page-content>.row {
  margin-left: -8px;
  margin-right: -8px;
}

.box-content > .row {
  padding-left: 16px;
  padding-right: 16px;
}

.is-smallscreen .box-content > .row {
  padding-left: 12px;
  padding-right: 12px;
}
</style>
