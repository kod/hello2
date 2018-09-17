package com.store.creditstore.Bean;

public class ProductNotificationDomain extends BaseResultDomain {
    private long brandId;
    private long classfyId;
    private long subClassfyId;
    private String createTime;
    private String createUser;
    private String desc;
    private String goodsProperties;
    private long id;
    private String imageUrls;
    private String name;
    private int number;/*下单数量*/
    private int numbers;/*库存数量*/
    private int occupationNumber;
    private String packageList;
    private long price;
    private String propertiesIds;
    private String status;
    private String updateTime;
    private int usedNumber;
    private String iconUrl;
    private long typeId;
    private int discount;//64 折扣 64%
    private long orgPrice;//原价
    private boolean promotion;//是否打折
    private long totalAmount;
    private String tradeStatus;//交易类型 32：直冲；33：充值卡

    public long getBrandId() {
        return brandId;
    }

    public long getClassfyId() {
        return classfyId;
    }

    public long getSubClassfyId() {
        return subClassfyId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public String getCreateUser() {
        return createUser;
    }

    public String getDesc() {
        return desc;
    }

    public String getGoodsProperties() {
        return goodsProperties;
    }

    public long getId() {
        return id;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public String getName() {
        return name;
    }

    public int getNumber() {
        return number;
    }

    public int getNumbers() {
        return numbers;
    }

    public int getOccupationNumber() {
        return occupationNumber;
    }

    public String getPackageList() {
        return packageList;
    }

    public long getPrice() {
        return price;
    }

    public String getPropertiesIds() {
        return propertiesIds;
    }

    public String getStatus() {
        return status;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public int getUsedNumber() {
        return usedNumber;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public long getTypeId() {
        return typeId;
    }

    public int getDiscount() {
        return discount;
    }

    public long getOrgPrice() {
        return orgPrice;
    }

    public boolean isPromotion() {
        return promotion;
    }

    public long getTotalAmount() {
        return totalAmount;
    }

    public String getTradeStatus() {
        return tradeStatus;
    }
}
