create table transactions
(
    trx_id         varchar                   not null
        primary key,
    buyer_id       varchar,
    user_id        varchar,
    server_id      varchar,
    user_name      varchar,
    phone_number   varchar,
    email          varchar,
    buyer_sku_code varchar                   not null,
    product_brand  varchar                   not null,
    product_name   varchar                   not null,
    amount         integer                   not null,
    status         varchar default 'pending' not null,
    payment_method varchar                   not null,
    payment_name   varchar                   not null,
    no_va          varchar,
    no_rekening    varchar,
    payment_status varchar default 'unpaid'  not null,
    expired_time   datetime                  not null,
    qr_url         varchar,
    qr_string      varchar,
    created_at     datetime,
    updated_at     datetime,
    check ("payment_status" in ('PAID', 'FAILED', 'EXPIRED', 'REFUND', 'UNPAID')),
    check ("status" in ('pending', 'process', 'failed', 'success'))
);

