package com.store.creditstore.Utility;

import com.google.gson.Gson;
import com.store.creditstore.Bean.NotificationResultDomain;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;

public class GsonService {
    public static <T> NotificationResultDomain<T> parseNotificationJson(String jsonString, Class<T> clazz) {
        NotificationResultDomain<T> retDomain = new NotificationResultDomain<>();
        try {
            Gson gson = new Gson();
            Type type = new ParameterizedTypeImpl(NotificationResultDomain.class, new Type[]{clazz});
            retDomain = gson.fromJson(jsonString, type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return retDomain;
    }

    /**
     * 把对象转换成Json 字符串
     *
     * @param obj object
     * @return Json string
     */
    public static String toJson(Object obj) {
        Gson gson = new Gson();

        return gson.toJson(obj);
    }

    /**
     * 把对象转换成Json 文件
     *
     * @param obj  object
     * @param file file to save
     * @return Json File
     */
    public static File saveJson(Object obj, File file) {
        Gson gson = new Gson();
        try {
            gson.toJson(obj, new FileWriter(file));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return file;
    }
}
