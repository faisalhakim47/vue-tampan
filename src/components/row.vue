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

.page__content>.row {
  margin-left: -8px;
  margin-right: -8px;
}
</style>
