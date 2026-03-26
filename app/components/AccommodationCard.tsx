'use client'

import { Accommodation } from '@/types/trip'

interface AccommodationCardProps {
  accommodation: Accommodation
}

const typeColors: Record<string, string> = {
  'Main House': 'bg-blue-100 text-blue-800',
  Annex: 'bg-green-100 text-green-800',
  Condo: 'bg-purple-100 text-purple-800',
}

export default function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const { name, address, checkIn, checkOut, guests, bookingUrl } = accommodation

  const formatDate = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })

  const nights =
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24),
    ) + ' nights'

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-2" />
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex items-start gap-1">
          <span>📍</span>
          <span>{address}</span>
        </p>

        <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            📅 <strong>{formatDate(checkIn)}</strong> → <strong>{formatDate(checkOut)}</strong>
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{nights}</span>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
            Guests ({guests.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {guests.map((g) => (
              <span
                key={g}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {bookingUrl && (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-sky-600 hover:text-sky-800 font-medium"
          >
            🔗 View Booking
          </a>
        )}
      </div>
    </div>
  )
}
