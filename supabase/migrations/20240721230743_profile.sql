CREATE TYPE user_role as ENUM ('USER', 'ADMIN', 'EDITOR');

CREATE TABLE public.profiles(
    user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    photo_url text,
    display_name text,
    bio text,
    username text UNIQUE CHECK (
        username ~* '^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$' 
        AND char_length(username) > 2 
        AND char_length(username) < 15
    ),
    role user_role NOT NULL DEFAULT 'USER',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);


-- HANDLE NEW USER

CREATE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
    AS $$
BEGIN
    -- create profile name and photo
    INSERT INTO public.profiles(user_id, photo_url, display_name)
    VALUES(
        NEW.id, 
        NEW.raw_user_meta_data ->> 'avatar_url', 
        NEW.raw_user_meta_data ->> 'full_name'
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER create_profile_on_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_new_user();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Helper functions

CREATE OR REPLACE FUNCTION public.isOwner(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT user_id = (SELECT auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.isAdmin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM profiles p
        WHERE p.user_id = (SELECT auth.uid())
        AND p.role = 'ADMIN'
    );
$$;

CREATE OR REPLACE FUNCTION public.isEditor()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM profiles p
        WHERE p.user_id = (SELECT auth.uid())
        AND p.role = 'EDITOR'
    );
$$;

-- INDEXES (default is btree)
CREATE INDEX ON public.profiles (user_id, role);
CREATE INDEX ON public.profiles (user_id);

-- Public profiles are viewable by everyone
CREATE POLICY "rls_profiles_read_public"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Users can insert their own profile
CREATE POLICY "rls_profiles_create_own"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (isOwner(user_id));

-- Users can update their own profile
CREATE POLICY "rls_profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (isOwner(user_id))
  WITH CHECK (isOwner(user_id));

-- Admins can insert a profile
CREATE POLICY "rls_profiles_create_admin"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (isAdmin());

-- Admins can update a profile
-- Note: Can't change yourself away from 'ADMIN'
CREATE POLICY "rls_profiles_update_admin"
  ON profiles FOR UPDATE
  TO authenticated
  USING (isAdmin())
  WITH CHECK (isAdmin());

-- Profile Image

CREATE OR REPLACE FUNCTION public.extension(name text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT split_part(name, '.', 2);
$$;

-- User can insert own profile photo 

INSERT INTO storage.buckets
  (id, name, public)
VALUES
  ('photos', 'photos', true);

CREATE POLICY "rls_photos_profile_insert_own"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'photos'
    AND (storage.foldername(name))[1] = 'profiles'
    AND (SELECT (storage.foldername(name))[2]::uuid) = (SELECT auth.uid())
    AND extension(name) IN ('jpg', 'jpeg', 'gif', 'png', 'webp')
  );

-- User can delete own profile photo

CREATE POLICY "rls_photos_profile_delete_own"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'photos'
    AND (storage.foldername(name))[1] = 'profiles'
    AND (SELECT (storage.foldername(name))[2]::uuid) = (SELECT auth.uid())
    AND extension(name) IN ('jpg', 'jpeg', 'gif', 'png', 'webp')
  );