create table web_indetities
(
    id         integer not null
        primary key autoincrement,
    key        varchar not null,
    value      text    not null,
    created_at datetime,
    updated_at datetime
);

create unique index web_indetities_key_unique
    on web_indetities (key);

