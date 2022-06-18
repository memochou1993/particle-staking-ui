<template>
  <v-card>
    <v-card-title class="justify-center text-h4 text-uppercase font-weight-bold gradient-text">{{ $t('whitePaper') }}</v-card-title>
    <v-divider />
    <v-card-text>
      <div>
        <p>
          {{ $t('whitepaperP1') }}
        </p>
        <p>
          {{ $t('whitepaperP2') }}
        </p>
        <h2>
          {{ $t('whitepaperT1') }}
        </h2>
        <p>
          {{ $t('whitepaperT1P1') }}
        </p>
        <h2>
          {{ $t('whitepaperT2') }}
        </h2>
        <p>
          {{ $t('whitepaperT2P1') }}
        </p>
        <h2>
          {{ $t('whitepaperT3') }}
        </h2>
        <p>
          {{ $t('whitepaperT3P1') }}
        </p>
        <h2>
          {{ $t('whitepaperT4') }}
        </h2>
        <p>
          {{ $t('whitepaperT4P1') }}
        </p>
        <h2>
          {{ $t('whitepaperT5') }}
        </h2>
        <p>
          {{ $t('whitepaperT5P1') }}
        </p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th :width="200" class="subtitle-1 text-center">{{ $t('whitepaperValidatorCount') }}</th>
                <th class="subtitle-1 text-center">{{ $t('dailyReturn') }}</th>
                <th class="subtitle-1 text-center">{{ $t('APR') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i) in 9" :key="i">
                <td class="subtitle-1 text-center">{{ i }}</td>
                <td class="subtitle-1 text-center">{{ (8 * (105 ** (i - 1)) / (100 ** (i - 1))).toFixed(1) }}%</td>
                <td class="subtitle-1 text-center">{{ Math.floor(365 * 8 * (105 ** (i - 1)) / (100 ** (i - 1))).toLocaleString() }}%</td>
              </tr>
              <tr>
                <td class="subtitle-1 text-center">10 - 20</td>
                <td class="subtitle-1 text-center">{{ (12).toFixed(1) }}%</td>
                <td class="subtitle-1 text-center">{{ (365 * 12).toLocaleString() }}%</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'WhitePaper',
};
</script>

<style lang="scss" scoped>
p {
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
  text-indent: 1rem;
}
h2 {
  color: cyan;
  margin-bottom: 20px;
}
a {
  color: cyan;
}
.v-card__text {
  max-height: 1000px;
  padding: 48px;
}
.v-card__text {
  max-height: 1360px;
}
</style>
