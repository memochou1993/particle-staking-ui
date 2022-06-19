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
    delegators: 'Delegators',
    delegatorCount: 'Delegator Count',
    staked: 'Staked',
    claimed: 'Claimed',
    claimable: 'Claimable',
    rewardInfo: 'Reward Info',
    dailyReturn: 'Daily Return',
    APR: 'APR',
    feeRate: 'Fee Rate',
    referralLink: 'Referral Link',
    rebateRate: 'Rebate Rate',
    referred: 'Used',
    rebateClaimable: 'Claimable',
    rebateClaimed: 'Claimed',
    preparedDelegators: 'Prepared Delegators',
    workingDelegators: 'Working Delegators',
    processing: 'processing',
    delegator: 'Delegator',
    preparing: 'Preparing',
    countdown: 'Countdown to Launch',
    running: 'Running',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    buttonStake: 'Stake',
    buttonClaim: 'Claim',
    buttonLaunch: 'Launch',
    messageConfirming: 'Waiting for confirmation...',
    messageStaked: 'Staked Successfully!',
    messageClaimed: 'Cliamed Successfully!',
    whitePaper: 'White Paper',
    whitepaperP1: 'Particle Staking is a decentralized crypto staking platform based on Proof of Stake (PoS).  It involves holding funds in a cryptocurrency wallet to support the security and operations of a blockchain network. What Particle Staking does is find valuable validator nodes for you. These validator nodes will validate transactions on the blockchain network.',
    whitepaperP2: 'Stakeholders can earn rewards from validator nodes when transactions on the blockchain network are validated. Particle Staking maintains decentralized consensus without the high computational cost. You may think of Particle Staking as a less resource-intensive alternative to mining.',
    whitepaperT1: 'How does Particle Staking work?',
    whitepaperT1P1: 'You will be able to stake your coins directly from your crypto wallet. Particle Staking will build delegators for you. Once you stake, coins will be locked up.',
    whitepaperT2: 'What are the limitations?',
    whitepaperT2P1: 'The minimum stake is 0.01 {currency} and the maximum stake is 100 {currency}. The maximum stake count is 20 for each account.',
    whitepaperT3: 'How are rebates calculated?',
    whitepaperT3P1: 'You can share 10% of the staking amount as rewards with anyone who uses your referral link.',
    whitepaperT4: 'How are staking rewards calculated?',
    whitepaperT4P1: 'The more delegators you have, the more rewards you will earn. The following table shows the reward rate according to delegator count.',
  },
  zhTW: {
    language: '語言',
    title: '粒子質押',
    staking: '質押',
    contract: '合約金額',
    wallet: '錢包金額',
    delegators: '委託者數量',
    delegatorCount: '委託者數量',
    staked: '已質押金額',
    claimed: '已領取利息',
    claimable: '可領取利息',
    rewardInfo: '利率資訊',
    dailyReturn: '日利率',
    APR: '年利率',
    feeRate: '營運費',
    referralLink: '邀請連結',
    rebateRate: '返佣比例',
    referred: '被使用次數',
    rebateClaimable: '可領取返佣',
    rebateClaimed: '已領取返佣',
    preparedDelegators: '準備中委託者',
    workingDelegators: '運作中委託者',
    processing: '處理中',
    delegator: '委託者',
    preparing: '準備中',
    countdown: '倒數中',
    running: '運作中',
    days: '天',
    hours: '時',
    minutes: '分',
    seconds: '秒',
    buttonStake: '質押',
    buttonClaim: '領取利息',
    buttonLaunch: '啟動',
    messageConfirming: '等待確認...',
    messageStaked: '質押成功！',
    messageClaimed: '領取成功！',
    whitePaper: '白皮書',
    whitepaperP1: '粒子質押（Particle Staking）是一個基於權益證明（PoS）的去中心化加密貨幣質押平台，藉由將資金存入智能合約，以支援區塊鏈網路的安全性與營運。粒子質押會在區塊鏈網路中為您找尋有價值的驗證者節點，這些驗證者節點會驗證區塊鏈上的交易。',
    whitepaperP2: '與工作量證明（PoW）不同的是，粒子質押可以在無需高成本計算的同時，持續保持去中心化共識，因此可以把粒子質押看做是挖礦的另一種選擇。',
    whitepaperT1: '運作方式',
    whitepaperT1P1: '粒子質押將從您的錢包中扣取金額，以為您建立委託者（delegator），並參與驗證者節點的驗證工作，質押者的利息將從驗證工作中獲取。一旦質押後，本金將被鎖定，不可贖回。',
    whitepaperT2: '限制',
    whitepaperT2P1: '每個用戶參與質押需要至少 0.01 個 {currency}，至多 100 個 {currency}。最多質押 20 次。',
    whitepaperT3: '返佣',
    whitepaperT3P1: '您可以藉由邀請連結與被邀請者共享質押金額的 10% 返佣。',
    whitepaperT4: '利率',
    whitepaperT4P1: '為獎勵質押者，利率將依據質押者建立的委託者數量而成長，如以下表格所示：',
  },
  zhCN: {
    language: '语言',
    title: '粒子质押',
    staking: '质押',
    contract: '合约金额',
    wallet: '钱包金额',
    delegators: '委讬者数量',
    delegatorCount: '委讬者数量',
    staked: '已质押金额',
    claimed: '已领取利息',
    claimable: '可领取利息',
    rewardInfo: '利率资讯',
    dailyReturn: '日利率',
    APR: '年利率',
    feeRate: '营运费',
    referralLink: '邀请连结',
    rebateRate: '返佣比例',
    referred: '被使用次数',
    rebateClaimable: '可领取返佣',
    rebateClaimed: '已领取返佣',
    preparedDelegators: '准备中委讬者',
    workingDelegators: '运行中委讬者',
    processing: '处理中',
    delegator: '委讬者',
    preparing: '准备中',
    countdown: '倒数中',
    running: '运行中',
    days: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒',
    buttonStake: '质押',
    buttonClaim: '领取利息',
    buttonLaunch: '启动',
    messageConfirming: '等待确认...',
    messageStaked: '质押成功！',
    messageClaimed: '领取成功！',
    whitePaper: '白皮书',
    whitepaperP1: '粒子质押（Particle Staking）是一个基于权益证明（PoS）的去中心化加密货币质押平台，借由将资金存入智能合约，以支援区块链网络的安全性与营运。粒子质押会在区块链网络中为您找寻有价值的验证者节点，这些验证者节点会验证区块链上的交易。',
    whitepaperP2: '与工作量证明（PoW）不同的是，粒子质押可以在无需高成本计算的同时，持续保持去中心化共识，因此可以把粒子质押看做是挖矿的另一种选择。',
    whitepaperT1: '运行方式',
    whitepaperT1P1: '粒子质押将从您的钱包中扣取金额，以为您建立委讬者（delegator），并参与验证者节点的验证工作，质押者的利息将从验证工作中获取。一旦质押后，本金将被锁定，不可赎回。',
    whitepaperT2: '限制',
    whitepaperT2P1: '每个用户参与质押需要至少 0.01 个 {currency}，至多 100 个 {currency}。最多质押 20 次。',
    whitepaperT3: '返佣',
    whitepaperT3P1: '您可以借由邀请连结与被邀请者共享质押金额的 10% 返佣。',
    whitepaperT4: '利率',
    whitepaperT4P1: '为奖励质押者，利率将依据质押者建立的委讬者数量而成长，如以下表格所示：',
  },
};

const locale = localStorage.getItem('locale') || 'en';

const i18n = new VueI18n({
  locale,
  messages,
});

export default i18n;
