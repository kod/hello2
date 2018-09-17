package com.store.creditstore.Service;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class MsgReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (null != action && action.equals(Intent.ACTION_BOOT_COMPLETED)) {
            ServiceManager.startService(context);
        }
    }
}
