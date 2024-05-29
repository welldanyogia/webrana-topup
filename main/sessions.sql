create table sessions
(
    id            varchar not null
        primary key,
    user_id       integer,
    ip_address    varchar,
    user_agent    text,
    payload       text    not null,
    last_activity integer not null
);

create index sessions_last_activity_index
    on sessions (last_activity);

create index sessions_user_id_index
    on sessions (user_id);

