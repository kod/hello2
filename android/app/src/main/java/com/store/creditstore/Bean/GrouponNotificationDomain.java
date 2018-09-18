package com.store.creditstore.Bean;

public class GrouponNotificationDomain extends BaseResultDomain {
    private long id;//拼单编号
    private String name;//名称
    private String desc;//详情
    private long brandId;//主商品编号
    private long productId;//详情商品编号
    private long masterId;
    private String goodsProperties;//产品图
    private String propertiesIds;//属性ids
    private String packageList;//包装列表
    private String imageUrls;//图片集
    private long price;//原价
    private long mergePrice;//拼单价
    private int numbers;//库存
    private int periods;//可分期数 0：不可分期 3：可分三期 6：可分六期
    private int personNum;//发起拼单有效人数
    private int days;//发起拼单有效天数
    private int orderMaxNum;//最高订单数
    private int status;
    private long totalAmount;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }

    public long getBrandId() {
        return brandId;
    }

    public long getProductId() {
        return productId;
    }

    public String getGoodsProperties() {
        return goodsProperties;
    }

    public String getPropertiesIds() {
        return propertiesIds;
    }

    public String getPackageList() {
        return packageList;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public long getPrice() {
        return price;
    }

    public long getMergePrice() {
        return mergePrice;
    }

    public int getNumbers() {
        return numbers;
    }

    public int getPeriods() {
        return periods;
    }

    public int getPersonNum() {
        return personNum;
    }

    public int getDays() {
        return days;
    }

    public int getOrderMaxNum() {
        return orderMaxNum;
    }

    public int getStatus() {
        return status;
    }

    public long getTotalAmount() {
        return totalAmount;
    }

    public long getMasterId() {
        return masterId;
    }
}
