
package com.store.creditstore.Data;

import android.content.Context;
import android.content.SharedPreferences;

import com.store.creditstore.MainApplication;

public class SharedPreferencesUtil {

    private static SharedPreferencesUtil prefsUtil;
    private SharedPreferences prefs;

    public synchronized static SharedPreferencesUtil getInstance() {
        if (null == prefsUtil) {
            init();
        }
        return prefsUtil;
    }

    public static void init() {
        Context context = MainApplication.getInstance().getApplicationContext();
        String prefsName = context.getPackageName() + "_preference";
        prefsUtil = new SharedPreferencesUtil();
        prefsUtil.prefs = context.getSharedPreferences(prefsName, Context.MODE_PRIVATE);
    }

    public synchronized static SharedPreferencesUtil getInstance(Context context) {
        if (null == prefsUtil) {
            init(context);
        }
        return prefsUtil;
    }

    public static void init(Context context) {
        String prefsName = context.getPackageName() + "_preference";
        prefsUtil = new SharedPreferencesUtil();
        prefsUtil.prefs = context.getSharedPreferences(prefsName, Context.MODE_PRIVATE);
    }

    private SharedPreferencesUtil() {
    }

    public String getString(String key, String defaultVal) {
        return this.prefs.getString(key, defaultVal);
    }

    public String getString(String key) {
        return this.prefs.getString(key, null);
    }

    public SharedPreferencesUtil putString(String key, String value) {
        SharedPreferences prefs = prefsUtil.prefs;
        if (null != prefs) {
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(key, value);
            editor.apply();
        }
        return this;
    }
}
