package com.store.creditstore;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.net.URISyntaxException;

public class IntentHandler extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    IntentHandler(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    // 复写方法，返回react-native中调用的 组件名
    @Override
    public String getName() {
        return "IntentHandler";
    }

    // 使用 @ReactMethod注解返回react-native中可调用的 方法
    @ReactMethod
    public void jump(String url, Callback success, Callback error) {
        if (url.startsWith("intent://")) {
            try {
                Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
                if (intent != null) {

                    PackageManager packageManager = mContext.getPackageManager();
                    ResolveInfo info = packageManager.resolveActivity(intent, PackageManager.MATCH_DEFAULT_ONLY);
                    if (info != null) {
                        mContext.startActivity(intent);
                        success.invoke("");
                    } else {
                        String fallbackUrl = intent.getStringExtra("browser_fallback_url");
                        error.invoke(url);
                    }
                }
            } catch (URISyntaxException e) {
                e.printStackTrace();
                error.invoke(url);
            }
        }
    }
}
