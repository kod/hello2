package com.store.creditstore.Utility;

import android.app.ActivityManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.PowerManager;
import android.support.v4.app.NotificationCompat;
import android.text.TextUtils;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.messaging.FirebaseMessaging;
import com.store.creditstore.Bean.MessageNotify;
import com.store.creditstore.Bean.MessageStr;
import com.store.creditstore.Bean.RegisterDomain;
import com.store.creditstore.Bean.UnregisterDomain;
import com.store.creditstore.Data.SharedPreferencesUtil;
import com.store.creditstore.Data.UserProfile;
import com.store.creditstore.MainActivity;
import com.store.creditstore.R;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.greenrobot.eventbus.EventBus;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class MQTTUtil {
    public static final String TAG = MQTTUtil.class.getSimpleName();

    private static MqttClient mClient;
    private static boolean isOnline;
    private static boolean isAppBackground;
    private static boolean isUnregistered;

    private MqttConnectOptions mMqttOpt;
    private Timer mTimer;
    private TimerTask mTimerTask;
    private Timer mPauseTimer;
    private TimerTask mPauseTimerTask;
    private String mTopic;

    private static final String HOST_ADDRESS = "tcp://www.buyoo.club:8088";
    private static final String TOPIC_NAME_BASE = "system/topic/";
    private static final String TOPIC_NAME_AD = "system/topic/ad";
    private static final String TOPIC_NAME_MARKETING = "system/topic/marketing";
    private static final String TOPIC_NAME_PRODUCT = "system/topic/product";
    private static final String TOPIC_NAME_SYSTEM = "system/topic/system";
    private static final String TOPIC_NAME_REPORT = "system/statistics";
    private static final String TOPIC_NAME_REGISTER = "system/register";
    private static final String TOPIC_NAME_UNREGISTER = "system/unregister";
//    private static final String TOPIC_LAST_WILL = "system/lastWill";

    private static final String CLIENT_ID = "android/";
    private static final int NETWORK_CHECK_PERIOD = 15 * 60 * 1000;/*网络未连接的时候15分检测一次网络*/
    private static final int INTERVAL_PERIOD_WIFI = 5 * 60;/*WIFI 心跳包为5分钟*/
    private static final int INTERVAL_PERIOD_MOBILE = 15 * 60;/*手机网络 心跳包为15分钟*/
    private static final int PAUSE_CHECK_PERIOD = 60 * 1000;/*暂停一分钟上报掉线*/
//    private static final String LAST_WILL = "close";

    private String mBaseStationId;
    private String mFireBaseToken;

    private List<String> mMsgLst = new ArrayList<>();

    private Context mContext;

    public MQTTUtil(Context context) {
        mContext = context;
        isOnline = false;
        isAppBackground = false;
        isUnregistered = false;
    }

    public void connect() {
        if (null != mClient && mClient.isConnected()) {
            return;
        }

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // 服务器地址（协议+地址+端口号）
                    if (null == mClient) {
                        String clientId = CLIENT_ID + CommonUtils.getDeviceId(mContext);
                        mClient = new MqttClient(HOST_ADDRESS, clientId, new MemoryPersistence());
                        // 设置MQTT监听并且接受消息
                        mClient.setCallback(mqttCallback);

                        mMqttOpt = new MqttConnectOptions();
                        // 清除缓存
                        mMqttOpt.setCleanSession(false);
                        // 设置超时时间，单位：秒
                        mMqttOpt.setConnectionTimeout(INTERVAL_PERIOD_WIFI);
                        // 心跳包发送间隔，单位：秒
                        mMqttOpt.setKeepAliveInterval(INTERVAL_PERIOD_WIFI);
//                        mMqttOpt.setWill(TOPIC_LAST_WILL, LAST_WILL.getBytes(), 2, true);
                    }
                    tryConnection();
                    //实例化过滤器并设置要过滤的广播
                } catch (MqttException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    public void scheduleJob() {
        if (isAppInBackground()) {
            if (!isAppBackground) {
                onAppPause();
                isAppBackground = true;
            }
        } else {
            if (isAppBackground) {
                onAppResume();
                isAppBackground = false;
            }
            connect();
            if (isUnregistered) {
                registerService();
            }
        }
    }

    public void publish(String msg) {
        if (null == mClient || !mClient.isConnected()) {
            mMsgLst.add(msg);
            connect();
            return;
        }
        MqttMessage message = new MqttMessage();
        message.setQos(1);
        message.setRetained(false);
        message.setPayload(msg.getBytes());
        try {
            mClient.publish(TOPIC_NAME_REPORT, message);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void setBaseStationId(String str) {
        mBaseStationId = str;
        if (!TextUtils.isEmpty(mBaseStationId)) {
            registerService();
        }
    }

    public void setFireBaseToken(String str) {
        mFireBaseToken = str;
        if (!TextUtils.isEmpty(mFireBaseToken)) {
            registerService();
        }
    }

    public void setFunId(String str) {
        registerService();
    }

    private void registerService() {
        String android = CommonUtils.getDeviceId(mContext);
        String modelName = CommonUtils.getModelName();
        SharedPreferencesUtil.getInstance(mContext);
        UserProfile profile = UserProfile.getInstance();
        String uId;
        if (null == profile || profile.isGuest()) {
            uId = null;
        } else {
            uId = profile.getUserId();
        }
        String token;
        if (TextUtils.isEmpty(mFireBaseToken)) {
            token = FirebaseInstanceId.getInstance().getToken();
            mFireBaseToken = token;
        } else {
            token = mFireBaseToken;
        }
        int version = CommonUtils.getVersionCode(mContext);

        RegisterDomain domain = new RegisterDomain(android, modelName, uId, mBaseStationId, token, version);
        String msg = GsonService.toJson(domain);
        LogUtil.e(TAG, "registerService " + msg);
        MqttMessage message = new MqttMessage();
        message.setQos(1);
        message.setRetained(false);
        message.setPayload(msg.getBytes());
        try {
            mClient.publish(TOPIC_NAME_REGISTER, message);
            isUnregistered = false;
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void unregisterService() {
        String android = CommonUtils.getDeviceId(mContext);
        UserProfile profile = UserProfile.getInstance();
        String uId;
        if (null == profile || profile.isGuest()) {
            uId = null;
        } else {
            uId = profile.getUserId();
        }

        UnregisterDomain domain = new UnregisterDomain(android, uId);
        String msg = GsonService.toJson(domain);
        LogUtil.e(TAG, "unregisterService " + msg);
        MqttMessage message = new MqttMessage();
        message.setQos(1);
        message.setRetained(false);
        message.setPayload(msg.getBytes());
        try {
            mClient.publish(TOPIC_NAME_UNREGISTER, message);
            isUnregistered = true;
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void tryConnection() {
        if (null == mMqttOpt || null == mClient) {
            return;
        }
        if (mClient.isConnected()) {
            stopTimer();
            return;
        }

        if (CommonUtils.isNetWorkConnected(mContext)) {
            doClientConnection();
        } else {
            startTimer();
        }
    }

    /**
     * 连接MQTT服务器
     */
    private void doClientConnection() {

        if (CommonUtils.isWiFiConnected(mContext)) {
            mMqttOpt.setKeepAliveInterval(INTERVAL_PERIOD_WIFI);
        } else {
            mMqttOpt.setKeepAliveInterval(INTERVAL_PERIOD_MOBILE);
        }
        try {
            mClient.connect(mMqttOpt);
            registerService();
            isOnline = true;
            subscribe();
            stopTimer();

            handleMsgList();
        } catch (MqttException e) {
            e.printStackTrace();
            /*启动失败，稍后重试*/
            startTimer();
        }
    }

    private void subscribe() throws MqttException {
        mTopic = getTopicName(mContext);

        mClient.subscribe(mTopic);
        mClient.subscribe(TOPIC_NAME_AD);
        mClient.subscribe(TOPIC_NAME_MARKETING);
        mClient.subscribe(TOPIC_NAME_PRODUCT);
        mClient.subscribe(TOPIC_NAME_SYSTEM);

        String str = TOPIC_NAME_AD.replace('/', '_');
        FirebaseMessaging.getInstance().subscribeToTopic(str);
        str = TOPIC_NAME_MARKETING.replace('/', '_');
        FirebaseMessaging.getInstance().subscribeToTopic(str);
        str = TOPIC_NAME_PRODUCT.replace('/', '_');
        FirebaseMessaging.getInstance().subscribeToTopic(str);
        str = TOPIC_NAME_SYSTEM.replace('/', '_');
        FirebaseMessaging.getInstance().subscribeToTopic(str);
    }

    private void handleMsgList() {
        if (null == mClient || !mClient.isConnected()) {
            return;
        }

        if (0 == mMsgLst.size()) {
            return;
        }

        for (String msg : mMsgLst) {
            MqttMessage message = new MqttMessage();
            message.setQos(1);
            message.setRetained(false);
            message.setPayload(msg.getBytes());
            try {
                mClient.publish(TOPIC_NAME_REPORT, message);
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
        mMsgLst.clear();
    }

    private static String getTopicName(Context context) {
        return TOPIC_NAME_BASE + CommonUtils.getDeviceId(context);
    }

    private void startTimer() {
        synchronized (this) {
            if (null != mTimer || null != mTimerTask) {
                stopTimer();
            }
            mTimer = new Timer();
            if (null == mTimer) {
                return;
            }

            if (mTimerTask == null) {
                mTimerTask = new TimerTask() {
                    @Override
                    public void run() {
                        stopTimer();
                        if (!isAppInBackground()) {
                            tryConnection();
                        } else {
                            startTimer();
                        }
                    }
                };
            }
            mTimer.schedule(mTimerTask, NETWORK_CHECK_PERIOD);
        }
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

    // MQTT监听并且接受消息
    private MqttCallback mqttCallback = new MqttCallback() {

        @Override
        public void messageArrived(String topic, MqttMessage message) {
            byte[] byteArray = message.getPayload();
            String str1 = new String(byteArray);
            handleReceivedMsg(str1);
        }

        @Override
        public void deliveryComplete(IMqttDeliveryToken arg0) {
        }

        @Override
        public void connectionLost(Throwable arg0) {
            // 失去连接，重连
            isOnline = false;
            if (!isAppInBackground()) {
                tryConnection();
            }
        }
    };

    public void handleReceivedMsg(String msgStr) {
        if (TextUtils.isEmpty(msgStr)) {
            return;
        }
        MessageNotify msg = new MessageNotify(msgStr);
        switch (msg.getActionType()) {
            /*消息栏*/
            case MSG:
            case MSG_NOTICE_BAR:
                handleNotifyBar(msg);
                break;
            case MSG_OPTIONAL_NOTICE:
            case MSG_POPUP_DISPLAY:
                if (isAppInBackground()) {
                    handleNotifyBar(msg);
                } else {
                    postMsgToRN(msgStr);
                }
                break;
            case UPDATE:
            case UPDATE_JUMP:
            case UPDATE_QUIT:
            case UPDATE_MANUAL:
            case UPDATE_BACKGROUND:
                postMsgToRN(msgStr);
                break;
            case DATA_UPDATE:
                if (isAppInBackground()) {
                    handleDataUpdate(msg);
                } else {
                    postMsgToRN(msgStr);
                }
                break;
        }
    }

    private void postMsgToRN(String msgStr){
        EventBus.getDefault().post(new MessageStr(msgStr));
    }

    private void handleNotifyBar(MessageNotify msg) {
        final String imgPath = msg.getImg();
        if (!TextUtils.isEmpty(imgPath)) {
            final String path = FileUtils.getDefaultFilePath(mContext) + "/NotificationImg";
            new Thread(new Runnable() {
                @Override
                public void run() {
                    downloadFile(imgPath, path);
                }
            }).start();
        } else {
            showNotification(msg, null);
        }
    }

    private String getFileName(String path) {
        int separatorIndex = path.lastIndexOf("/");
        return (separatorIndex < 0) ? path : path.substring(separatorIndex + 1, path.length());
    }

    private void downloadFile(String url, String path) {
        try {
            URL myURL = new URL(url);
            URLConnection conn = myURL.openConnection();
            conn.connect();
            InputStream is = conn.getInputStream();
            int fileSize = conn.getContentLength();//根据响应获取文件大小
            if (fileSize <= 0) throw new RuntimeException("无法获知文件大小 ");
            if (is == null) throw new RuntimeException("stream is null");
            String fileName = getFileName(url);
            File folder = new File(path);
            if (!folder.exists()) {
                if (!folder.mkdirs()) {
                    return;
                }
            }
            File file = new File(path, fileName);
            //把数据存入路径+文件名
            FileOutputStream fos = new FileOutputStream(file);
            byte buf[] = new byte[1024];
//            int downLoadFileSize = 0;
            do {
                //循环读取
                int numRead = is.read(buf);
                if (numRead == -1) {
                    break;
                }
                fos.write(buf, 0, numRead);
//                downLoadFileSize += numRead;
                //更新进度条
            } while (true);

            is.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private void showNotification(MessageNotify msg, Bitmap img) {
        String channelId = mContext.getString(R.string.app_name);

        NotificationManager notifyManager = (NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(channelId,
                    channelId, NotificationManager.IMPORTANCE_DEFAULT);
            channel.enableLights(true); //是否在桌面icon右上角展示小红点
            channel.setLightColor(Color.RED); //小红点颜色
            channel.setShowBadge(true); //是否在久按桌面图标时显示此渠道的通知
            notifyManager.createNotificationChannel(channel);
        }
        int resourceId;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            resourceId = R.drawable.ic_notification_icon; //fix for kitkat
        } else {
            resourceId = R.mipmap.ic_launcher;
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(mContext, channelId);

        //设置小图标
        builder.setSmallIcon(resourceId)
                //设置通知标题
                .setContentTitle(msg.getMsg())
                //设置通知内容
                .setContentText(msg.getSubMsg())
                //通知产生的时间，会在通知信息里显示，一般是系统获取到的时间
                .setWhen(System.currentTimeMillis())
                //设置该通知优先级
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                //设置通知集合的数量
                // .setNumber(number)
                //通知首次出现在通知栏，带上升动画效果的
                .setTicker(msg.getMsg())
                //设置这个标志当用户单击面板就可以让通知将自动取消
                .setAutoCancel(true)
                //true，设置他为一个正在进行的通知。他们通常是用来表示一个后台任务,用户积极参与(如播放音乐)或以某种方式正在等待,因此占用设备(如一个文件下载,同步操作,主动网络连接)
                .setOngoing(false)
                //向通知添加声音、闪灯和振动效果的最简单、最一致的方式是使用当前的用户默认设置，使用defaults属性，可以组合
                //Notification.DEFAULT_ALL  Notification.DEFAULT_SOUND 添加声音 // requires VIBRATE permission
                .setDefaults(NotificationCompat.DEFAULT_ALL)
                //将一个Notification变成悬挂式Notification
                .setFullScreenIntent(getPendingIntent(msg), true);
        if (null != img) {
            //设置大图
            builder.setLargeIcon(img);
        }

        //只设置id
        notifyManager.notify(1, builder.build());
    }

    private PendingIntent getPendingIntent(MessageNotify msg) {
        Intent intent = new Intent(mContext, MainActivity.class);
        intent.setAction(Intent.ACTION_VIEW);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.setData(msg.parseMessageNotification());
        return PendingIntent.getActivity(mContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }

    private void handleDataUpdate(MessageNotify msg) {
        if (isAppInBackground()) {
            return;
        }

        //TODO Handle update
    }

    private boolean isAppInBackground() {
        if (!isScreenOn()) {
            return true;
        }
        ActivityManager am = (ActivityManager) mContext.getSystemService(Context.ACTIVITY_SERVICE);
        if (null == am) {
            return false;
        }
        List<ActivityManager.RunningTaskInfo> tasks = am.getRunningTasks(1);
        if (tasks != null && !tasks.isEmpty()) {
            ComponentName topActivity = tasks.get(0).topActivity;
            return !topActivity.getPackageName().equals(mContext.getPackageName());
        }
        return true;
    }

    /**
     * 获取screen状态
     */
    private boolean isScreenOn() {
        PowerManager manager = (PowerManager) mContext.getSystemService(Context.POWER_SERVICE);
        return null == manager || manager.isScreenOn();
    }

    private void onAppPause() {
        if (null != mPauseTimer) {
            stopPauseTimer();
        }
        mPauseTimer = new Timer();

        if (mPauseTimerTask == null) {
            mPauseTimerTask = new TimerTask() {
                @Override
                public void run() {
                    stopPauseTimer();
                    if (null != mClient && mClient.isConnected()) {
                        unregisterService();
                    }
                }
            };
        }
        mPauseTimer.schedule(mPauseTimerTask, PAUSE_CHECK_PERIOD);
    }

    private void onAppResume() {
        stopPauseTimer();
        if (isOnline) {
            return;
        }
        tryConnection();
    }

    private void stopPauseTimer() {
        if (null != mPauseTimer) {
            mPauseTimer.cancel();
            mPauseTimer = null;
        }
        if (null != mPauseTimerTask) {
            mPauseTimerTask.cancel();
            mPauseTimerTask = null;
        }
    }

    public void onDestroy() {
        stopTimer();
        stopPauseTimer();

        try {
            if (null != mClient) {
                mClient.disconnect();
            }
        } catch (MqttException e) {
            e.printStackTrace();
        } finally {
            mClient = null;
        }

        mContext = null;
    }
}
