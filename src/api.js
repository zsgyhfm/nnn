export const site = ""; // 域名

export const LOGIN = site + "/apicom/user/login"; //会员登陆
export const REGISTER = site + "/apicom/user/register"; //会员注册
export const SEND_PASS_SMS = site + "/apicom/user/sendPassSms"; //找回密码发送验证码校验
export const GET_PASS_STEP1 = site + "/apicom/user/next"; //找回密码第一步校验旧手机
export const GET_PASS_STEP2 = site + "/apicom/user/newpass"; //找回密码第一步校验旧手机

export const GET_SUBACCOUNT = site + "/market/index/getSubAccount"; // 子账户列表
// export const SUBACCOUNT_INFO = site + "/market/trade/subaccount_info"; // 子账户详情npm
export const SUBACCOUNT_MONEY_INFO = site + "/market/trade/account_info"; //子账户资金

export const SELF_SELECTED_STOCK = site + "/market/index/my_select"; // 我的自选
export const ADD_SELF_SELECTED = site + "/market/index/add_my_select"; // 加入自选
export const DELETE_SELF_SELECTED = site + "/market/index/del_my_select"; // 删除自选

export const STOCK_MARKET = site + "/market/index/market"; // 股票详情
export const HOT_SEARCH = site + "/market/index/getHistory_secher"; // 热门搜索股票
// export const QUERY_STOCK = site + "/market/index/search_keyword"; // 搜索股票
export const QUERY_STOCK = site + "/market/index/stock_search"; // 搜索股票
export const ADD_TO_HISTORY = site + "/market/index/addHistory"; // 加入搜索历史统计

export const MINUTE_LINK = site + "/market/index/minute_k"; // 分时图
export const DAY_LINK = site + "/market/index/day_k"; // 日K
export const WEEK_LINK = site + "/market/index/week_k"; // 周K
export const MONTH_LINK = site + "/market/index/month_k"; //月K

export const A_SHARE_STOCKS = site + "/market/index/stock_list"; // A股列表
export const QUERY_STOCKS = site + "/market/index/market_bat"; //批量查询股票行情

export const TOP_TEN = site + "/market/index/top10"; //涨幅前十
export const LAST_TEN = site + "/market/index/bot10"; //跌幅前十
export const MARKET_LIST = site + "/market/index/top"; //股票列表，支持涨幅排序跌幅排序


export const MARKET_SECTION = site + "/market/index/sinahy"; //股票板块、热门板块取涨幅前6个
export const MARKET_SECTION_STOCKS = site + "/market/index/industry_detail"; //股票板块

export const STOCK_RAISE_TEN = site + "/market/index/stock_top10"; //涨幅前十
export const STOCK_FALL_TEN = site + "/market/index/stock_bot10"; //跌幅前十

export const SUBACCOUNT_POSITION = site + "/market/trade/position"; // 子账户持仓查询
export const CANCEL_LIST = site + "/market/trade/cancel_trust"; //当日可撤单列表
export const CANCEL_ORDER = site + "/market/trade/cancel_order"; //当日可撤单列表

export const DEAL_LIST = site + "/market/trade/deal_stock"; //当日成交列表
export const DELIVERY_LIST = site + "/market/trade/delivery"; //交割单列表
export const CAN_SELL_AMOUNT = site + "/market/trade/canbuy_count"; // 最大可卖
export const BUY_STOCK = site + "/market/trade/buy"; // 买入委托
export const SELL_STOCK = site + "/market/trade/sell"; //卖出委托
export const ENTRUST = site + "/market/trade/trust"; //委托查询
export const GET_BANNER = site + "/apicom/index/getSlider"; //  wap banner
export const PAGE_INDEX_CONFIG = site + "/apicom/index/getconf"; //  wap banner

export const PAGE_MEMBER_INDEX = site + "/apicom/member"; // 会员中心首页数据
export const SEND_SMS = site + "/apicom/user/sendsms"; //获取短信验证码

export const USER_INFO = site + "/apicom/member/userInfo"; // 会员信息
export const CHANGE_MOBILE = site + "/apicom/profile/telephone"; // 修改手机号码  一、二步通用
export const REAL_NAME = site + "/apicom/profile/realname"; // 实名认证
export const EDIT_PASSWORD = site + "/apicom/profile/password"; // 修改密码
export const EDIT_PAY_PASS = site + "/apicom/profile/paypass"; // 修改支付密码

