'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../utils/supabase/server' /** burayı düzenle bacım */
import { toast } from 'react-toastify'

export async function login(formData: FormData) {

    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }
    
    const { data: session ,error } = await supabase.auth.signInWithPassword(data)

    if(error){
        return { error: error.message }
    }

    revalidatePath('', 'layout')
    
    return {access_token: session.session?.access_token}
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (password !== confirmPassword) {
    throw new Error("Şifreler aynı değil");
  }

  const { error} = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`
    }
  });

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('', 'layout')
  return { success: true }

}

export async function logout(){
    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser();

    if(user){
        const {error} = await supabase.auth.signOut();
        if (error) {
            return { error: error.message };
        }
    }

    revalidatePath("/", "layout");
    return { error: null };
}