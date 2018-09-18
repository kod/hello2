package com.store.creditstore.Service;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;

import com.firebase.jobdispatcher.Constraint;
import com.firebase.jobdispatcher.FirebaseJobDispatcher;
import com.firebase.jobdispatcher.GooglePlayDriver;
import com.firebase.jobdispatcher.Job;
import com.firebase.jobdispatcher.JobParameters;
import com.firebase.jobdispatcher.JobService;
import com.firebase.jobdispatcher.Lifetime;
import com.firebase.jobdispatcher.RetryStrategy;
import com.firebase.jobdispatcher.Trigger;
import com.store.creditstore.Utility.MQTTUtil;

@TargetApi(Build.VERSION_CODES.LOLLIPOP)
public class MQTTJobService extends JobService {
    private final static String MSG_TAG = "com.store.creditstore.Service.MQTTJobService.STRING_MSG";
    /**
     * 最少一分钟
     */
    private final static int CONNECT_MIN_PERIOD = 10;//秒
    private final static int CONNECT_MAX_PERIOD = 20;//秒

    private static MQTTUtil mMQTT;

    /**
     * schedule the start of the service every minute
     */
    public static void scheduleJob(Context context) {
        FirebaseJobDispatcher dispatcher = new FirebaseJobDispatcher(new GooglePlayDriver(context));
        Job job = dispatcher.newJobBuilder()
                .setService(MQTTJobService.class)
                .setTag(MQTTUtil.TAG)
                .setTrigger(Trigger.executionWindow(CONNECT_MIN_PERIOD, CONNECT_MAX_PERIOD))
                // persist the task across boots
                .setLifetime(Lifetime.FOREVER)
                // We are mentioning that the job is not periodic.
                .setRecurring(true)
                //Run this job only when the network is avaiable.
                .setConstraints(Constraint.ON_ANY_NETWORK)
                // Sets whether this Job should replace pre-existing Jobs with the same tag.
                .setReplaceCurrent(true)
                // Set the RetryStrategy used for the Job.
//                .setRetryStrategy(
//                        dispatcher.newRetryStrategy(
//                                form.retryStrategy.get(),
//                                form.getInitialBackoffSeconds(),
//                                form.getMaximumBackoffSeconds()))
                .build();

        int result = dispatcher.schedule(job);

        if (result != FirebaseJobDispatcher.SCHEDULE_RESULT_SUCCESS) {
            return;
        }

        executeImmediately(context);
    }

    /**
     * Schedule a job using FirebaseJobDispatcher.
     */
    public static void scheduleJob(Context context, String msg) {
        // [START dispatch_job]
        FirebaseJobDispatcher dispatcher = new FirebaseJobDispatcher(new GooglePlayDriver(context));
        // [END dispatch_job]

        Bundle bundle = new Bundle();
        bundle.putString(MSG_TAG, msg);

        Job job = dispatcher.newJobBuilder()
                // the JobService that will be called
                .setService(MQTTJobService.class)
                // uniquely identifies the job
                .setTag(MQTTUtil.TAG)
                // one-off job
                .setRecurring(false)
                // don't persist past a device reboot
                .setLifetime(Lifetime.FOREVER)
                // start between 0 and 60 seconds from now
                .setTrigger(Trigger.executionWindow(0, 60))
                // don't overwrite an existing job with the same tag
                .setReplaceCurrent(false)
                // retry with exponential backoff
                .setRetryStrategy(RetryStrategy.DEFAULT_EXPONENTIAL)
                .setExtras(bundle)
                .build();

        int result = dispatcher.schedule(job);

        if (result != FirebaseJobDispatcher.SCHEDULE_RESULT_SUCCESS) {
            return;
        }

        executeImmediately(context);
    }

    public static void handleMsg(String msg) {
        if (null != mMQTT) {
            mMQTT.handleReceivedMsg(msg);
        }
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
            mMQTT.setFireBaseToken(str);
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public boolean onStartJob(JobParameters params) {
        if (null == mMQTT) {
            mMQTT = new MQTTUtil(this);
        }
        mMQTT.scheduleJob();
        Bundle bundle = params.getExtras();
        if (null != bundle) {
            String msg = bundle.getString(MSG_TAG);
            if (TextUtils.isEmpty(msg)) {
                return false;
            }
            mMQTT.handleReceivedMsg(msg);
        }
        return false;
    }

    private static void executeImmediately(Context context) {
        if (null == mMQTT) {
            mMQTT = new MQTTUtil(context);
        }
        mMQTT.scheduleJob();
    }

    @Override
    public boolean onStopJob(JobParameters jobParameters) {
        mMQTT.onDestroy();
        mMQTT = null;
        return true;
    }
}
