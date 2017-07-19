<template>
  <div class="box">
    <div v-if="title" class="box__header">
      <h3 class="box__title">{{ title }}</h3>
    </div>
    <div class="box__content">
      <slot></slot>
    </div>
    <div class="box__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String }
  }
}
</script>

<style>
.box {
  border: 1px solid #E0E0E0;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: #FFFFFF;
  border-radius: 2px;
}

.box__header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 16px;
}

.box__title {
  font-size: 18px;
  font-weight: 300;
  margin: 0px;
}

.box__content>p {
  margin: 8px 16px;
}


.box__content>.table>thead>tr>th:first-child,
.box__content>.table>tbody>tr>td:first-child,
.box__content>.table>tfoot>tr>td:first-child {
  padding: 0px 16px;
  border-left: none;
}

.box__content>.table>thead>tr>th:last-child,
.box__content>.table>tbody>tr>td:last-child,
.box__content>.table>tfoot>tr>td:last-child {
  padding: 0px 16px;
  border-right: none;
}
</style>
