import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://mapgrxtdzohpoqmzqhrc.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcGdyeHRkem9ocG9xbXpxaHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDI4NTYsImV4cCI6MjAxMDc3ODg1Nn0.-nDU4wr4LC3V85xgUDH4uTdmC5S7QKzIq3kcqDvz84Q'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
