package com.store.creditstore.Utility;

import android.util.Log;

public class LogUtil {
    /**
     * 是否开启debug
     */
    private static boolean isDebug = true;

    private static final String TAG = LogUtil.class.getSimpleName();

    /**
     * 错误
     *
     * @param msg msg
     */
    public static void e(String msg) {
        if (isDebug) {
            Log.e(TAG, msg + "");
        }
    }

    public static void i(String msg) {
        if (isDebug) {
            Log.i(TAG, msg + "");
        }
    }

    public static void w(String msg) {
        if (isDebug) {
            Log.w(TAG, msg + "");
        }
    }

    public static void w(String tag, String msg, Exception e) {
        if (isDebug) {
            Log.e(tag, msg + "", e);
        }
    }

    public static void e(String tag, String msg) {
        if (isDebug) {
            Log.e(tag, msg + "");
        }
    }

    public static void e(String tag, String msg, Exception e) {
        if (isDebug) {
            Log.e(tag, msg + "", e);
        }
    }

    public static void i(String tag, String msg) {
        if (isDebug) {
            Log.i(tag, msg + "");
        }
    }

    public static void w(String tag, String msg) {
        if (isDebug) {
            Log.w(tag, msg + "");
        }
    }

    public static void d(String tag, String msg) {
        if (isDebug) {
            Log.d(tag, msg + "");
        }
    }

    public static void d(String msg) {
        if (isDebug) {
            Log.d(TAG, msg + "");
        }
    }

    public static void v(String msg) {
        if (isDebug) {
            Log.v(TAG, msg + "");
        }
    }

    public static void v(String tag, String msg) {
        if (isDebug) {
            Log.v(tag, msg + "");
        }
    }
}
