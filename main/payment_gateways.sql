create table payment_gateways
(
    payment_gateway_id     varchar    not null,
    payment_gateway_name   varchar    not null,
    payment_gateway_status tinyint(1) not null,
    created_at             datetime,
    updated_at             datetime
);

