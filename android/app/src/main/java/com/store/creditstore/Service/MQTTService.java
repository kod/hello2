package com.store.creditstore.Service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.store.creditstore.Utility.MQTTUtil;

import java.util.Timer;
import java.util.TimerTask;

/**
 * MQTTService
 */

public class MQTTService extends Service {

    private static MQTTUtil mMQTT;

    private Timer mTimer;
    private TimerTask mTimerTask;

    private static final int REPEAT_PERIOD = 60 * 1000;/*暂停一分钟上报掉线*/

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        mMQTT = new MQTTUtil(this);
        mMQTT.connect();
        startTimer();
        return super.onStartCommand(intent, flags, startId);
    }

    public void publish(String msg) {
        if (null == mMQTT) {
            mMQTT = new MQTTUtil(this);
        }
        mMQTT.publish(msg);
    }

    public static void setBaseStationId(String str) {
        if (TextUtils.isEmpty(str)) {
            return;
        }

        if (null != mMQTT) {
            mMQTT.setBaseStationId(str);
        }
    }

    public static void setFireBaseToken(String str) {
        if (TextUtils.isEmpty(str)) {
            return;
        }

        if (null != mMQTT) {
            mMQTT.setFireBaseToken(str);
        }
    }

    public static void setFunID(String str) {
        if (null != mMQTT) {
            mMQTT.setFunId(str);
        }
    }

    private void startTimer() {
        if (null != mTimer) {
            stopTimer();
        }
        mTimer = new Timer();

        if (mTimerTask == null) {
            mTimerTask = new TimerTask() {
                @Override
                public void run() {
                    if (null == mMQTT) {
                        mMQTT = new MQTTUtil(MQTTService.this);
                    }
                    mMQTT.scheduleJob();
                }
            };
        }
        mTimer.schedule(mTimerTask, REPEAT_PERIOD, REPEAT_PERIOD);
    }

    private void stopTimer() {
        if (mTimer != null) {
            mTimer.cancel();
            mTimer = null;
        }

        if (mTimerTask != null) {
            mTimerTask.cancel();
            mTimerTask = null;
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {

        if (null != mMQTT) {
            mMQTT.onDestroy();
            mMQTT = null;
        }
        stopTimer();

        super.onDestroy();
    }
}
