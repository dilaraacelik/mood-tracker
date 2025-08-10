'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../utils/supabase/server' /** burayı düzenle bacım */

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
    // redirect('/dashboard') // Bu satırı kaldır
    
    return {access_token: session.session?.access_token}
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if(password !== confirmPassword){
        console.log("Şifreler Aynı Değil")
        return
    }

    const {error} = await supabase.auth.signUp({email, password})
    
    if(error){
        console.log("Engel")
        return
    }

    revalidatePath('', 'layout')
    redirect('/dashboard')

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
/** CONFIRM EMAILYANLIŞ LİNKE GİDİYOR */