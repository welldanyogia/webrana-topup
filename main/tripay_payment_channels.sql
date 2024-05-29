create table tripay_payment_channels
(
    id                   integer    not null
        primary key autoincrement,
    "group"              varchar    not null,
    code                 varchar    not null,
    name                 varchar    not null,
    type                 varchar    not null,
    fee_merchant_flat    numeric    not null,
    fee_merchant_percent numeric    not null,
    fee_customer_flat    numeric    not null,
    fee_customer_percent numeric    not null,
    total_fee_flat       numeric    not null,
    total_fee_percent    numeric    not null,
    minimum_fee          numeric,
    maximum_fee          numeric,
    icon_url             varchar    not null,
    active               tinyint(1) not null,
    created_at           datetime,
    updated_at           datetime
);

