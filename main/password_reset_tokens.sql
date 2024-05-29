create table password_reset_tokens
(
    email      varchar not null
        primary key,
    token      varchar not null,
    created_at datetime
);

