<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="end">
          <v-btn
            id="connect-button"
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
            <div class="text-center text-h2 text-uppercase font-weight-black gradient-text bordered-text py-3">
              Castle Staking
            </div>
          </v-col>
          <v-col v-if="isOpened && !isStarted" :cols="12" :md="8">
            <v-card>
              <v-card-title class="justify-center text-center text-h4 text-uppercase font-weight-bold gradient-text">
                Countdown to Launch
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
                    {{ remainingTime.days }} Days
                  </v-col>
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
                    {{ remainingTime.hours }} Hours
                  </v-col>
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
                    {{ remainingTime.minutes }} Minutes
                  </v-col>
                  <v-col :cols="3" class="text-center text-h5 font-weight-bold gradient-text">
                    {{ remainingTime.seconds }} Seconds
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col :cols="12" :md="8">
            <v-row>
              <v-col :cols="12" :sm="6" :lg="6">
                <v-row>
                  <v-col :cols="12">
                    <v-card :height="588 - 24">
                      <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">Staking</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Balance</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(accountBalance) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Level</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ stakeholder ? stakeholder.level : 0 }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6">
                            <v-text-field
                              v-model="amount"
                              :readonly="!account || !isOpened"
                              :step="0.01"
                              :suffix="currency"
                              autofocus
                              dense
                              hide-details
                              rounded
                              solo
                              type="number"
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
                              Stake
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Staked</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(staked) }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Claimed</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(claimed) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Claimable</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end"><AppAnimatedAmount :count="totalClaimable" :decimals="decimals" /> {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="12">
                            <v-btn
                              :disabled="!account || !isOpened || !isStarted || !totalClaimable"
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
              <v-col :cols="12" :sm="6" :lg="6">
                <v-row no-gutters>
                  <v-col :cols="12">
                    <v-card>
                      <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">Reward Info</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Total Staked</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(contractBalance) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Daily Return</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ Number(rewardRate / 365).toFixed(1) }}%</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">APR</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ Number(rewardRate).toLocaleString() }}%</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Fee Rate</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">3%</v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col :cols="12">
                    <v-card class="mt-6">
                      <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">Referral Link</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Rebate Rate</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">5%</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">Rebate</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ `${stakeholder ? formatNumber(stakeholder.rebate) : 0}` }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="12" class="subtitle-1 text-uppercase font-weight-bold">
                            <v-text-field
                              :value="referralLink"
                              id="referral-link"
                              append-icon="mdi-content-copy"
                              dense
                              hide-details
                              readonly
                              ref="referralLink"
                              rounded
                              solo
                              @click:append="$refs.referralLink.focus()"
                              @focus="copy($event)"
                              class="cursor-pointer"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col v-if="stakes.length > 0" :cols="12">
                <v-card>
                  <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">{{ isStarted ? 'Working Validators' : 'Prepared Validators' }}</v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col :cols="12" v-for="(stake, i) in stakes" :key="i">
                        <v-row justify="space-between" class="subtitle-1 text-uppercase font-weight-medium gradient-text">
                          <v-col>
                            <span v-text="`Validator #${i + 1}`" />
                          </v-col>
                          <v-col class="text-right">
                            <template v-if="calculateClaimable(stake) > 0">
                              <AppAnimatedAmount :count="calculateClaimable(stake)" :decimals="decimals" /> {{ currency }}
                            </template>
                          </v-col>
                        </v-row>
                        <div class="mb-4">
                          <v-progress-linear
                            :buffer-value="calculateProgress(stake) * (stake.rewardRate / defaultAPR) * 1.5"
                            :height="10"
                            :value="calculateClaimable(stake) > 0 ? calculateProgress(stake) : 0"
                            color="pink"
                            stream
                          />
                        </div>
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
            :text="message.text"
            @onClose="message = null"
          />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ethers } from 'ethers';
import moment from 'moment';
import AppAlert from '@/components/AppAlert.vue';
import AppAnimatedAmount from '@/components/AppAnimatedAmount.vue';
import CastleStaking from '@/contracts/CastleStaking.json';

