package com.store.creditstore.Utility;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.provider.Settings;
import android.text.TextUtils;

public class CommonUtils {
    private static long SECOND = 1000L;
    private static long MINUTE = 60L * SECOND;
    private static long HOUR = 60L * MINUTE;
    private static long HOUR2 = 2L * HOUR;
    public static long DAY = 12L * HOUR2;

    private static String mAndroid;

    /**
     * 检测网络是否可用
     *
     * @param context context
     */
    public static boolean isNetWorkConnected(Context context) {
        if (context != null) {
            ConnectivityManager mConnectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            if (null == mConnectivityManager) {
                return false;
            }
            NetworkInfo mNetworkInfo = mConnectivityManager
                    .getActiveNetworkInfo();
            if (mNetworkInfo != null) {
                return mNetworkInfo.isAvailable();
            }
        }

        return false;
    }

    /**
     * 检测网络是否为WIFI
     *
     * @param context context
     */
    public static boolean isWiFiConnected(Context context) {
        if (context != null) {
            ConnectivityManager connectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            if (null == connectivityManager) {
                return false;
            }
            NetworkInfo info = connectivityManager
                    .getActiveNetworkInfo();
            if (info != null && info.isAvailable()) {
                String name = info.getTypeName();
                return 0 == name.compareToIgnoreCase("wifi");
            }
        }

        return false;
    }

    public static String getDeviceId(Context context) {
        if (TextUtils.isEmpty(mAndroid)) {
            mAndroid = Settings.System.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        }

        return mAndroid;
    }

    /**
     * 获取手机型号
     *
     * @return 手机型号
     */
    public static String getModelName() {
        return android.os.Build.MODEL;
    }

    /**
     * 获取版本code
     *
     * @return 当前应用的版本code
     */
    public static int getVersionCode(Context context) {
        try {
            PackageManager manager = context.getPackageManager();
            PackageInfo info = manager.getPackageInfo(context.getPackageName(),
                    0);
            return info.versionCode;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }
}
