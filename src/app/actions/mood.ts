'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '../../../utils/supabase/server'

export async function saveMood(mood: MoodData, moodDesc: string){
    
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
   
    if (userError || !user) {
        throw new Error('Kullanıcı bulunamadı ya da oturum açmamış')
    }

    const {error} = await supabase.from('moods').insert({
        user_id: user.id,
        mood: mood.mood,
        mood_img: mood.icon,
        mood_desc: moodDesc,
        mood_date: new Date().toISOString()
    })

    if (error) {
        return { status: 'error', message: error.message }
    }

    revalidatePath('', 'layout')
    return { status: 'success' }
}