export const BANK_LIST = site + "/apicom/member/bankInfo"; // 银行卡列表
export const BANK_CARD_INFO = site + "/apicom/member/editBank"; // 编辑银行卡信息
export const BANK_EDIT = site + "/apicom/member/doEdit"; // 修改银行卡接口
export const DELETE_BANK = site + "/apicom/member/delBank"; // 删除银行卡
export const ADD_BANK = site + "/apicom/member/addBank"; // 添加银行卡
export const GET_AREA = site + "/apicom/member/getArea"; // 获取省市县接口

export const CHARGE_PAGE = site + "/apicom/Recharge/editCharge"; //充值页面数据
export const CHARGE_APPLY = site + "/apicom/Recharge/doCharge"; //充值操作
export const WITHDRAW = site + "/apicom/Withdraw"; // 提现
export const DO_WITHDRAW = site + "/apicom/withdraw/doWithdraw"; // 提现

export const MESSAGE_INDEX = site + "/apicom/message/messageList"; //消息首页
export const MESSAGE = site + "/apicom/message"; // 站内信列表
export const MESSAGE_MARK = site + "/apicom/message/read"; // 标记为已读
export const MESSAGE_READ_ALL = site + "/apicom/message/readall"; // 标记全部未读为已读

export const MONEY_LOG = site + "/apicom/moneylog"; //资金记录
export const ARTICLE_LIST = site + "/apicom/column/index"; //资金记录
export const ARTICLE_DETAIL = site + "/apicom/document/detail"; //资金记录

export const PEIZI_CHECK_APPLY = site + "/apicom/handle/applySave"; //免费申请配资接口、入库
export const PEIZI_APPLY = site + "/apicom/handle/applySaveSub"; //申请配资接口、入库
export const APPLY_TRIAL = site + "/apicom/handle/applySaveSub"; //免费申请配资接口、入库

export const PAGE_TRAIL = site + "/apicom/stock/trial"; //申请配资页面需要数据
export const PAGE_DAY = site + "/apicom/stock/day"; //申请配资页面需要数据
export const PAGE_FREE = site + "/apicom/stock/free_m"; //申请配资页面需要数据
export const PAGE_WEEK = site + "/apicom/stock/week"; //申请配资页面需要数据
export const PAGE_MONTH = site + "/apicom/stock/month"; //申请配资页面需要数据

export const PROTOCOL = site + "/apicom/stock/protocol"; //操盘协议

export const PEIZI_LIST = site + "/apicom/financing"; //会员中心配资列表
export const PEIZI_DETAIL = site + "/apicom/financing/details"; //会员中心配资列表-【单独的一项配资】
export const PEIZI_CONTRACT = site + "/apicom/financing/contract"; //配资合同
export const TERMINATE = site + "/apicom/financing/stop"; //申请终止
export const RENEWAL_APPLY = site + "/apicom/financing/renewal"; //申请续期
export const ADDMONEY_APPLY = site + "/apicom/financing/addmoney"; //申请追加保证金
export const EXPEND_APPLY = site + "/apicom/financing/expend"; //申请扩大配资
export const DRAW_PROFIT_APPLY = site + "/apicom/financing/drawprofit"; // 提取盈利
export const TOGGLE_RENEWAL = site + "/apicom/financing/autorenewal"; //切换自动续期状态

export const CALCULATE_RENEWAL_FEE = site + "/apicom/financing/calculate_rate_renewal"; //续期手续费计算
export const CALCULATE_EXPEND_FEE = site + "/apicom/financing/calculate_rate"; //续期手续费计算

export const ACCOUNT_MONEY = site + "/apicom/Recharge"; //用户账户余额

// 邀请奖励
export const INVITE_USER_RECORD = site + "/apicom/Invite";
export const INVITE_AWARD_RECORD = site + "/apicom/Invite/award";
export const AGENT_PAGE = site + "/apicom/Invite/conf"; //代理商页面所需信息
export const AGENT_DETAIL = site + "/apicom/Invite/agentdetail"; //代理商邀请用户详情
export const SET_AGENT_RATE = site + "/apicom/Invite/changRate"; //设置返佣比例
export const CHANGE_AGENT_STATUS = site + "/apicom/Invite/changStop"; //设置返佣比例
export const SHOW_AGENT_INVITE = site + "/apicom/Invite/lookup"; //查看用户

export const captchaUrl = site + "/captcha.html";
export const captchaWithIdUrl = site + "/captcha/";

export const APP_DOWNLOAD = site + "/apicom/index/upgrade"; // app 升级、安装包url


export const AD_GET = site+"";// 获取广告弹窗
