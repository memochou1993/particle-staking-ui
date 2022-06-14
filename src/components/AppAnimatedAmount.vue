<template>
  <span
    v-text="Number(number / (10 ** decimals)).toFixed(6)"
  />
</template>

<script>
export default {
  name: 'AppAnimatedAmount',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    decimals: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      interval: null,
      number: 0,
    };
  },
  created() {
    this.number = this.count;
  },
  watch: {
    count() {
      clearInterval(this.interval);
      if (this.count === this.number) {
        return;
      }
      this.interval = setInterval(() => {
        let change = (this.count - this.number) / 10;
        change = change >= 0 ? Math.ceil(change) : Math.floor(change);
        this.number += change;
      }, 1000 * 0.1);
    },
  },
};
</script>
