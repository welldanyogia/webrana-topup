create table midtrans
(
    id          integer not null
        primary key autoincrement,
    merchant_id varchar,
    client_key  varchar,
    server_key  varchar,
    created_at  datetime,
    updated_at  datetime
);

