create table digi_auths
(
    id         integer not null
        primary key autoincrement,
    username   varchar not null,
    api_key    varchar not null,
    created_at datetime,
    updated_at datetime
);

