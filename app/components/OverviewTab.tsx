'use client'

import { Trip, TripEvent } from '@/types/trip'

interface OverviewTabProps {
  trip: Trip
  events: TripEvent[]
}

const typeEmoji: Record<TripEvent['type'], string> = {
  activity: '🏄',
  meal: '🍽️',
  transport: '✈️',
  accommodation: '🏠',
}

export default function OverviewTab({ trip, events }: OverviewTabProps) {
  const totalDays =
    Math.round(
      (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1

  const typeCounts = events.reduce(
    (acc, evt) => {
      acc[evt.type] = (acc[evt.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const formatDate = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  // Next upcoming event
  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.find((e) => e.date >= today)

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="text-4xl mb-2">🌴</div>
        <h2 className="text-2xl font-bold">{trip.name}</h2>
        <p className="text-sky-100 mt-1">{trip.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <div className="text-sky-200 text-xs uppercase tracking-wide">From</div>
            <div className="font-semibold">{formatDate(trip.startDate)}</div>
          </div>
          <div>
            <div className="text-sky-200 text-xs uppercase tracking-wide">To</div>
            <div className="font-semibold">{formatDate(trip.endDate)}</div>
          </div>
          <div>
            <div className="text-sky-200 text-xs uppercase tracking-wide">Duration</div>
            <div className="font-semibold">{totalDays} days</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(typeCounts) as TripEvent['type'][]).map((type) => (
          <div key={type} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-1">{typeEmoji[type]}</div>
            <div className="text-2xl font-bold text-gray-900">{typeCounts[type]}</div>
            <div className="text-xs text-gray-500 capitalize">{type}s</div>
          </div>
        ))}
      </div>

      {/* Next Up */}
      {upcoming && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-600 uppercase tracking-wide font-semibold mb-1">
            Next Up
          </p>
          <p className="font-bold text-gray-900">{upcoming.title}</p>
          {upcoming.location && (
            <p className="text-sm text-gray-600 mt-0.5">📍 {upcoming.location}</p>
          )}
          {upcoming.description && (
            <p className="text-sm text-gray-500 mt-1">{upcoming.description}</p>
          )}
          <p className="text-xs text-amber-700 mt-2 font-medium">
            📅{' '}
            {new Date(upcoming.date + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}

      {/* Quick Itinerary */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-lg">Full Itinerary</h3>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-3 pl-8">
            {events.map((evt) => (
              <div key={evt.id} className="relative">
                <div className="absolute -left-5 w-3 h-3 rounded-full bg-sky-400 border-2 border-white shadow-sm mt-1" />
                <p className="font-medium text-gray-900 text-sm">{evt.title}</p>
                <p className="text-xs text-gray-400">
                  {new Date(evt.date + 'T12:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  {evt.location && ` · ${evt.location}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
