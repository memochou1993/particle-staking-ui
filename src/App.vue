<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="end">
          <v-btn
            id="connect"
            rounded
            class="ma-5 subtitle-1 font-weight-bold"
            @click="connect"
          >
            <span
              v-if="account"
              v-text="`${account.substring(0, 6)}...${account.substring(account.length - 4)}`"
            />
            <span
              v-else
              v-text="'Connect'"
            />
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col :cols="12" :md="8">
            <div id="title" class="text-center text-h2 text-uppercase font-weight-bold py-6">
              Mushroom Staking
            </div>
          </v-col>
          <v-col v-if="isOpened && !isStarted" :cols="12" :md="8">
            <v-card color="#000" outlined>
              <v-card-title class="justify-center text-h4 text-uppercase font-weight-bold">
                Countdown to Launch!
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold">
                    {{ remainingTime.days }} Days
                  </v-col>
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold">
                    {{ remainingTime.hours }} Hours
                  </v-col>
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold">
                    {{ remainingTime.minutes }} Minutes
                  </v-col>
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold">
                    {{ remainingTime.seconds }} Seconds
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col :cols="12" :md="8">
            <v-row>
              <v-col :cols="12" :sm="6" :lg="6">
                <v-card :height="450" color="#000" outlined class="mb-6">
                  <v-card-title class="justify-center text-h6 text-uppercase font-weight-bold">Reward Pool</v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Total Staked</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ formatNumber(contractBalance) }} {{ currency }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Daily Return</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ Number('10').toLocaleString() }}%</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">APR</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ Number('3650').toLocaleString() }}%</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Fee</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ Number('1').toLocaleString() }}%</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6">
                        <v-text-field
                          v-model="amount"
                          :min="0"
                          :readonly="!account || !isOpened"
                          :suffix="currency"
                          autofocus
                          color="#8B4513"
                          dense
                          hide-details
                          rounded
                          solo
                          type="number"
                          class="mb-3"
                        />
                      </v-col>
                      <v-col :cols="6">
                        <v-btn
                          :disabled="!account || !isOpened"
                          block
                          outlined
                          rounded
                          class="subtitle-1 font-weight-bold"
                          @click="deposit"
                        >
                          Deposit
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col :cols="12" :sm="6" :lg="6">
                <v-card :height="450" color="#000" outlined>
                  <v-card-title class="justify-center text-h6 text-uppercase font-weight-bold">My Staking</v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Balance</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ formatNumber(accountBalance) }} {{ currency }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Staked</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ formatNumber(staked) }} {{ currency }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Claimed</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end">{{ formatNumber(claimed) }} {{ currency }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold">Claimable</v-col>
                      <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-bold text-end"><AppAnimatedAmount :count="claimable" :decimals="decimals" /> {{ currency }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="12">
                        <v-btn
                          :disabled="!account || !isOpened || !isStarted"
                          block
                          outlined
                          rounded
                          class="subtitle-1 font-weight-bold"
                          @click="claim"
                        >
                          Claim
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col :cols="12">
            <div class="font-weight-bold text-center my-6">
              <span v-text="'White Paper'" class="cursor-pointer"/>
            </div>
          </v-col>
          <AppAlert
            v-if="message"
            :color="message.success ? 'success' : 'error'"
            :text="message.text"
            @onClose="setMessage(null)"
          />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment';
import { ethers } from 'ethers';
import AppAlert from '@/components/AppAlert.vue';
import AppAnimatedAmount from '@/components/AppAnimatedAmount.vue';
import MushroomStaking from '@/contracts/MushroomStaking.json';

export default {
  name: 'App',
  components: {
    AppAlert,
    AppAnimatedAmount,
  },
  data: () => ({
    /**
     * contract data
     */
    web3Provider: null,
    account: null,
    accountBalance: null,
    contractBalance: null,
    startTime: null,
    rewardRate: null,
    isStakeholder: null,
    stakes: [],
    /**
     * form data
     */
    amount: '',
    /**
     * display data
     */
    message: '',
    remainingTime: {},
    remainingSeconds: 0,
    claimable: 0,
  }),
  computed: {
    currency() {
      return 'ETH';
    },
    signer() {
      return this.web3Provider.getSigner();
    },
    contract() {
      return new ethers.Contract(process.env.VUE_APP_CONTRACT_ADDRESS, MushroomStaking.abi, this.signer);
    },
    decimals() {
      return 18;
    },
    isOpened() {
      return Number(this.startTime) > 0;
    },
    isStarted() {
      return Number(this.startTime) < Math.floor(+new Date() / 1000) || this.remainingSeconds < 0;
    },
    staked() {
      return this.stakes.reduce((pre, cur) => pre.add(cur.amount), ethers.BigNumber.from(0));
    },
    claimed() {
      return this.stakes.reduce((pre, cur) => pre.add(cur.claimed), ethers.BigNumber.from(0));
    },
  },
  watch: {
    //
  },
  created() {
    if (!window.ethereum) {
      console.log('Please connect to Metamask.');
      return;
    }
    this.init();
  },
  methods: {
    async init() {
      await this.loadWeb3Provider();
      await this.loadAccount();
      if (this.account) await this.loadData();
      if (this.isOpened) await this.countdown();
      if (this.isOpened) this.calculateClaimable();
    },
    loadWeb3Provider() {
      this.web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      this.web3Provider.provider.on('accountsChanged', () => this.init());
    },
    async loadAccount() {
      const [account] = await this.web3Provider.send('eth_requestAccounts');
      this.account = account;
    },
    async loadData() {
      this.accountBalance = await this.web3Provider.getBalance(this.account);
      this.contractBalance = await this.contract.contractBalance();
      this.startTime = await this.contract.startTime();
      this.rewardRate = await this.contract.rewardRate();
      this.isStakeholder = await this.contract.isStakeholder(this.account);
      this.stakes = this.isStakeholder
        ? await this.contract.stakes(this.account)
        : [];
    },
    connect() {
      this.loadAccount();
    },
    async deposit() {
      if (this.amount <= 0) return;
      const amount = ethers.BigNumber.from(1).mul(ethers.FixedNumber.fromString(this.amount));
      const res = await this.contract.deposit({
        value: amount,
      });
      await res.wait();
      window.location.reload();
    },
    async claim() {
      const res = await this.contract.claim();
      await res.wait();
      window.location.reload();
    },
    async countdown() {
      const interval = 1000;
      const unit = 'milliseconds';
      let duration = moment.duration((Number(this.startTime) - +new Date() / 1000) * 1000, unit);
      const timer = setInterval(() => {
        duration = moment.duration(duration - interval, unit);
        this.remainingTime = {
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        };
        this.remainingSeconds = Math.floor(duration.asSeconds());
        if (this.isStarted) clearInterval(timer);
      }, interval);
    },
    calculateClaimable() {
      setInterval(() => {
        if (!this.stakes || !this.isStarted) return;
        let rewards = 0;
        for (let i = 0; i < this.stakes.length; i += 1) {
          const { lastClaimDate, amount } = this.stakes[i];
          rewards += (((Math.floor(+new Date() / 1000) - lastClaimDate) * amount) * this.rewardRate) / 100 / 365 / 86400;
        }
        this.claimable = rewards;
      }, 1000);
    },
    formatNumber(number = 0) {
      return Number(number / (10 ** this.decimals)).toFixed(6);
    },
  },
};
</script>

<style lang="scss">
.v-application {
  font-family: 'Varela Round', sans-serif !important;
  .text-h1,
  .text-h2,
  .text-h3,
  .text-h4,
  .text-h5,
  .text-h6,
  .subtitle-1,
  .subtitle-2 {
    font-family: 'Varela Round', sans-serif !important;
  }
}
#app {
  background-image: url('~@/assets/mushroom.jpg');
  box-shadow: inset 0 0 0 100vmax rgb(0 0 0 / 30%)
}
#title {
  font-family: "Roboto", sans-serif !important;
  background: -webkit-linear-gradient(#8B4513, #FFFFFF);
  -webkit-text-stroke: 3px #000000;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#connect {
  background: #000000;
  border: none !important;
  opacity: 0.875;
}
.v-sheet.v-card {
  border: 4px solid #8B4513 !important;
  border-radius: 16px !important;
  opacity: 0.925;
}
.v-input, .v-btn {
  border: 3px solid #8B4513 !important;
}
.v-btn {
  height: 42px !important;
}
.text-gradient {
  background: -webkit-linear-gradient(#FFFFFF, #999999);
  -webkit-text-stroke: 0.5px #FFFFFF;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
