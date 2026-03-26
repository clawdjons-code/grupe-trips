'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { sampleTrip, sampleAccommodations, sampleEvents } from '@/app/lib/sampleData'
import OverviewTab from '@/app/components/OverviewTab'
import TripCalendar from '@/app/components/TripCalendar'
import AccommodationCard from '@/app/components/AccommodationCard'

// Leaflet must be loaded client-side (no SSR)
const TripMap = dynamic(() => import('@/app/components/TripMap'), { ssr: false })

type Tab = 'overview' | 'calendar' | 'map' | 'accommodations'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '🌴' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'map', label: 'Map', icon: '🗺️' },
  { id: 'accommodations', label: 'Stays', icon: '🏠' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-extrabold text-lg text-gray-900 leading-tight">
              🌴 Grupe Trip Planner
            </h1>
            <p className="text-xs text-gray-500">
              {sampleTrip.name} · July 4–12, 2026
            </p>
          </div>
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-semibold">
            {sampleAccommodations.length} stays
          </span>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto pb-0 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <OverviewTab trip={sampleTrip} events={sampleEvents} />
        )}

        {activeTab === 'calendar' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Calendar</h2>
            <TripCalendar events={sampleEvents} />
          </div>
        )}

        {activeTab === 'map' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Where We&apos;re Staying</h2>
            <p className="text-sm text-gray-500 mb-4">
              Click the pins to see details about each accommodation.
            </p>
            <TripMap accommodations={sampleAccommodations} />
          </div>
        )}

        {activeTab === 'accommodations' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accommodations</h2>
            <div className="space-y-4">
              {sampleAccommodations.map((acc) => (
                <AccommodationCard key={acc.id} accommodation={acc} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-4 py-8 text-center text-xs text-gray-400">
        Built with ❤️ for the family · Grupe Trip Planner
      </footer>
    </div>
  )
}
