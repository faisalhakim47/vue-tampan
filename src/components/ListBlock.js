import { request } from '../tools/request.js';
import { throttle } from '../tools/throttle.js';

export default {
  props: {
    /**
     * props src is an endpoint that
     * - ?get=size&... returns the length of the data
     * - ?get=data&skip={skip}&limit={limit}&... return the data
     */
    src: { type: [String, Array] },
    query: { type: [String], default: '' },
    scrollPosition: { type: [Number], default: 0 },
    activeKey: { type: [Number, String] },
    rowHeight: { type: [Number], default: 48 },
    numberOfColumn: { type: [Number], default: 1 },
    numberOfGroup: { type: [Number], default: 3 },
    loadDelay: { type: [Number], default: 300 },
    paddingTop: { type: [Number], default: 0 },
    paddingBottom: { type: [Number], default: 0 },
    paddingLeft: { type: [Number], default: 0 },
    paddingRight: { type: [Number], default: 0 },
    gap: { type: [Number], default: 0 },
    // getSizeFn: { type: [Function] },
    // getDataFn: { type: [Function] },
  },

  data() {
    return {
      isLoading: false,
      listBlockHeight: 0,
      numberOfItem: 0,
      limit: 0,
      skip: null,
      items: [],
      loadingSkip: 0,
    };
  },

  computed: {
    isStaticSrc() {
      return Array.isArray(this.src);
    },

    groupSize() {
      const numberOfRow = Math.round(this.listBlockHeight / this.rowHeight);
      return numberOfRow * this.numberOfColumn;
    },

    prevNumberOfGroup() {
      return Math.floor(this.numberOfGroup / 2);
    },

    listHeight() {
      return (
        this.rowHeight * (this.numberOfItem / this.numberOfColumn) +
        this.paddingTop +
        this.paddingBottom -
        this.gap -
        this.gap
      );
    },

    listPaddingTop() {
      const paddingTop =
        (this.skip * this.rowHeight) / this.numberOfColumn +
        this.paddingTop -
        this.gap;
      return paddingTop < 0 ? 0 : paddingTop;
    },

    maxSkip() {
      let nextSkip = this.numberOfItem - this.limit;
      if (nextSkip < 0) return 0;
      return nextSkip;
    },
  },

  methods: {
    async fetchNumberOfItem() {
      if (this.isStaticSrc) {
        this.numberOfItem = this.src.length;
        return Promise.resolve();
      }
      const query = `?get=size${this.query ? `&${this.query}` : ''}`;
      const fetching = request('GET', this.src + query)
        .then((result) => {
          if (result.status === 200) {
            this.numberOfItem = result.data.size;
          } else {
            console.warn(result);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
      await this.$tampan.useLoadingState(fetching);
    },

    async fetchList(skip = 0) {
      if (this.isStaticSrc) {
        const data = this.src.slice(skip, skip + this.limit);
        this.items = data;
        this.skip = skip;
        this.$emit('data', data);
        return Promise.resolve();
      }
      this.isLoading = true;
      const numberOfItem = this.numberOfItem;
      this.loadingSkip = skip;
      const query = `?get=data&skip=${skip}&limit=${this.limit}${
        this.query ? `&${this.query}` : ''
      }`;
      const url = location.origin + this.src + query;
      const fetching = request('GET', url)
        .then((result) => {
          if (this.loadingSkip !== skip) return;
          if (this.numberOfItem !== numberOfItem) return;
          if (result.status === 200) {
            result.data.forEach((data) => {
              data.key = data.key || data.id;
            });
            this.items = result.data;
            this.skip = skip;
            this.$emit('data', result.data);
          } else {
            console.warn(result);
          }
        })
        .catch((error) => {
          console.warn(error);
        })
        .then(() => {
          this.isLoading = false;
        });
      await this.$tampan.useLoadingState(fetching);
    },

    async refreshList() {
      const scrollTop = this.$refs.list_block.scrollTop;
      const offset = scrollTop - this.listBlockHeight * this.prevNumberOfGroup;
      let skip =
        Math.floor(between(offset, 0, offset) / this.rowHeight) *
        this.numberOfColumn;
      skip = between(skip, 0, this.maxSkip);
      if (this.skip === skip && !this.forceRefresh) return;
      await this.fetchList(skip);
    },

    async reloadList() {
      this.forceRefresh = true;
      await this.refreshList();
      this.forceRefresh = false;
    },

    async computeLayout() {
      this.listBlockHeight = parseInt(
        getComputedStyle(this.$refs.list_block).height,
        10
      );
      this.limit = this.groupSize * this.numberOfGroup;
      await this.$nextTick();
      await this.fetchNumberOfItem();
      await this.fetchList();
      await this.$nextTick();
      this.$refs.list_block.scrollTop = this.scrollPosition;
    },

    dataScope(index, item) {
      return Object.assign({ index }, item);
    },
  },

  watch: {
    src() {
      this.reloadList();
    },
  },

  async mounted() {
    this.$tampan.$on('screen_resize', this.computeLayout);
    this.$watch(
      'query',
      throttle(() => {
        this.computeLayout();
      }, 300)
    );
    this.$watch('skip', (skip) => {
      this.$emit('scroll', (skip + this.groupSize) * this.rowHeight);
    });

    await this.computeLayout();
    this.refreshListInterval = setInterval(this.refreshList, this.loadDelay);

    this.$on('reload', this.reloadList);
  },

  beforeDestroy() {
    clearInterval(this.refreshListInterval);
    this.$tampan.$off('screen_resize', this.computeLayout);
  },

  template: `
  <section ref="list_block" class="list-block">
    <slot v-if="items.length === 0 && !isLoading" name="content-empty"></slot>
    <ul
      v-if="items.length !== 0"
      class="list-block-list"
      :style="{
        height: listHeight + 'px',
        paddingTop: listPaddingTop + 'px',
        paddingBottom: paddingBottom - gap + 'px',
        paddingLeft: paddingLeft - gap + 'px',
        paddingRight: paddingRight - gap + 'px',
      }"
    >
      <li
        v-for="(item, index) in items"
        :key="item.key || item.id"
        class="list-block-item"
        :class="item.key === activeKey && 'active'"
        :style="{
          height: rowHeight + 'px',
          width: 100 / numberOfColumn + '%',
          padding: gap + 'px',
        }"
        @click="$emit('select', item)"
      ><slot name="content" :data="dataScope(index, item)"></slot></li>
      <li v-if="isLoading">
        <slot name="content-loading"></slot>
      </li>
    </ul>
  </section>
  `,
};

/**
 * @param {number} num
 * @param {number} min
 * @param {number} max
 */
function between(num, min, max) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}
