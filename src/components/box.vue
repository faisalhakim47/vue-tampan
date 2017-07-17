<template>
  <div class="box">
    <div class="box__header">
      <h3 class="box__title">{{ title }}</h3>
    </div>
    <div class="box__content">
      <slot></slot>
    </div>
    <div class="box__footer">
  
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

.box__content > p {
  margin: 8px 16px;
}
</style>
