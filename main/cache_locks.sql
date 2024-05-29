create table cache_locks
(
    key        varchar not null
        primary key,
    owner      varchar not null,
    expiration integer not null
);

