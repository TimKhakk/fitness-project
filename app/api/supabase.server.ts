import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://dwthrriiklffnyrggcno.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dGhycmlpa2xmZm55cmdnY25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEwOTYzNjYsImV4cCI6MTk3NjY3MjM2Nn0.i2KfjHUF5Jx7V4LCCyYu4Osdo0GZIs9yIlETBsWK4U8')