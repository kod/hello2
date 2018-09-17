package com.store.creditstore.Bean;

public class OrderNotificationDomain extends BaseResultDomain {
    private String orderNo;
    private String tradeNo;

    public String getOrderNum() {
        return orderNo;
    }

    public String getTradeNum() {
        return tradeNo;
    }
}
