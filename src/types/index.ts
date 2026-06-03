// ------- Match -------
export interface Match {
  fixture_id: number
  fixture_date: string
  fixture_status: string
  league_id: number
  league_name: string
  league_round: string
  teamhome_name: string
  teamhome_logo: string
  teamhome_winner: boolean | null
  teamaway_name: string
  teamaway_logo: string
  teamaway_winner: boolean | null
  goal_home: number | null
  goal_away: number | null
  odd_home: number | null
  odd_draw: number | null
  odd_away: number | null
}

export interface MatchesResponse {
  current: Match[]
}

// ------- Bet -------
export type Prediction = 'home' | 'draw' | 'away'
export type BetStatus = 'pending' | 'won' | 'lost'

export interface Bet {
  id: string
  match_id: number
  amount: number
  odds: number
  prediction: Prediction
  status: BetStatus
  matches?: Match
}

export interface CreateBetPayload {
  match_id: string
  amount: number
  odds: number
  prediction: Prediction
}

// ------- User -------
export interface User {
  id: string
  user_id: string
  username: string
  balance: number
}

// ------- Auth -------
export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: User
}
