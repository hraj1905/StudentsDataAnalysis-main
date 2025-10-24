-- Create admin user with specified credentials
-- First, let's ensure we have proper admin setup

-- Insert admin profile (this will be used by the trigger when user signs up)
INSERT INTO public.profiles (id, email, full_name, mobile, role)
VALUES (
  'be93432f-1031-4d9f-bad9-fb28331c3b6a'::uuid,
  'hraj48147@gmail.com',
  'Admin User',
  '9113401017',
  'admin'
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  mobile = EXCLUDED.mobile,
  role = 'admin';

-- Update the trigger function to handle the new admin email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, mobile, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile', ''),
    CASE 
      WHEN NEW.email IN ('hraj48147@gmail.com', 'harsh9937195@gmail.com') THEN 'admin'
      ELSE 'user'
    END
  ) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    mobile = EXCLUDED.mobile,
    role = EXCLUDED.role;
  RETURN NEW;
END;
$$;