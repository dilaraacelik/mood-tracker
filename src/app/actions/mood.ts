'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../../utils/supabase/server'

export async function saveOrUpdateMood(mood: MoodData, moodDesc: string) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        throw new Error('Kullanıcı bulunamadı ya da oturum açmamış')
    }

    const currentDate = new Date().toISOString().split('T')[0]

    const { error } = await supabase
        .from('moods')
        .upsert({
            user_id: user.id,
            mood: mood.mood,
            mood_img: mood.icon,
            mood_desc: moodDesc,
            mood_date: currentDate
        }, { onConflict: 'user_id,mood_date' })

    if (error) {
        return { status: 'error', message: error.message }
    }

    revalidatePath('', 'layout')
    return { status: 'success' }
}

export async function getMoods() {
    const supabase = await createClient();

    const {data: {user}, error: userSessionError} = await supabase.auth.getUser()

    if (userSessionError || !user) {
        throw new Error('Kullanıcı bulunamadı ya da oturum açmamış');
    }

    const {data: moodData, error} = await supabase.from('moods').select('mood, mood_img, mood_date').eq('user_id', user.id)

    if(error)
        return { status: 'error', message: error.message }

    return { status: 'success', data: moodData}
}
