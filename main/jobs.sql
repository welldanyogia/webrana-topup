create table jobs
(
    id           integer not null
        primary key autoincrement,
    queue        varchar not null,
    payload      text    not null,
    attempts     integer not null,
    reserved_at  integer,
    available_at integer not null,
    created_at   integer not null
);

create index jobs_queue_index
    on jobs (queue);

