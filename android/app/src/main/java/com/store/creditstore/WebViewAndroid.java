package com.store.creditstore;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.webkit.HttpAuthHandler;
import android.webkit.JavascriptInterface;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.net.URISyntaxException;
import java.util.Map;

public class WebViewAndroid extends SimpleViewManager<WebView> {
    private String[] mFilterStr = null;
    private Boolean mHandleIntentFlag = false;
    private WebView mWebview;

    private static final String EVENT_NAME = "shouldOverrideUrlLoading";

    @Override
    public String getName() {
        return "WebViewAndroid";
    }

    @Override
    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        final WebView webview = new WebView(reactContext);
        mWebview = webview;
        WebSettings settings = webview.getSettings();
        settings.setBuiltInZoomControls(false);
        settings.setJavaScriptEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setBlockNetworkImage(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setDomStorageEnabled(true);
        // 可任意比例缩放
        settings.setUseWideViewPort(true);
        /* setUseWideViewPort方法设置webView推荐使用的窗口。
         * setLoadWithOverviewMode方法是设置webView加载的页面的模式。*/
        settings.setLoadWithOverviewMode(true);
        // 新加
        settings.setSupportMultipleWindows(true);

        webview.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onCloseWindow(WebView window) {
                super.onCloseWindow(window);
            }

            @Override
            public boolean onCreateWindow(WebView view, boolean dialog, boolean userGesture,
                                          Message resultMsg) {
                return super.onCreateWindow(view, dialog, userGesture, resultMsg);
            }

            @Override
            public boolean onJsBeforeUnload(WebView view, String url, String message,
                                            JsResult result) {
                return super.onJsBeforeUnload(view, url, message, result);
            }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
                return super.onJsConfirm(view, url, message, result);
            }

            @Override
            public boolean onJsPrompt(WebView view, String url, String message,
                                      String defaultValue, JsPromptResult result) {
                return super.onJsPrompt(view, url, message, defaultValue, result);
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                result.confirm();
                return true;
            }

            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);
            }

            @Override
            public void onReceivedTitle(WebView view, String title) {
//                super.onReceivedTitle(view, title);
            }

            @Override
            public void onReceivedIcon(WebView view, Bitmap icon) {
//                super.onReceivedIcon(view, icon);
            }

            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
//                super.onShowCustomView(view, callback);
            }

            @Override
            public void onHideCustomView() {
//                super.onHideCustomView();
            }
        });
        webview.addJavascriptInterface(this, "android");

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
                                event.putInt("event", 0);
                                ReactContext reactContext = (ReactContext) webview.getContext();
                                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                                        webview.getId(),
                                        EVENT_NAME,
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
                        event.putInt("event", 1);
                        ReactContext reactContext = (ReactContext) webview.getContext();
                        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                                webview.getId(),
                                EVENT_NAME,
                                event);
                    }
                    view.loadUrl(url);
                } else {
                    view.loadUrl(url);
                }

                return false;
            }
        });
        webview.setLayoutParams(
                new LayoutParams(LayoutParams.MATCH_PARENT,
                        LayoutParams.MATCH_PARENT));
        return webview;
    }

    @JavascriptInterface
    public void backBtnEnabled(boolean result) {

    }

    @JavascriptInterface
    public void closeView(boolean result) {
        WritableMap event = Arguments.createMap();
        event.putInt("event", 2);
        ReactContext reactContext = (ReactContext) mWebview.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                mWebview.getId(),
                EVENT_NAME,
                event);
    }

    @ReactProp(name = "shouldOverrideUrl")
    public void setShouldOverrideUrl(WebView view, String str) {
        if (TextUtils.isEmpty(str)) {
            mFilterStr = null;
        }
        mFilterStr = str.split(",");
    }

    @ReactProp(name = "shouldOverrideIntentUrl", defaultBoolean = false)
    public void setShouldOverrideIntentUrl(WebView view, Boolean flag) {
        mHandleIntentFlag = flag;
    }

    @ReactProp(name = "source")
    public void setSource(WebView view, @Nullable ReadableMap source) {
        if (source != null) {
            if (source.hasKey("uri")) {
                setUrl(view, source.getString("uri"));
            }
        }
    }

    @ReactProp(name = "url")
    public void setUrl(WebView view, @Nullable String url) {
        view.loadUrl(url);
    }

    @Override
    public @Nullable
    Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put(EVENT_NAME, MapBuilder.of("registrationName", "onShouldOverrideUrlLoading"))
                .build();
    }
}
