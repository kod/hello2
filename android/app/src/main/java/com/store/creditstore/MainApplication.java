package com.store.creditstore;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.store.creditstore.Service.ServiceManager;

import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

import fr.bamlab.rnimageresizer.ImageResizerPackage;

public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
    private static MainApplication mInstance;
    private int mForegroundCnt = 0; // 位于前台的 Activity 的数目
    private int mBufferCnt = 0; // 缓冲计数器，记录 configChanges 的状态

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new RNCameraPackage(),
                    new ImageResizerPackage(),
                    new PickerPackage(),
                    new SplashScreenReactPackage(),
                    new RNFetchBlobPackage(),
                    new RNSpinkitPackage(),
                    new RNDeviceInfo(),
                    new ReactNativeLocalizationPackage(),
                    new VectorIconsPackage(),
                    new NativePackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(this);
        registerActivityLifecycleCallbacks(mListener);
        mInstance = this;
        SoLoader.init(this, /* native exopackage */ false);
    }

    private ActivityLifecycleCallbacks mListener = new ActivityLifecycleCallbacks() {

        @Override
        public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

        }

        @Override
        public void onActivityStarted(Activity activity) {
            if (mForegroundCnt <= 0) {
                //这里处理从后台恢复到前台的逻辑
                ServiceManager.restartService(MainApplication.this);
            }
            if (mBufferCnt < 0) {
                mBufferCnt++;
            } else {
                mBufferCnt++;
            }
            mForegroundCnt++;
        }

        @Override
        public void onActivityResumed(Activity activity) {
        }

        @Override
        public void onActivityPaused(Activity activity) {

        }

        @Override
        public void onActivityStopped(Activity activity) {
            if (activity.isChangingConfigurations()) { // 是 configChanges 的情况，操作缓冲计数器
                mBufferCnt--;
            } else {
                mForegroundCnt--;
                if (mForegroundCnt <= 0) {
                    // 这里处理从前台进入到后台的逻辑
                }
            }
        }

        @Override
        public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

        }

        @Override
        public void onActivityDestroyed(Activity activity) {

        }
    };

    public static MainApplication getInstance() {
        return mInstance;
    }
}
