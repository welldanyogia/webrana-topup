create table brands
(
    brand_id     varchar    not null,
    brand_name   varchar    not null,
    image_url    varchar,
    brand_status tinyint(1) not null,
    category_id  varchar    not null,
    created_at   datetime,
    updated_at   datetime
);

