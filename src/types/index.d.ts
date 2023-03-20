import { Session } from 'next-auth'
import { Location } from '../utils/firebase'
import { BrnoBikeAccidentsResponse } from './api'

declare global {
  interface Window {
    SMap: any
    Loader: any
  }
}

export type Coord = {
  lat: number
  lng: number
}

export type HomeModuleDayProps = {
  temperature: string | number
  precipitation: string | number
  accidents: BrnoBikeAccidentsResponse
}

export type HomePageProps = {
  yesterday: HomeModuleDayProps
  today: HomeModuleDayProps
  tomorrow: HomeModuleDayProps
}

export type PlanTripPageProps = {
  locationAccidents: {
    [key in string]: (BrnoBikeAccidentsResponse[0]['attributes'] & { lat: number; lng: number })[]
  }
  allLocations: Location[]
}