const MIN_AMOUNT = 0.01;
const MAX_AMOUNT = 100;

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
    owner: null,
    startTime: null,
    stakeholder: null,
    isStakeholder: null,
    rewardRate: null,
    stakes: [],
    /**
     * form data
     */
    amount: '',
    /**
     * display data
     */
    message: null,
    remainingTime: {},
    remainingSeconds: 0,
    totalClaimable: 0,
  }),
  computed: {
    currency() {
      return 'ETH';
    },
    signer() {
      return this.web3Provider.getSigner();
    },
    contract() {
      return new ethers.Contract(process.env.VUE_APP_CONTRACT_ADDRESS, CastleStaking.abi, this.signer);
    },
    decimals() {
      return 18;
    },
    defaultAPR() {
      return 365 * 8;
    },
    isOwner() {
      return String(this.account).toUpperCase() === String(this.owner).toUpperCase();
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
    referrer() {
      return (new URLSearchParams(window.location.search)).get('ref') || this.account;
    },
    referralLink() {
      return this.account ? `${process.env.VUE_APP_URL}?ref=${this.account}` : '';
    },
  },
  watch: {
    amount(after) {
      if (Number(after) === 0) return;
      this.$nextTick(() => {
        if (Number(after) < MIN_AMOUNT) this.amount = MIN_AMOUNT;
        if (Number(after) > MAX_AMOUNT) this.amount = MAX_AMOUNT;
      });
    },
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
      if (this.isOpened) this.calculateTotalClaimable();
      this.reset();
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
      this.owner = await this.contract.owner();
      this.startTime = await this.contract.startTime();
      this.stakeholder = await this.contract.stakeholders(this.account);
      this.isStakeholder = await this.contract.isStakeholder(this.account);
      this.rewardRate = this.isStakeholder ? await this.contract.rewardRateOf(this.account) : this.defaultAPR;
      this.stakes = this.isStakeholder ? await this.contract.stakesOf(this.account) : [];
    },
    connect() {
      this.loadAccount();
    },
    async deposit() {
      try {
        if (!Number(this.amount)) return;
        const amount = ethers.BigNumber.from(1).mul(ethers.FixedNumber.fromString(this.amount));
        const res = await this.contract.deposit(this.referrer, {
          value: amount,
        });
        await res.wait();
        this.init();
        this.message = { text: 'Staked Successfully!' };
      } catch (e) {
        if (e.reason) this.message = { text: e.reason };
        if (e.message) this.message = { text: e.message };
      }
    },
    async claim() {
      try {
        const res = await this.contract.claim();
        await res.wait();
        this.init();
        this.message = { text: 'Cliamed Successfully!' };
      } catch (e) {
        if (e.reason) this.message = { text: e.reason };
        if (e.message) this.message = { text: e.message };
      }
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
    calculateTotalClaimable() {
      setInterval(() => {
        if (!this.stakes || !this.isStarted) return;
        this.totalClaimable = this.stakes.reduce((pre, cur) => pre + this.calculateClaimable(cur), 0);
      }, 1000);
    },
    calculateClaimable(stake) {
      const { amount, rewardRate, lastClaimDate } = stake;
      return (((Math.floor(+new Date() / 1000) - Number(lastClaimDate)) * Number(amount)) * Number(rewardRate)) / 100 / 365 / 86400;
    },
    calculateProgress(stake) {
      return (((Math.floor(+new Date() / 1000) - stake.lastClaimDate) / 86400) % 1) * 100;
    },
    formatNumber(number = 0) {
      return Number(number / (10 ** this.decimals)).toFixed(6);
    },
    reset() {
      this.amount = '';
    },
    copy(event) {
      event.target.select();
      document.execCommand('copy');
    },
  },
};
</script>

<style lang="scss">
#app {
  background-image: url('~@/assets/castle.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 0 0 100vmax rgb(0 0 0 / 25%);
}
#connect-button {
  background: black;
  opacity: 0.8;
}
#referral-link {
  font-weight: 500;
}
.bordered-text {
  -webkit-text-stroke: 1px black;
}
.gradient-text, .v-text-field__suffix, .v-btn__content, .v-icon {
  background: -webkit-linear-gradient(cyan, pink) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
.cursor-pointer {
  cursor: pointer;
  .v-text-field__slot, .v-input__icon, input {
    cursor: pointer;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.v-sheet.v-card {
  background-clip: content-box, border-box;
  background-color: black !important;
  background-image: linear-gradient(black, black), radial-gradient(circle at top left, pink,cyan);
  background-origin: border-box;
  border: 4px solid transparent;
  border-radius: 16px !important;
  opacity: 0.8;
}
.v-input, .v-btn {
  background: black;
  border: 2px solid pink !important;
}
.v-btn {
  height: 42px !important;
}
.v-input__icon {
  padding-left: 24px;
}
.v-text-field__suffix {
  font-weight: 500 !important;
}
</style>
