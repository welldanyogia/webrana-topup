create table types
(
    type_id     varchar    not null,
    type_name   varchar    not null,
    type_status tinyint(1) not null,
    created_at  datetime,
    updated_at  datetime
);

