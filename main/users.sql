create table users
(
    id                integer not null
        primary key autoincrement,
    name              varchar not null,
    role              varchar default 'user',
    email             varchar not null,
    email_verified_at datetime,
    password          varchar not null,
    remember_token    varchar,
    created_at        datetime,
    updated_at        datetime
);

create unique index users_email_unique
    on users (email);

