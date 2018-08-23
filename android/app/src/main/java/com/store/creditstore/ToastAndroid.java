package com.store.creditstore;

import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ToastAndroid extends ReactContextBaseJavaModule {

    ToastAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // 复写方法，返回react-native中调用的 组件名
    @Override
    public String getName() {
        return "Toast";
    }

    @ReactMethod
    public void show(String msg) {
        if (TextUtils.isEmpty(msg)){
            return;
        }
        Toast.makeText(getReactApplicationContext(), msg, Toast.LENGTH_LONG).show();
    }
}
