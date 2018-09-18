package com.store.creditstore.Bean;

public class RegisterDomain extends BaseResultDomain {
    private String deviceID;
    private String modelName;
    private String funID;
    private String baseStationID;
    private String fireBaseToken;
    private int version;

    public RegisterDomain(String deviceID, String modelName, String funID, String baseStationID,
                          String fireBaseToken, int version) {
        this.deviceID = deviceID;
        this.modelName = modelName;
        this.funID = funID;
        this.baseStationID = baseStationID;
        this.fireBaseToken = fireBaseToken;
        this.version = version;
    }
}
