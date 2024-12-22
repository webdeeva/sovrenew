export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      founding_citizens: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          city_state: string
          country: string
          occupation: string
          bio: string
          status: Database['public']['Enums']['application_status']
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          city_state: string
          country: string
          occupation: string
          bio: string
          status?: Database['public']['Enums']['application_status']
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          city_state?: string
          country?: string
          occupation?: string
          bio?: string
          status?: Database['public']['Enums']['application_status']
          created_at?: string
          user_id?: string | null
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed?: boolean
          created_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          username: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          username: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
          user_id?: string
        }
      }
    }
    Enums: {
      application_status: 'pending' | 'approved' | 'rejected'
    }
  }
}