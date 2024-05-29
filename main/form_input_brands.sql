create table form_input_brands
(
    id         integer not null
        primary key autoincrement,
    name       varchar not null,
    type       varchar not null,
    brand_id   varchar not null,
    created_at datetime,
    updated_at datetime,
    check ("type" in ('number', 'text', 'select'))
);

