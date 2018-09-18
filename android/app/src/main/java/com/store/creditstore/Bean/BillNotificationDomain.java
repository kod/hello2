package com.store.creditstore.Bean;

public class BillNotificationDomain extends BaseResultDomain {
    private String orderNo;
    private String tradeNo;
    private int periods;

    public String getOrderNo() {
        return orderNo;
    }

    public String getTradeNo() {
        return tradeNo;
    }

    public int getPeriods() {
        return periods;
    }
}
