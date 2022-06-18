<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="space-between">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                rounded
                class="dark-button subtitle-1 font-weight-bold mt-10 ml-8"
              >
                {{ $t('language') }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(lang, i) in languages"
                :key="i"
                dense
                @click="() => selectLanguage(lang.locale)"
              >
                <v-list-item-title>{{ lang.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            rounded
            class="dark-button subtitle-1 font-weight-bold mt-10 mr-8"
            @click="connect"
          >
            <span v-if="account">{{ `${account.substring(0, 6)}...${account.substring(account.length - 4)}` }}</span>
            <span v-else>Connect</span>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col :cols="12" :md="8">
            <div class="text-center text-h2 text-uppercase font-weight-black gradient-text bordered-text py-3">
              {{ $t('title') }}
            </div>
          </v-col>
          <v-col :cols="12" :md="8">
            <AppCountdownTimer
              :text="timerStatus"
              :days="!isStarted ? remainingTime.days : -remainingTime.days - 1 || 0"
              :hours="!isStarted ? remainingTime.hours : -remainingTime.hours || 0"
              :minutes="!isStarted ? remainingTime.minutes : -remainingTime.minutes || 0"
              :seconds="!isStarted ? remainingTime.seconds : -remainingTime.seconds || 0"
            />
          </v-col>
          <v-col :cols="12" :md="8">
            <v-row>
              <v-col :cols="12" :sm="6" :lg="6">
                <v-row>
                  <v-col :cols="12">
                    <v-card :height="640 - 24">
                      <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">{{ $t('staking') }}</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('contract') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(contractBalance) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('wallet') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(accountBalance) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('validators') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ stakes.length }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6">
                            <v-text-field
                              v-model="amount"
                              :readonly="!account || !isOpened"
                              :step="0.01"
                              :suffix="currency"
                              ref="amount"
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
                              :loading="loading === 'deposit'"
                              block
                              outlined
                              rounded
                              class="subtitle-1 font-weight-bold"
                              @click="deposit"
                            >
                              {{ $t('buttonStake') }}
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('staked') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(staked) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('claimed') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ formatNumber(claimed) }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('claimable') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end"><AppAnimatedAmount :count="totalClaimable" :decimals="decimals" /> {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="12">
                            <v-btn
                              :disabled="!account || !isOpened || !isStarted || !totalClaimable"
                              :loading="loading === 'claim'"
                              block
                              outlined
                              rounded
                              class="subtitle-1 font-weight-bold"
                              @click="claim"
                            >
                              {{ $t('buttonClaim') }}
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
                      <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">{{ $t('rewardInfo') }}</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('dailyReturn') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ Number(rewardRate / 365).toFixed(1) }}%</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('APR') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ Number(rewardRate).toLocaleString() }}%</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('feeRate') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">3%</v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col :cols="12">
                    <v-card class="mt-6">
                      <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">{{ $t('referralLink') }}</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('rebateRate') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">5%</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('invitees') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ Number(stakeholder ? stakeholder.inviteeCount : 0).toLocaleString() }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('rebateClaimed') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ `${stakeholder ? formatNumber(stakeholder.rebate.claimed) : 0}` }} {{ currency }}</v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text">{{ $t('rebateClaimable') }}</v-col>
                          <v-col :cols="6" class="subtitle-1 text-uppercase font-weight-medium gradient-text text-end">{{ `${stakeholder ? formatNumber(stakeholder.rebate.amount) : 0}` }} {{ currency }}</v-col>
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
                  <v-card-title class="justify-center text-h5 text-uppercase font-weight-bold gradient-text">{{ isStarted ? $t('workingValidators') : $t('preparedValidators') }}</v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col :cols="12" v-for="(stake, i) in [...stakes].reverse()" :key="stakes.length - i">
                        <v-row justify="space-between" class="subtitle-1 text-uppercase font-weight-medium gradient-text">
                          <v-col class="text-left">
                            <span>{{ `${$t('validator')} #${stakes.length - i}` }}</span>
                          </v-col>
                          <v-col class="text-right">
                            <template v-if="calculateClaimable(stake) > 0">
                              <AppAnimatedAmount :count="calculateClaimable(stake)" :decimals="decimals" /> {{ currency }}
                            </template>
                            <template v-else>
                              0 {{ currency }}
                            </template>
                          </v-col>
                        </v-row>
                        <div class="mb-4">
                          <v-progress-linear
                            color="pink"
                            :indeterminate="isStarted"
                          />
                          <v-row justify="space-between">
                            <v-col v-if="isStarted" class="text-left">
                              <div class="caption text-uppercase grey--text">
                                {{ $t('validating') }}: <span class="caption text-uppercase grey--text">{{ displayHash(i) }}</span>
                              </div>
                            </v-col>
                            <v-col class="text-right">
                              <div class="caption text-uppercase grey--text">{{ $t('APR') }}: {{ Number(stake.rewardRate).toLocaleString() }}%</div>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col :cols="12">
            <div class="text-center mt-10 mb-15">
              <span class="subtitle-1 font-weight-bold cursor-pointer">White Paper</span>
              <span>&nbsp;・&nbsp;</span>
              <span class="subtitle-1 font-weight-bold cursor-pointer">BscScan</span>
              <span>&nbsp;・&nbsp;</span>
              <span class="subtitle-1 font-weight-bold cursor-pointer">Telegram</span>
              <span>&nbsp;・&nbsp;</span>
              <span class="subtitle-1 font-weight-bold cursor-pointer">Twitter</span>
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
import Hashes from 'jshashes';
import moment from 'moment';
import ParticleStaking from '@/contracts/ParticleStaking.json';
import AppAlert from '@/components/AppAlert.vue';
import AppAnimatedAmount from '@/components/AppAnimatedAmount.vue';
import AppCountdownTimer from '@/components/AppCountdownTimer.vue';

