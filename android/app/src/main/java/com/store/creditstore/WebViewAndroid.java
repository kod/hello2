package com.store.creditstore;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Message;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.webkit.HttpAuthHandler;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.net.URISyntaxException;

public class WebViewAndroid extends SimpleViewManager<WebView> {
    private String[] mFilterStr = null;
    private Boolean mHandleIntentFlag = false;

    @Override
    public String getName() {
        return "WebViewAndroid";
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        final WebView webview = new WebView(reactContext);

        webview.setWebViewClient(new WebViewClient() {

            @Override
            public void onFormResubmission(WebView view, Message dontResend, Message resend) {
                super.onFormResubmission(view, dontResend, resend);
            }

            @Override
            public void onReceivedSslError(WebView view, final SslErrorHandler handler, SslError error) {
                ReactContext context = (ReactContext) view.getContext();
                AlertDialog dialog = new AlertDialog.Builder(context)
                        .setMessage(R.string.service_error_ssl_cert_invalid)
                        .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                handler.proceed();
                            }
                        })
                        .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                handler.cancel();
                            }
                        })
                        .create();
                dialog.show();
            }

            @Override
            public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler,
                                                  String host, String realm) {
                super.onReceivedHttpAuthRequest(view, handler, host, realm);
            }

            @Override
            public void onLoadResource(WebView view, String url) {
                super.onLoadResource(view, url);
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onPageFinished(WebView view, final String url) {
                super.onPageFinished(view, url);
            }

            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (mHandleIntentFlag && url.startsWith("intent://")) {
                    try {
                        ReactContext context = (ReactContext) view.getContext();
                        Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
                        if (intent != null) {
                            view.stopLoading();

                            PackageManager packageManager = context.getPackageManager();
                            ResolveInfo info = packageManager.resolveActivity(intent, PackageManager.MATCH_DEFAULT_ONLY);
                            if (info != null) {
                                context.startActivity(intent);

                                WritableMap event = Arguments.createMap();
                                event.putString("url", url);
                                ReactContext reactContext = (ReactContext) webview.getContext();
                                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                                        webview.getId(),
                                        "handleEvent",
                                        event);
                            } else {
                                String fallbackUrl = intent.getStringExtra("browser_fallback_url");
                                view.loadUrl(fallbackUrl);
                            }
                            return true;
                        }
                    } catch (URISyntaxException e) {
                        e.printStackTrace();
                    }
                } else if (null != mFilterStr && 0 != mFilterStr.length) {
                    boolean flag = false;
                    for (String str : mFilterStr) {
                        if (url.contains(str)) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        WritableMap event = Arguments.createMap();
                        event.putString("url", url);
                        ReactContext reactContext = (ReactContext) webview.getContext();
                        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                                webview.getId(),
                                "handleUrl",
                                event);
                    } else {
                        view.loadUrl(url);
                    }
                } else {
                    view.loadUrl(url);
                }

                return false;
            }
        });
        return webview;
    }

    @ReactProp(name = "setShouldOverrideUrl")
    public void setShouldOverrideUrl(WebView view, String str) {
        if (TextUtils.isEmpty(str)) {
            mFilterStr = null;
        }
        mFilterStr = str.split(",");
    }

    @ReactProp(name = "setShouldOverrideIntentUrl", defaultBoolean = false)
    public void setShouldOverrideIntentUrl(WebView view, Boolean flag) {
        mHandleIntentFlag = flag;
    }
}
