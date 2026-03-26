export interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  location: string
  description?: string
}

export interface Accommodation {
  id: string
  tripId: string
  name: string
  address: string
  lat: number
  lng: number
  checkIn: string
  checkOut: string
  guests: string[]
  bookingUrl?: string
}

export interface TripEvent {
  id: string
  tripId: string
  title: string
  date: string
  endDate?: string
  location?: string
  description?: string
  type: 'activity' | 'meal' | 'transport' | 'accommodation'
}
