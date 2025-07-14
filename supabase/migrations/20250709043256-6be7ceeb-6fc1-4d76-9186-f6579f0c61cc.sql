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