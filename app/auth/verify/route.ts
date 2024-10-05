import { type NextRequest } from 'next/server'

import { createAnonClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

}
