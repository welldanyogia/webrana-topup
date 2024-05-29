create table cache
(
    key        varchar not null
        primary key,
    value      text    not null,
    expiration integer not null
);

