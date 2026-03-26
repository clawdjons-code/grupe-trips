'use client'

import { useEffect, useRef } from 'react'
import { Accommodation } from '@/types/trip'

interface TripMapProps {
  accommodations: Accommodation[]
}

export default function TripMap({ accommodations }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Fix leaflet default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      if (!mapRef.current) return

      const map = L.map(mapRef.current).setView(
        [27.9, -82.83],
        11,
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      accommodations.forEach((acc) => {
        const marker = L.marker([acc.lat, acc.lng]).addTo(map)

        const guestsHtml = acc.guests
          .map((g) => `<span class="guest-chip">${g}</span>`)
          .join('')

        const bookingLink = acc.bookingUrl
          ? `<a href="${acc.bookingUrl}" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9;font-size:12px;">🔗 View Booking</a>`
          : ''

        marker.bindPopup(`
          <div style="min-width:200px;font-family:system-ui,sans-serif">
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#111">${acc.name}</h3>
            <p style="margin:0 0 6px;font-size:12px;color:#666">📍 ${acc.address}</p>
            <p style="margin:0 0 6px;font-size:12px;color:#444">
              📅 ${acc.checkIn} → ${acc.checkOut}
            </p>
            <div style="margin-bottom:6px;display:flex;flex-wrap:wrap;gap:4px">
              ${guestsHtml}
            </div>
            ${bookingLink}
          </div>
        `)
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        ;(mapInstanceRef.current as { remove: () => void }).remove()
        mapInstanceRef.current = null
      }
    }
  }, [accommodations])

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
      <style>{`
        .guest-chip {
          background: #e0f2fe;
          color: #0369a1;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 999px;
          display: inline-block;
        }
        .leaflet-popup-content { margin: 12px 16px; }
      `}</style>
      <div ref={mapRef} style={{ height: '450px', width: '100%' }} />
    </div>
  )
}
