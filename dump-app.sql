
CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    price integer,
    quantity integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.items OWNER TO postgres;

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255),
    status boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


INSERT INTO public.items VALUES (1, 'Item 1', 'Item de prueba #1', 2000, 10, '2023-08-24 04:20:12.285+00', '2023-08-24 04:20:12.285+00');
INSERT INTO public.items VALUES (2, 'Item 2', 'Item de prueba #2', 5000, 2, '2023-08-24 04:20:40.336+00', '2023-08-24 04:20:40.336+00');
INSERT INTO public.items VALUES (5, 'Item 3', 'Item de prueba #3', 5000, 2, '2023-08-24 13:23:35.248+00', '2023-08-24 13:23:35.248+00');

INSERT INTO public.users VALUES (4, 'User prueba1', 'prueba1@gmail.com', '123456789', '123565456', true, NULL, NULL);
INSERT INTO public.users VALUES (5, 'User prueba2', 'prueba2@gmail.com', '123456789', '123565456', true, NULL, NULL);

SELECT pg_catalog.setval('public.items_id_seq', 5, true);
SELECT pg_catalog.setval('public.users_id_seq', 34, true);

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--

