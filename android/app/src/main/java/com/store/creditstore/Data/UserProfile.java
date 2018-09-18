package com.store.creditstore.Data;

import android.text.TextUtils;

/**
 * 用户数据保存
 */

public class UserProfile {
    private final String USER_ID = "UUID2";


    private volatile static UserProfile profile;

    private String mUserId = null;

    public static UserProfile getInstance() {
        return profile != null ? profile : (profile = new UserProfile());
    }

    /**
     * 保存UserId
     *
     * @param uuid uuid
     */
    public void saveUserId(String uuid) {
        mUserId = uuid;
        SharedPreferencesUtil.getInstance().putString(USER_ID, uuid);
    }

    /**
     * 读取UserId
     */
    public String getUserId() {
        if (TextUtils.isEmpty(mUserId)) {
            mUserId = SharedPreferencesUtil.getInstance().getString(USER_ID, null);
        }
        return mUserId;
    }

    /**
     * 是否为游客模式
     */
    public boolean isGuest() {
        if (TextUtils.isEmpty(mUserId)) {
            if (null != SharedPreferencesUtil.getInstance()) {
                mUserId = SharedPreferencesUtil.getInstance().getString(USER_ID, null);
            }
        }
        return TextUtils.isEmpty(mUserId);
    }
}
