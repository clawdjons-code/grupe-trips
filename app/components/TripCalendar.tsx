'use client'

import { useEffect, useState } from 'react'
import { TripEvent } from '@/types/trip'

interface TripCalendarProps {
  events: TripEvent[]
}

const typeColors: Record<TripEvent['type'], string> = {
  activity: 'bg-sky-500',
  meal: 'bg-amber-500',
  transport: 'bg-gray-400',
  accommodation: 'bg-purple-500',
}

const typeBadge: Record<TripEvent['type'], string> = {
  activity: 'bg-sky-100 text-sky-800',
  meal: 'bg-amber-100 text-amber-800',
  transport: 'bg-gray-100 text-gray-700',
  accommodation: 'bg-purple-100 text-purple-800',
}

export default function TripCalendar({ events }: TripCalendarProps) {
  // Group events by date
  const eventsByDate = events.reduce(
    (acc, evt) => {
      if (!acc[evt.date]) acc[evt.date] = []
      acc[evt.date].push(evt)
      return acc
    },
    {} as Record<string, TripEvent[]>,
  )

  const sortedDates = Object.keys(eventsByDate).sort()

  const formatDay = (d: string) => {
    const date = new Date(d + 'T12:00:00')
    return {
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    }
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((dateStr) => {
        const { weekday, date } = formatDay(dateStr)
        const dayEvents = eventsByDate[dateStr]
        return (
          <div key={dateStr}>
            <div className="flex items-baseline gap-3 mb-3">
              <h3 className="font-bold text-gray-900 text-lg">{date}</h3>
              <span className="text-sm text-gray-400">{weekday}</span>
            </div>
            <div className="space-y-2 pl-4 border-l-2 border-gray-100">
              {dayEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{evt.title}</h4>
                      {evt.location && (
                        <p className="text-sm text-gray-500 mt-0.5">📍 {evt.location}</p>
                      )}
                      {evt.description && (
                        <p className="text-sm text-gray-600 mt-1">{evt.description}</p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${typeBadge[evt.type]}`}
                    >
                      {evt.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
