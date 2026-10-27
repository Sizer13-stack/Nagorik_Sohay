-- Run in Supabase SQL editor (Phase 2b wires the app to these tables).
create table sources(id text primary key,title text,title_en text,office text,office_en text,url text,aliases text,text text,text_en text,svc boolean default true,pending boolean default false,checklist jsonb,mock boolean default false,verified_at date,created_at timestamptz default now());
create table reports(id text primary key,cat text,descr text,ward int,status text default 'received',priority text,ai jsonb,geo jsonb,created_at timestamptz default now());
create table report_events(id bigserial primary key,report_id text references reports(id),status text,note text,at timestamptz default now());
create table budget_items(id bigserial primary key,item text,item_en text,category text,category_en text,unit_price numeric,qty numeric,vendor text,vendor_en text,ward int,source_url text);
alter table sources enable row level security;alter table reports enable row level security;alter table report_events enable row level security;alter table budget_items enable row level security;
create policy "public read sources" on sources for select using(true);
create policy "public read budget" on budget_items for select using(true);
create policy "anyone can report" on reports for insert with check(true);
create policy "public read reports" on reports for select using(true); -- public view must expose ward-level data only; restrict columns via a view before launch
-- staff writes (update status, add sources, import budget) go through the service-role key on the server.
