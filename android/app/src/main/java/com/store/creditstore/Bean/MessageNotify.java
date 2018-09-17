package com.store.creditstore.Bean;

import android.net.Uri;
import android.text.TextUtils;

import com.store.creditstore.Utility.GsonService;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MessageNotify extends BaseBean {
    private String messageId;
    private String timeStamp;
    private ActionType actionType;
    private Receiver receiver;
    private int priority;//优先级 保留字段
    private String content;

    private NotificationResultDomain<? extends BaseResultDomain> result;

    public enum ActionType {
        MSG(10000),
        MSG_NOTICE_BAR(10001), // 通知栏消息
        MSG_POPUP_DISPLAY(10002), // 弹窗显示
        MSG_OPTIONAL_NOTICE(10003), // 通知栏/APP内展示可选通知
        UPDATE(20000), // APP更新
        UPDATE_MANUAL(20001), // 手动选择
        UPDATE_BACKGROUND(20002), //后台更新
        UPDATE_JUMP(20003), // 点击跳转
        UPDATE_QUIT(20004), //不更新退出
        DATA_UPDATE(90000); // 数据刷新

        private int id;

        ActionType(int id) {
            this.id = id;
        }

        static ActionType getType(int type) {
            switch (type) {
                case 10000:
                    return MSG;
                case 10001:
                    return MSG_NOTICE_BAR;
                case 10002:
                    return MSG_POPUP_DISPLAY;
                case 10003:
                    return MSG_OPTIONAL_NOTICE;
                case 20000:
                    return UPDATE;
                case 20001:
                    return UPDATE_MANUAL;
                case 20002:
                    return UPDATE_BACKGROUND;
                case 20003:
                    return UPDATE_JUMP;
                case 20004:
                    return UPDATE_QUIT;
                case 90000:
                    return DATA_UPDATE;
                default:
                    return MSG;
            }
        }
    }

    public enum Receiver {
        USER_CENTER,//用户中心（登录/登出信息 用户资料变更 余额变更 注册/登录提示）
        COMMODITY,//商品系统（商品 大类 小类 品牌 等广告信息 拼单相关 购物车变更）
        RISK,//风控系统(审核结果 额度变更)
        TRADE,//交易系统（订单状态变更 支付提醒）
        SETTLEMENT,//结算系统（支付结果通知 账单相关通知）
        MARKETING,//推广系统（用户奖励 优惠券状态 余额奖励）
        ADVERTISING,//广告系统（点击打开链接）
        SYSTEM,//系统消息（版本更新 强制退出）
        PAYMENT_GATEWAY;//支付网关（保留 虚拟信用卡使用）

        static Receiver getReceiver(String str) {
            if (TextUtils.isEmpty(str)) {
                return SYSTEM;
            }
            if (0 == "usercenter".compareToIgnoreCase(str)) {
                return USER_CENTER;
            } else if (0 == "commodity".compareToIgnoreCase(str)) {
                return COMMODITY;
            } else if (0 == "risk".compareToIgnoreCase(str)) {
                return RISK;
            } else if (0 == "trade".compareToIgnoreCase(str)) {
                return TRADE;
            } else if (0 == "settlement".compareToIgnoreCase(str)) {
                return SETTLEMENT;
            } else if (0 == "marketing".compareToIgnoreCase(str)) {
                return MARKETING;
            } else if (0 == "advertising".compareToIgnoreCase(str)) {
                return ADVERTISING;
            } else if (0 == "system".compareToIgnoreCase(str)) {
                return SYSTEM;
            } else if (0 == "paymentgateway".compareToIgnoreCase(str)) {
                return PAYMENT_GATEWAY;
            }
            return SYSTEM;
        }
    }

    public MessageNotify(String msg) {
        String[] array = msg.split("\\|");
        if (null == array || 6 > array.length) {
            messageId = null;
            timeStamp = null;
            receiver = null;
            content = null;
            return;
        }
        //messageid|timestamp|actiontype（自定义，比如广告为1，优惠券为2）|receiver(自定义 接收消息的服务名称 比如  uc  marketing等) | content（消息内容，比如广告信息，地址连接等等）
        messageId = array[0];
        timeStamp = array[1];
        String str = array[2];
        if (!TextUtils.isDigitsOnly(str)) {
            String regEx = "[^0-9]";
            Pattern p = Pattern.compile(regEx);
            Matcher m = p.matcher(str);
            str = m.replaceAll("").trim();
        }
        if (TextUtils.isEmpty(str)) {
            actionType = ActionType.MSG;
        } else {
            int value = Integer.valueOf(str);
            actionType = ActionType.getType(value);
        }
        receiver = Receiver.getReceiver(array[3]);
        str = array[4];
        if (TextUtils.isEmpty(str)) {
            priority = 5;
        } else {
            if (!TextUtils.isDigitsOnly(str)) {
                String regEx = "[^0-9]";
                Pattern p = Pattern.compile(regEx);
                Matcher m = p.matcher(str);
                str = m.replaceAll("").trim();
            }
            if (TextUtils.isEmpty(str)) {
                priority = 5;
            } else {
                priority = Integer.valueOf(str);
            }
        }
        content = array[5];

        result = null;
    }

    public String getMessageId() {
        return messageId;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public ActionType getActionType() {
        return actionType;
    }

    public Receiver getReceiver() {
        return receiver;
    }

    public int getPriority() {
        return priority;
    }

    public String getContent() {
        return content;
    }

    private NotificationResultDomain<? extends BaseResultDomain> parseContent() {
        if (null != result) {
            return result;
        }

        result = GsonService.parseNotificationJson(content, BaseResultDomain.class);
        if (null == result) {
            return null;
        }
        switch (result.getType()) {
            case USER_CENTER_LOGIN: // 登入
            case USER_CENTER_LOGOUT: // 登出
            case USER_CENTER_DETAIL_UPDATE: // 用户资料变更
            case USER_CENTER_BALANCE_UPDATE: // 用户余额变更
            case USER_CENTER_FORCE_LOGOUT:// 强制当前用户登出
            case USER_CENTER_INVITATION:// 提醒用户邀请奖励
                result = GsonService.parseNotificationJson(content, UserCenterNotificationDomain.class);
                break;
            case USER_CENTER_REGISTER: // 用户注册
                break;
            case COMMODITY_GOODS: // 新产品
            case COMMODITY_MAX_CLASS: // 大类
            case COMMODITY_MIN_CLASS: // 小类
            case COMMODITY_BRAND: // 品牌
                result = GsonService.parseNotificationJson(content, ProductNotificationDomain.class);
                break;
            case COMMODITY_MERGE: // 拼单
                result = GsonService.parseNotificationJson(content, GrouponNotificationDomain.class);
                break;
            case COMMODITY_SHOPPING_CART: // 购物车
                break;
            case RISK_RESULT: // 审核结果
            case RISK_AMOUNT_UPDATE:// 风控额度变更
                result = GsonService.parseNotificationJson(content, UserCenterNotificationDomain.class);
                break;
            case TRADE_ORDER:// 订单变更
            case TRADE_PAY_NOTICE:// 支付通知
            case SETTLEMENT_RESULT_NOTICE:// 支付结果通知
                result = GsonService.parseNotificationJson(content, OrderNotificationDomain.class);
                break;
            case SETTLEMENT_BILL_NOTICE:// 账单相关通知
                result = GsonService.parseNotificationJson(content, BillNotificationDomain.class);
                break;
            case MARKETING_REWARD:// 用户奖励
                result = GsonService.parseNotificationJson(content, BillNotificationDomain.class);
                break;
            case MARKETING_COUPON_STATUS:// 优惠券状态
                break;
            case MARKETING_REWARD_BALANCE:// 余额奖励
                result = GsonService.parseNotificationJson(content, UserCenterNotificationDomain.class);
                break;
            case SYSTEM_FORCED_EXIT:// 强制退出
                break;
            case PAYMENT:
                break;
            case SYSTEM_VERSION_UPDATE:// 版本更新
            case ADVERTISING_URL:// 广告链接
                result = GsonService.parseNotificationJson(content, LinkNotificationDomain.class);
                break;
            default:
                return null;
        }

        return result;
    }

    public String getMsg() {
        if (null == result) {
            parseContent();
        }
        if (null == result) {
            return null;
        }
        return result.getMsg();
    }

    public String getSubMsg() {
        if (null == result) {
            parseContent();
        }
        if (null == result) {
            return null;
        }
        return result.getSubMsg();
    }

    public String getImg() {
        if (null == result) {
            parseContent();
        }
        if (null == result) {
            return null;
        }
        return result.getImg();
    }

    public NotificationResultDomain<? extends BaseResultDomain> getResult() {
        if (null == result) {
            parseContent();
        }

        return result;
    }

    public Uri parseMessageNotification() {
        switch (actionType) {
            case MSG:
            case MSG_NOTICE_BAR:
            case MSG_OPTIONAL_NOTICE:
            case MSG_POPUP_DISPLAY:
                break;
            default:
                return null;
        }
        if (null == result) {
            result = parseContent();
        }
        if (null == result) {
            return null;
        }

        Uri.Builder builder = new Uri.Builder();
        builder.scheme("buyoovn");
        builder.authority("www.buyoo.vn");
        switch (result.getType()) {
            case USER_CENTER_LOGIN: // 登入
            case USER_CENTER_LOGOUT: // 登出
            case USER_CENTER_DETAIL_UPDATE: // 用户资料变更
            case USER_CENTER_BALANCE_UPDATE: // 用户余额变更
            case USER_CENTER_FORCE_LOGOUT:// 强制当前用户登出
            case USER_CENTER_INVITATION:// 提醒用户邀请奖励
                builder.path("personal.html");
                break;
            case USER_CENTER_REGISTER: // 用户注册
                builder.path("register.html");
                break;
            case COMMODITY_GOODS: // 新产品
            case COMMODITY_MAX_CLASS: // 大类
            case COMMODITY_MIN_CLASS: // 小类
            case COMMODITY_BRAND: // 品牌
                builder.path("details.html");
                if (result.getResult() instanceof ProductNotificationDomain) {
                    ProductNotificationDomain info = (ProductNotificationDomain) result.getResult();
                    if (0 != info.getBrandId()) {
                        builder.appendQueryParameter("brandId", String.valueOf(info.getBrandId()));
                        builder.appendQueryParameter("id", String.valueOf(info.getId()));
                    } else {
                        builder.path("more.html");
                        builder.appendQueryParameter("classifyId", String.valueOf(info.getClassfyId()));
                        builder.appendQueryParameter("brandId", String.valueOf(info.getBrandId()));
                        builder.appendQueryParameter("brandAct", String.valueOf(info.getSubClassfyId()));
                        builder.appendQueryParameter("name", String.valueOf(info.getName()));
                    }
                }
                break;
            case COMMODITY_MERGE: // 拼单
                builder.path("addOnItemdetails.html");
                if (result.getResult() instanceof GrouponNotificationDomain) {
                    GrouponNotificationDomain info = (GrouponNotificationDomain) result.getResult();
                    builder.appendQueryParameter("brandId", String.valueOf(info.getBrandId()));
                    builder.appendQueryParameter("masterId", String.valueOf(info.getMasterId()));
                }
                break;
            case COMMODITY_SHOPPING_CART: // 购物车
                builder.path("cart.html");
                break;
            case RISK_RESULT: // 审核结果
            case RISK_AMOUNT_UPDATE:// 风控额度变更
                builder.path("personal.html");
                break;
            case TRADE_ORDER:// 订单变更
            case TRADE_PAY_NOTICE:// 支付通知
            case SETTLEMENT_RESULT_NOTICE:// 支付结果通知
                builder.path("orderDetail.html");
                if (result.getResult() instanceof OrderNotificationDomain) {
                    OrderNotificationDomain info = (OrderNotificationDomain) result.getResult();
                    builder.appendQueryParameter("orderNo", info.getOrderNum());
                    builder.appendQueryParameter("tradeNo", info.getTradeNum());
                }
                break;
            case SETTLEMENT_BILL_NOTICE:// 账单相关通知
                builder.path("billDetail.html");
                if (result.getResult() instanceof BillNotificationDomain) {
                    BillNotificationDomain info = (BillNotificationDomain) result.getResult();
                    builder.appendQueryParameter("orderNo", info.getOrderNo());
                    builder.appendQueryParameter("tradeNo", info.getTradeNo());
                    builder.appendQueryParameter("period", String.valueOf(info.getPeriods()));
                }
                break;
            case MARKETING_REWARD:// 用户奖励
                if (result.getResult() instanceof CouponCenterNotificationDomain) {
                    CouponCenterNotificationDomain info = (CouponCenterNotificationDomain) result.getResult();
                    builder.path("couponcenter.html");
                    builder.appendQueryParameter("code", info.getCode());
                }
                break;
            case MARKETING_COUPON_STATUS:// 优惠券状态
                builder.path("couponmy.html");
                break;
            case MARKETING_REWARD_BALANCE:// 余额奖励
                builder.path("personal.html");
                break;
            case SYSTEM_FORCED_EXIT:// 强制退出
            case PAYMENT:
                return null;
            case SYSTEM_VERSION_UPDATE:// 版本更新
            case ADVERTISING_URL:// 广告链接
                if (result.getResult() instanceof LinkNotificationDomain) {
                    LinkNotificationDomain info = (LinkNotificationDomain) result.getResult();
                    if (info.isWebView()) {
                        builder.path("webview.html");
                    } else {
                        builder.path("webview_client.html");
                    }
                    try {
                        builder.appendQueryParameter("address", URLEncoder.encode(info.getLink(), "utf-8"));
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                }
                break;
            default:
                return null;
        }

        return builder.build();
    }
}
