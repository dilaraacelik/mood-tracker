"use client"

import { useQuery } from '@tanstack/react-query'
import { getMoods } from "@/app/actions/mood"
import { 
  countByMood, 
  getMoodColor, 
  getMostFrequentMood, 
  getRecentMoods, 
  preparePieChartData 
} from "@/app/utils/statistics"
import MoodPieChart from "@/app/components/charts/MoodPieChart"

export default function StatisticsPage() {
  const { data: moodsResponse, isLoading, error } = useQuery({
    queryKey: ['moods'],
    queryFn: getMoods
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading your statistics...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn't load your statistics</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  const moods = moodsResponse?.data ?? []
  const counts = countByMood(moods) ?? {}
  const pieData = preparePieChartData(counts)
  
  const totalMoods = moods.length
  const mostFrequentMood = getMostFrequentMood(counts)
  const uniqueMoods = Object.keys(counts).length
  const recentMoods = getRecentMoods(moods, 7)


  // Empty state
  if (totalMoods === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Yet</h2>
          <p className="text-gray-600 mb-6">Start tracking your moods to see beautiful statistics here!</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Mood Statistics</h1>
          <p className="text-gray-600">Detailed analysis of your mood data</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          <div className="relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{totalMoods}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Most Frequent</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent capitalize">{mostFrequentMood[0] || '-'}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-2xl shadow-lg p-6 border border-pink-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Moods</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">{uniqueMoods}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl shadow-lg p-6 border border-amber-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last 7 Days</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{recentMoods.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Mood Distribution</h2>
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
            </div>
            <MoodPieChart data={pieData} />
          </div>

          {/* Mood List */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Mood Details</h2>
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              {Object.entries(counts).map(([mood, count]) => {
                const moodColor = getMoodColor(mood)

                return (
                  <div key={mood} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm" 
                        style={{ backgroundColor: moodColor }}
                      ></div>
                      <span className="font-medium text-gray-900 capitalize">{mood}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{count} times</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500 ease-out" 
                          style={{ 
                            width: `${(count / totalMoods) * 100}%`,
                            backgroundColor: moodColor
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 min-w-[3rem]">
                        {((count / totalMoods) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
