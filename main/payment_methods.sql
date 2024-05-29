create table payment_methods
(
    id                    integer    not null
        primary key autoincrement,
    payment_method_id     varchar    not null,
    payment_method_name   varchar    not null,
    payment_gateway_id    varchar    not null,
    payment_method_status tinyint(1) not null,
    created_at            datetime,
    updated_at            datetime
);

