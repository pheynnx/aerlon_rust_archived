CREATE TABLE
  public.post (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    date timestamp without time zone NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    series text NOT NULL,
    categories text [] NOT NULL,
    markdown text NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp without time zone NOT NULL DEFAULT current_timestamp(),
    published boolean NOT NULL,
    featured boolean NOT NULL
  );

ALTER TABLE
  public.post
ADD
  CONSTRAINT post_pkey PRIMARY KEY (id)