create table job_batches
(
    id             varchar not null
        primary key,
    name           varchar not null,
    total_jobs     integer not null,
    pending_jobs   integer not null,
    failed_jobs    integer not null,
    failed_job_ids text    not null,
    options        text,
    cancelled_at   integer,
    created_at     integer not null,
    finished_at    integer
);

