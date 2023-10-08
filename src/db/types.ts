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
      groups: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          group_id: string | null
          id: string
          name: string
          selected_by: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          name: string
          selected_by?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          name?: string
          selected_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      ss_column_mappings: {
        Row: {
          created_at: string
          deskt_column_id: string | null
          id: number
          sheet_mapping_id: number | null
          source_column_id: string | null
        }
        Insert: {
          created_at?: string
          deskt_column_id?: string | null
          id?: number
          sheet_mapping_id?: number | null
          source_column_id?: string | null
        }
        Update: {
          created_at?: string
          deskt_column_id?: string | null
          id?: number
          sheet_mapping_id?: number | null
          source_column_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ss_column_mappings_deskt_column_id_fkey"
            columns: ["deskt_column_id"]
            referencedRelation: "ss_columns"
            referencedColumns: ["ss_id"]
          },
          {
            foreignKeyName: "ss_column_mappings_sheet_mapping_id_fkey"
            columns: ["sheet_mapping_id"]
            referencedRelation: "ss_sheet_mappings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ss_column_mappings_source_column_id_fkey"
            columns: ["source_column_id"]
            referencedRelation: "ss_columns"
            referencedColumns: ["ss_id"]
          }
        ]
      }
      ss_columns: {
        Row: {
          created_at: string
          id: number
          name: string | null
          ss_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          ss_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          ss_id?: string
        }
        Relationships: []
      }
      ss_sheet_mappings: {
        Row: {
          created_at: string
          dest_id: string | null
          id: number
          source_id: string | null
          source_trigger_column_id: string | null
          user_id: number | null
          webhook_established: boolean | null
          webhook_id: string | null
        }
        Insert: {
          created_at?: string
          dest_id?: string | null
          id?: number
          source_id?: string | null
          source_trigger_column_id?: string | null
          user_id?: number | null
          webhook_established?: boolean | null
          webhook_id?: string | null
        }
        Update: {
          created_at?: string
          dest_id?: string | null
          id?: number
          source_id?: string | null
          source_trigger_column_id?: string | null
          user_id?: number | null
          webhook_established?: boolean | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ss_sheet_mappings_dest_id_fkey"
            columns: ["dest_id"]
            referencedRelation: "ss_sheets"
            referencedColumns: ["ss_id"]
          },
          {
            foreignKeyName: "ss_sheet_mappings_source_id_fkey"
            columns: ["source_id"]
            referencedRelation: "ss_sheets"
            referencedColumns: ["ss_id"]
          },
          {
            foreignKeyName: "ss_sheet_mappings_source_trigger_column_id_fkey"
            columns: ["source_trigger_column_id"]
            referencedRelation: "ss_columns"
            referencedColumns: ["ss_id"]
          },
          {
            foreignKeyName: "ss_sheet_mappings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "ss_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ss_sheet_mappings_webhook_id_fkey"
            columns: ["webhook_id"]
            referencedRelation: "ss_webhooks"
            referencedColumns: ["ss_id"]
          }
        ]
      }
      ss_sheets: {
        Row: {
          created_at: string
          name: string | null
          ss_id: string
        }
        Insert: {
          created_at?: string
          name?: string | null
          ss_id: string
        }
        Update: {
          created_at?: string
          name?: string | null
          ss_id?: string
        }
        Relationships: []
      }
      ss_users: {
        Row: {
          api_key: string | null
          created_at: string
          id: number
          idp_name: string | null
          name: string | null
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          id?: number
          idp_name?: string | null
          name?: string | null
        }
        Update: {
          api_key?: string | null
          created_at?: string
          id?: number
          idp_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      ss_webhooks: {
        Row: {
          created_at: string
          id: number
          name: string | null
          ss_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          ss_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          ss_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_sheet_mapping:
        | {
            Args: {
              sourceid: string
              sourcename: string
              destid: string
              destname: string
              keyfieldid: string
              keyfieldname: string
              webhookid: string
            }
            Returns: string
          }
        | {
            Args: {
              sourceid: string
              sourcename: string
              destid: string
              destname: string
              keyfieldid: string
              webhookid: string
            }
            Returns: string
          }
      create_sheet_mapping2: {
        Args: {
          sourceid: string
          sourcename: string
          destid: string
          destname: string
          keyfieldid: string
          keyfieldname: string
          webhookid: string
        }
        Returns: string
      }
      draw_name: {
        Args: {
          groupid: string
          username: string
        }
        Returns: string
      }
      hello: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      my_stored_procedure: {
        Args: {
          param1: number
          param2: string
        }
        Returns: undefined
      }
      test_storedproc: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']