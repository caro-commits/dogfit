-- Permet de distinguer les messages de contact non lus, lus et
-- répondus dans /admin/messages.
alter table contact_messages
  add column status text not null default 'unread'
  check (status in ('unread', 'read', 'replied'));

create policy "contact_messages: admin update" on contact_messages for update using (public.is_admin());
