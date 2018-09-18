package com.store.creditstore.Bean;

public enum NotificationType {
    INVALID(0),
    USER_CENTER_LOGIN(10001), // 登入
    USER_CENTER_LOGOUT(10002), // 登出
    USER_CENTER_DETAIL_UPDATE(10003), // 用户资料变更
    USER_CENTER_BALANCE_UPDATE(10004), // 用户余额变更
    USER_CENTER_REGISTER(10005), // 用户注册
    USER_CENTER_FORCE_LOGOUT(10006),// 强制当前用户登出
    USER_CENTER_INVITATION(10007),// 提醒用 户邀请奖励

    COMMODITY_GOODS(20001), // 新产品
    COMMODITY_MAX_CLASS(20002), // 大类
    COMMODITY_MIN_CLASS(20003), // 小类
    COMMODITY_BRAND(20004), // 品牌
    COMMODITY_MERGE(20005), // 拼单
    COMMODITY_SHOPPING_CART(20006), // 购物车

    RISK_RESULT(30001), // 审核结果
    RISK_AMOUNT_UPDATE(30002),// 风控额度变更

    TRADE_ORDER(40001),// 订单变更
    TRADE_PAY_NOTICE(40002),// 支付通知

    SETTLEMENT_RESULT_NOTICE(50001),// 支付结果通知
    SETTLEMENT_BILL_NOTICE(50002),// 账单相关通知

    MARKETING_REWARD(60001),// 用户奖励
    MARKETING_COUPON_STATUS(60002),// 优惠券状态
    MARKETING_REWARD_BALANCE(60003),// 余额奖励

    SYSTEM_VERSION_UPDATE(70001),// 版本更新
    SYSTEM_FORCED_EXIT(70002),// 强制退出

    PAYMENT(80000),//系统保留

    ADVERTISING_URL(90000);// 广告链接

    private int id;

    NotificationType(int value) {
        id = value;
    }

    public int getId() {
        return id;
    }

    public static NotificationType getTypeByValue(int value) {
        switch (value) {
            case 10001:
                return USER_CENTER_LOGIN;
            case 10002:
                return USER_CENTER_LOGOUT;
            case 10003:
                return USER_CENTER_DETAIL_UPDATE;
            case 10004:
                return USER_CENTER_BALANCE_UPDATE;
            case 10005:
                return USER_CENTER_REGISTER;
            case 10006:
                return USER_CENTER_FORCE_LOGOUT;
            case 10007:
                return USER_CENTER_INVITATION;
            case 20001:
                return COMMODITY_GOODS;
            case 20002:
                return COMMODITY_MAX_CLASS;
            case 20003:
                return COMMODITY_MIN_CLASS;
            case 20004:
                return COMMODITY_BRAND;
            case 20005:
                return COMMODITY_MERGE;
            case 20006:
                return COMMODITY_SHOPPING_CART;
            case 30001:
                return RISK_RESULT;
            case 30002:
                return RISK_AMOUNT_UPDATE;
            case 40001:
                return TRADE_ORDER;
            case 40002:
                return TRADE_PAY_NOTICE;
            case 50001:
                return SETTLEMENT_RESULT_NOTICE;
            case 50002:
                return SETTLEMENT_BILL_NOTICE;
            case 60001:
                return MARKETING_REWARD;
            case 60002:
                return MARKETING_COUPON_STATUS;
            case 60003:
                return MARKETING_REWARD_BALANCE;
            case 70001:
                return SYSTEM_VERSION_UPDATE;
            case 70002:
                return SYSTEM_FORCED_EXIT;
            case 80000:
                return PAYMENT;
            case 90000:
                return ADVERTISING_URL;
            default:
                return INVALID;
        }
    }
}
