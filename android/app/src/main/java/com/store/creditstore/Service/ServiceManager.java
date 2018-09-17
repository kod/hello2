package com.store.creditstore.Service;

import android.content.Context;
import android.content.Intent;
import android.os.Build;

public class ServiceManager {

    public static void startService(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            MQTTJobService.scheduleJob(context);
        } else {
            context.startService(new Intent(context, MQTTService.class));
        }
    }

    public static void restartService(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            MQTTJobService.scheduleJob(context);
        }
    }

    public static void setFireBaseToken(String token) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            MQTTJobService.setFireBaseToken(token);
        } else {
            MQTTService.setFireBaseToken(token);
        }
    }

    public static void setBaseStationId(String stationId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            MQTTJobService.setBaseStationId(stationId);
        } else {
            MQTTService.setBaseStationId(stationId);
        }
    }
}
