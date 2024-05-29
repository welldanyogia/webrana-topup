create table personal_access_tokens
(
    id             integer not null
        primary key autoincrement,
    tokenable_type varchar not null,
    tokenable_id   integer not null,
    name           varchar not null,
    token          varchar not null,
    abilities      text,
    last_used_at   datetime,
    expires_at     datetime,
    created_at     datetime,
    updated_at     datetime
);

create unique index personal_access_tokens_token_unique
    on personal_access_tokens (token);

create index personal_access_tokens_tokenable_type_tokenable_id_index
    on personal_access_tokens (tokenable_type, tokenable_id);

