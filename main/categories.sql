create table categories
(
    category_id     varchar    not null,
    category_name   varchar    not null,
    category_status tinyint(1) not null,
    created_at      datetime,
    updated_at      datetime
);

