create table products
(
    id                    integer    not null
        primary key autoincrement,
    product_name          varchar    not null,
    brand_id              varchar    not null,
    type_id               varchar    not null,
    seller_name           varchar    not null,
    price                 varchar    not null,
    buyer_sku_code        varchar    not null,
    product_status        tinyint(1),
    buyer_product_status  tinyint(1) not null,
    seller_product_status tinyint(1) not null,
    unlimited_stock       tinyint(1) not null,
    stock                 varchar    not null,
    multi                 tinyint(1) not null,
    start_cut_off         varchar    not null,
    end_cut_off           varchar    not null,
    desc                  text,
    created_at            datetime,
    updated_at            datetime,
    selling_price         integer
);

