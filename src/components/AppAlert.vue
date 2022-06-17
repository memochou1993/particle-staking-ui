<template>
  <v-snackbar
    :value="true"
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
  },
};
</script>
