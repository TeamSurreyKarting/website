export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      League: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          name: string | null
          points_allocation_method: Database["public"]["Enums"]["points_allocations"]
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          name?: string | null
          points_allocation_method?: Database["public"]["Enums"]["points_allocations"]
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          name?: string | null
          points_allocation_method?: Database["public"]["Enums"]["points_allocations"]
          start_date?: string | null
        }
        Relationships: []
      }
      LeagueEntrant: {
        Row: {
          created_at: string
          id: number
          league_id: number
          racer_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          league_id: number
          racer_id: number
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: number
          racer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "LeagueEntrant_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "League"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "LeagueEntrant_racer_id_fkey"
            columns: ["racer_id"]
            isOneToOne: false
            referencedRelation: "Racers"
            referencedColumns: ["id"]
          },
        ]
      }
      RaceEvent: {
        Row: {
          arrival_time: string | null
          created_at: string
          format: Database["public"]["Enums"]["race_format"]
          id: number
          league_id: number
          track_id: number | null
        }
        Insert: {
          arrival_time?: string | null
          created_at?: string
          format?: Database["public"]["Enums"]["race_format"]
          id?: number
          league_id: number
          track_id?: number | null
        }
        Update: {
          arrival_time?: string | null
          created_at?: string
          format?: Database["public"]["Enums"]["race_format"]
          id?: number
          league_id?: number
          track_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "RaceEvent_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "League"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "RaceEvent_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "Tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      RaceEventSession: {
        Row: {
          created_at: string
          id: number
          race_event_id: number | null
          session_end: string | null
          session_start: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          race_event_id?: number | null
          session_end?: string | null
          session_start?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          race_event_id?: number | null
          session_end?: string | null
          session_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "RaceEventSession_race_event_id_fkey"
            columns: ["race_event_id"]
            isOneToOne: false
            referencedRelation: "RaceEvent"
            referencedColumns: ["id"]
          },
        ]
      }
      RaceEventSessionResult: {
        Row: {
          created_at: string
          event_session_id: number | null
          fastest_lap: number | null
          id: number
          racer_id: number
          total_time: number | null
        }
        Insert: {
          created_at?: string
          event_session_id?: number | null
          fastest_lap?: number | null
          id?: number
          racer_id: number
          total_time?: number | null
        }
        Update: {
          created_at?: string
          event_session_id?: number | null
          fastest_lap?: number | null
          id?: number
          racer_id?: number
          total_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "RaceEventSessionResult_event_session_id_fkey"
            columns: ["event_session_id"]
            isOneToOne: false
            referencedRelation: "RaceEventSession"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "RaceEventSessionResult_racer_id_fkey"
            columns: ["racer_id"]
            isOneToOne: false
            referencedRelation: "Racers"
            referencedColumns: ["id"]
          },
        ]
      }
      RaceLicenses: {
        Row: {
          created_at: string
          id: number
          license_type: Database["public"]["Enums"]["license_type"] | null
          racer_id: number | null
          valid_until: string
        }
        Insert: {
          created_at?: string
          id?: number
          license_type?: Database["public"]["Enums"]["license_type"] | null
          racer_id?: number | null
          valid_until?: string
        }
        Update: {
          created_at?: string
          id?: number
          license_type?: Database["public"]["Enums"]["license_type"] | null
          racer_id?: number | null
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "RaceLicenses_racer_id_fkey"
            columns: ["racer_id"]
            isOneToOne: false
            referencedRelation: "Racers"
            referencedColumns: ["id"]
          },
        ]
      }
      Racers: {
        Row: {
          created_at: string
          experience_level: Database["public"]["Enums"]["experience_level"]
          first_name: string | null
          full_name: string | null
          id: number
          last_name: string | null
          student_id_expiry: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          experience_level?: Database["public"]["Enums"]["experience_level"]
          first_name?: string | null
          full_name?: string | null
          id?: number
          last_name?: string | null
          student_id_expiry?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          experience_level?: Database["public"]["Enums"]["experience_level"]
          first_name?: string | null
          full_name?: string | null
          id?: number
          last_name?: string | null
          student_id_expiry?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "racers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Tracks: {
        Row: {
          created_at: string
          id: number
          name: string | null
          track_map_upload_path: string | null
          type: Database["public"]["Enums"]["track_type"] | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          track_map_upload_path?: string | null
          type?: Database["public"]["Enums"]["track_type"] | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          track_map_upload_path?: string | null
          type?: Database["public"]["Enums"]["track_type"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_fastest_laps: {
        Args: {
          for_event_id: number
          for_league_id: number
        }
        Returns: {
          event_session_result_id: number
          event_session_id: number
          event_id: number
          racer_id: number
          fastest_lap: number
          total_time: number
          first_name: string
          last_name: string
          experience_level: Database["public"]["Enums"]["experience_level"]
        }[]
      }
      get_types: {
        Args: {
          enum_type: string
        }
        Returns: Json
      }
      racers_not_league_entrants: {
        Args: {
          requested_league_id: number
        }
        Returns: {
          id: number
          user_id: string
          first_name: string
          last_name: string
          created_at: string
          student_id_expiry: string
          experience_level: Database["public"]["Enums"]["experience_level"]
        }[]
      }
    }
    Enums: {
      experience_level: "rookie" | "experienced" | "graduate"
      license_type: "bukc_test" | "bukc_full"
      points_allocations: "formula1_top10" | "linear_top10"
      race_format: "practice" | "sprint" | "endurance"
      track_type: "outdoor" | "indoor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
