package com.store.creditstore.Bean;

public class NotificationResultDomain<T> extends BaseBean {

    private String msg;//消息标题
    private String subMsg;//副标题
    private String img;
    private MessageContent<T> messageResult;

    private NotificationType mType = null;

    public String getMsg() {
        return msg;
    }

    public String getSubMsg() {
        return subMsg;
    }

    public String getImg() {
        return img;
    }

    public NotificationType getType() {
        if (null == messageResult){
            return NotificationType.INVALID;
        }
        if (null == mType) {
            mType = NotificationType.getTypeByValue(messageResult.getType());
        }

        return mType;
    }

    public T getResult(){
        return messageResult.getResult();
    }
}
