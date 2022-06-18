<template>
  <v-card :height="800">
    <v-card-title class="justify-center text-h4 text-uppercase font-weight-bold gradient-text">{{ $t('whitePaper') }}</v-card-title>
    <v-divider />
    <v-card-text>
      <div>
        <p>
          {{ $t('whitepaperP1') }}
        </p>
        <p>
          質押者的利息將從驗證者成功驗證交易後所得到的獎勵中所獲取。粒子質押可以在無需高成本計算的同時，持續保持去中心化共識，因此可以把粒子質押看做是挖礦的另一種選擇。
        </p>
        <p>
          更多關於質押的知識：<a target="_blank" href="https://academy.binance.com/zt/articles/what-is-staking" rel="noopener noreferrer">什麼是質押？</a>
        </p>
        <h2>運作方式</h2>
        <p>
          粒子質押會為您在節點上建立驗證者，並從錢包中扣取所需的金額。一旦質押後，本金將被鎖定，不可贖回。
        </p>
        <h2>金額限制</h2>
        <p>
          每個用戶參與質押需要至少 0.01 個 BNB，至多 100 個 BNB。
        </p>
        <h2>次數限制</h2>
        <p>
          每個帳戶最多只能質押 20 次。
        </p>
        <h2>返佣</h2>
        <p>
          任何人使用您的推薦連結，都可以與被推薦者平分到質押金額的 10% 返佣。
        </p>
        <h2>利率</h2>
        <p>
          為獎勵質押者持續質押，利率會不斷成長，如以下表格所示。
        </p>
        <table>
          <tr>
            <td>驗證者數量</td>
            <td>APR</td>
          </tr>
          <tr>
            <td>0</td>
            <td>1234%</td>
          </tr>
        </table>
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
  font-size: 20px;
  margin: 16px 0;
}
a {
  color: cyan;
}
.v-card__text {
  max-height: 1000px;
}
</style>
