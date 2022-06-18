import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    language: 'Language',
    title: 'Particle Staking',
    staking: 'Staking',
    contract: 'Contract',
    wallet: 'Wallet',
    validators: 'Validators',
    staked: 'Staked',
    claimed: 'Claimed',
    claimable: 'Claimable',
    rewardInfo: 'Reward Info',
    dailyReturn: 'Daily Return',
    APR: 'APR',
    feeRate: 'Fee Rate',
    referralLink: 'Referral Link',
    rebateRate: 'Rebate Rate',
    invitees: 'Invitees',
    rebateClaimable: 'Claimable',
    rebateClaimed: 'Claimed',
    preparedValidators: 'Prepared Validators',
    workingValidators: 'Working Validators',
    validating: 'Validating',
    validator: 'Validator',
    preparing: 'Preparing',
    countdown: 'Countdown to Launch',
    running: 'Running',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    buttonStake: 'Stake',
    buttonClaim: 'Claim',
    messageStaked: 'Staked Successfully!',
    messageClaimed: 'Cliamed Successfully!',
    whitePaper: 'White Paper',
    whitepaperP1: 'TODO',
  },
  zhTW: {
    language: '語言',
    title: '粒子質押',
    staking: '質押',
    contract: '合約金額',
    wallet: '錢包金額',
    validators: '驗證者數量',
    staked: '已質押金額',
    claimed: '已領取利息',
    claimable: '可領取利息',
    rewardInfo: '利率資訊',
    dailyReturn: '日利率',
    APR: '年利率',
    feeRate: '營運費',
    referralLink: '邀請連結',
    rebateRate: '返佣比例',
    invitees: '邀請人數',
    rebateClaimable: '可領取返佣',
    rebateClaimed: '已領取返佣',
    preparedValidators: '準備中驗證者',
    workingValidators: '運作中驗證者',
    validating: '驗證交易',
    validator: '驗證者',
    preparing: '準備中',
    countdown: '倒數中',
    running: '運作中',
    days: '天',
    hours: '時',
    minutes: '分',
    seconds: '秒',
    buttonStake: '質押',
    buttonClaim: '領取利息',
    messageStaked: '質押成功！',
    messageClaimed: '領取成功！',
    whitePaper: '白皮書',
    whitepaperP1: '粒子質押（Particle Staking）是一個基於權益證明（PoS）的質押平台，藉由將資金存入智能合約，以支援區塊鏈網路的安全性和營運。粒子質押會在區塊鏈節點中建立驗證者（Validator），以驗證區塊鏈上的交易。',
  },
  zhCN: {
    language: '语言',
    title: '粒子质押',
    staking: '质押',
    contract: '合约金额',
    wallet: '钱包金额',
    validators: '验证者数量',
    staked: '已质押金额',
    claimed: '已领取利息',
    claimable: '可领取利息',
    rewardInfo: '利率资讯',
    dailyReturn: '日利率',
    APR: '年利率',
    feeRate: '营运费',
    referralLink: '邀请连结',
    rebateRate: '返佣比例',
    invitees: '邀请人数',
    rebateClaimable: '可领取返佣',
    rebateClaimed: '已领取返佣',
    preparedValidators: '准备中验证者',
    workingValidators: '运行中验证者',
    validating: '验证交易',
    validator: '验证者',
    preparing: '准备中',
    countdown: '倒数中',
    running: '运行中',
    days: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒',
    buttonStake: '质押',
    buttonClaim: '领取利息',
    messageStaked: '质押成功！',
    messageClaimed: '领取成功！',
    whitePaper: '白皮书',
    whitepaperP1: 'TODO',
  },
};

const locale = localStorage.getItem('locale') || 'en';

const i18n = new VueI18n({
  locale,
  messages,
});

export default i18n;
