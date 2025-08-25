
export function countByMood(moods: any[]){
    const counts: Record<string, number> = {}
    moods.forEach(m => {
        counts[m.mood] = (counts[m.mood] || 0) + 1
    })
    return counts
}

// Duygu bazlı renk eşleştirmesi - Modern UI yaklaşımı
export function getMoodColor(moodName: string): string {
    const moodColors: { [key: string]: string } = {
        'happy': '#84CC16',      // Neon Lime - enerji, neşe
        'sad': '#3B82F6',        // Soft Blue - yumuşak, melankolik  
        'angry': '#EF4444',      // Vibrant Red - dikkat çekici
        'calm': '#06B6D4',       // Mint Green - ferahlatıcı
        'anxious': '#8B5CF6',    // Deep Purple - mistik, karmaşık
        'lover': '#EC4899',      // Hot Pink - modern, cesur
        'neutral': '#6B7280',    // Cool Gray - minimal, dengeli
        'tired': '#F59E0B',      // Warm Orange - sıcak, yorgun
    }
    return moodColors[moodName.toLowerCase()] || '#6B7280'
}

// En sık hissedilen duyguyu bulma
export function getMostFrequentMood(counts: Record<string, number>): [string, number] {
    const entries = Object.entries(counts)
    if (entries.length === 0) return ['', 0]
    
    return entries.reduce((a, b) => counts[a[0]] > counts[b[0]] ? a : b, ['', 0])
}

// Belirli tarih aralığındaki ruh hallerini filtreleme
export function getRecentMoods(moods: any[], days: number = 7): any[] {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() - days)
    
    return moods.filter(mood => new Date(mood.mood_date) >= targetDate)
}

// Chart için veri formatını hazırlama
export function preparePieChartData(counts: Record<string, number>): { name: string, value: number }[] {
    return Object.entries(counts).map(([name, value]) => ({ 
        name, 
        value: Number(value) 
    }))
}