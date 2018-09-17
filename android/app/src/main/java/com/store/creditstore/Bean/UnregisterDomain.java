package com.store.creditstore.Bean;

public class UnregisterDomain extends BaseResultDomain {
    private String deviceID;
    private String funID;

    public UnregisterDomain(String deviceID, String funID) {
        this.deviceID = deviceID;
        this.funID = funID;
    }
}
