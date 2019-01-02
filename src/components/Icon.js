export default {
  props: {
    imgSrc: { type: [String] },
    alt: { type: [String], default: '' },
  },

  template: `
    <img v-if="imgSrc" class="icon" :src="imgSrc" :alt="alt">
    <span v-else class="icon"><slot></slot></span>
  `,
};
