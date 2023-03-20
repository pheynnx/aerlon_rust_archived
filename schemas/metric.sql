CREATE TABLE
  public.metric (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    path text NULL,
    ip text NULL,
    created_at timestamp without time zone NOT NULL DEFAULT current_timestamp()
  );

ALTER TABLE
  public.metric
ADD
  CONSTRAINT metric_pkey PRIMARY KEY (id)