<template>
  <v-snackbar
    :timeout="timeout"
    :value="true"
    color="pink lighten-3"
    text
    @input="$emit('onClose')"
  >
    <span
      v-text="text"
      class="gradient-text"
    />
  </v-snackbar>
</template>

<script>
export default {
  name: 'AppAlert',
  props: {
    text: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
  },
};
</script>
