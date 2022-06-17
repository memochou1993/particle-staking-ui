<template>
  <v-card>
    <v-card-title class="justify-center text-center text-h4 text-uppercase font-weight-bold gradient-text">
      {{ text }}
    </v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
          {{ days }} Days
        </v-col>
        <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
          {{ hours }} Hours
        </v-col>
        <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
          {{ minutes }} Minutes
        </v-col>
        <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
          {{ seconds }} Seconds
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddCountdownTimer',
  props: {
    text: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      default: 0,
    },
    hours: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
    seconds: {
      type: Number,
      default: 0,
    },
  },
};
</script>
