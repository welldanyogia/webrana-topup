create table migrations
(
    id        integer not null
        primary key autoincrement,
    migration varchar not null,
    batch     integer not null
);

