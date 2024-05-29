create table option_select_inputs
(
    id            integer not null
        primary key autoincrement,
    value         varchar not null,
    name          varchar not null,
    form_input_id integer not null
        references form_input_brands
            on delete cascade,
    created_at    datetime,
    updated_at    datetime
);

