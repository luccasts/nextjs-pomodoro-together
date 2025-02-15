import { supabase } from "@/lib/supabase/client";

export const uploadProfilePicture = async (file: File, userId: string) => {
  const fileName = `${crypto.randomUUID()}.${file.type.split("/")[1]}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const imageUrl = urlData.publicUrl;

  const { error: dbError } = await supabase
    .from("users")
    .update({ profile_picture: imageUrl })
    .eq("id", userId);

  if (dbError) throw dbError;

  return imageUrl;
};
