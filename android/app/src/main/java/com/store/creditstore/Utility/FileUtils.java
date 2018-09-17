package com.store.creditstore.Utility;

import android.content.Context;
import android.os.Environment;
import android.text.TextUtils;

import java.io.File;

public class FileUtils {
    /**
     * 返回默认的文件存储路径
     */
    public static String getDefaultFilePath(Context context) {
        String path = null;
        if (isSdCardAvailable()) {
            File file = context.getExternalFilesDir("");
            if (null != file) {
                path = file.getPath();
            }
        }
        /*获取不到外部存储则返回内部存储*/
        if (TextUtils.isEmpty(path)) {
            path = context.getFilesDir().getPath();
        }
        return path;
    }



    public static boolean isSdCardAvailable() {
        return Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState());
    }
}