const MIN_AMOUNT = 0.01;
const MAX_AMOUNT = 100;

export default {
  name: 'App',
  components: {
    AppAlert,
    AppAnimatedAmount,
    AppCountdownTimer,
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
    stakes: [],
    /**
     * form data
     */
    amount: '',
    /**
     * display data
     */
    message: null,
    hashTimer: null,
    countdownTimer: null,
    currencyTime: 0,
    remainingTime: {},
    remainingSeconds: 0,
    totalClaimable: 0,
    languages: [
      {
        locale: 'en',
        text: 'English',
      }, {
        locale: 'zhTW',
        text: '繁體中文',
      }, {
        locale: 'zhCN',
        text: '简体中文',
      },
    ],
    loading: '',
  }),
  computed: {
    currency() {
      return process.env.VUE_APP_CURRENCY;
    },
    signer() {
      return this.web3Provider.getSigner();
    },
    contract() {
      return new ethers.Contract(process.env.VUE_APP_CONTRACT_ADDRESS, ParticleStaking.abi, this.signer);
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
    rewardRate() {
      if (this.stakes.length > 0) return this.stakes[this.stakes.length - 1].rewardRate;
      return this.defaultAPR;
    },
    referrer() {
      return (new URLSearchParams(window.location.search)).get('ref') || this.account;
    },
    referralLink() {
      return `${process.env.VUE_APP_URL}?ref=${this.account || ''}`;
    },
    timerStatus() {
      if (this.startTime === null) return '';
      if (!this.isOpened) return this.$t('preparing');
      if (!this.isStarted) return this.$t('countdown');
      return this.$t('running');
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
      this.message = { text: 'MetaMask is not installed' };
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
      if (this.isStarted) this.updateTime();
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
      this.stakes = this.isStakeholder ? await this.contract.stakesOf(this.account) : [];
    },
    selectLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', locale);
    },
    connect() {
      this.loadAccount();
    },
    async deposit() {
      this.loading = 'deposit';
      try {
        if (!Number(this.amount)) return;
        const amount = ethers.BigNumber.from(1).mul(ethers.FixedNumber.fromString(this.amount));
        const res = await this.contract.deposit(this.referrer, {
          value: amount,
        });
        await res.wait();
        this.init();
        this.message = { text: this.$t('messageStaked') };
        this.$refs.amount.focus();
      } catch (e) {
        if (e?.data?.message) {
          this.message = { text: e.data.message.substring(e.data.message.indexOf('ParticleStaking')) };
          return;
        }
        if (e?.message) {
          this.message = { text: e.message };
        }
      } finally {
        this.loading = '';
      }
    },
    async claim() {
      this.loading = 'claim';
      try {
        const res = await this.contract.claim();
        await res.wait();
        this.init();
        this.message = { text: this.$t('messageClaimed') };
      } catch (e) {
        if (e?.data?.message) {
          this.message = { text: e.data.message.substring(e.data.message.indexOf('ParticleStaking')) };
          return;
        }
        if (e?.message) {
          this.message = { text: e.message };
        }
      } finally {
        this.loading = '';
      }
    },
    async countdown() {
      clearInterval(this.countdownTimer);
      const interval = 1000;
      const unit = 'milliseconds';
      let duration = moment.duration((Number(this.startTime) - +new Date() / 1000) * 1000, unit);
      this.countdownTimer = setInterval(() => {
        duration = moment.duration(duration - interval, unit);
        this.remainingTime = {
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        };
        this.remainingSeconds = Math.floor(duration.asSeconds());
      }, interval);
    },
    updateTime() {
      clearInterval(this.hashTimer);
      this.hashTimer = setInterval(() => {
        this.currencyTime += 100;
      }, 100);
    },
    displayHash(i) {
      const hash = (new Hashes.SHA1()).hex(`${this.currencyTime} - ${i}`);
      return `${hash.substring(0, 12)}...${hash.substring(hash.length - 12)}`;
    },
    calculateTotalClaimable() {
      setInterval(() => {
        if (!this.stakes || !this.isStarted) return;
        this.totalClaimable = this.stakes.reduce((pre, cur) => pre + this.calculateClaimable(cur), 0);
      }, 1000);
    },
    calculateClaimable(stake) {
      const { amount, rewardRate, claimed, createdAt } = stake;
      return (((Math.floor(+new Date() / 1000) - Number(createdAt)) * Number(amount)) * Number(rewardRate)) / 100 / 365 / 86400 - claimed;
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
  background-image: url('~@/assets/particle.jpg');
}
#referral-link {
  font-weight: 500;
}
.dark-button {
  background: black;
  opacity: 0.725;
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
  background-color: black;
  background-image: linear-gradient(black, black), radial-gradient(circle at top left, pink,cyan);
  background-origin: border-box;
  border: 4px solid transparent;
  border-radius: 16px !important;
  opacity: 0.725;
}
.v-sheet.v-list {
  opacity: 0.725;
}
.v-input, .v-btn {
  background: black;
  border: 2px solid pink !important;
}
.theme--dark.v-btn.v-btn--disabled {
  border: 2px solid grey !important;
}
.v-btn {
  height: 42px !important;
}
.v-input__icon {
  padding-left: 12px;
}
.v-text-field__suffix {
  font-weight: 500 !important;
}
.v-card__text {
  max-height: 600px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
