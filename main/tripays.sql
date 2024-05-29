create table tripays
(
    id            integer not null
        primary key autoincrement,
    api_key       varchar not null,
    private_key   varchar not null,
    created_at    datetime,
    updated_at    datetime,
    merchant_code varchar not null
);

