package com.store.creditstore.Bean;

import java.util.List;

public class MessageContent<T> {
    private T result;
    private int type;

    public T getResult() {
        List<String> list;
        return result;
    }

    public int getType() {
        return type;
    }
}
