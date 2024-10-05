import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'
import { createServiceClient } from './app/utils/supabase/server'

export async function middleware(request: NextRequest) {
    // Update the session data from supabase
    await updateSession(request)

    // Enforce user is admin for the /admin route
    if (request.nextUrl.pathname === '/admin') await enforceUserIsAdmin(request);

    return NextResponse.next({ request })
}

async function enforceUserIsAdmin(request: NextRequest) {
    const supabase = createServiceClient();

    const {
        data: { user },
      } = await supabase.auth.getUser();

    if (!user) {
        return {
            status: 401,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ error: 'Unauthorized' }),
        }
    }

    const { data, error } = await supabase.rpc('check_user_is_admin', { user_id: user.id });

    if (error) {
        return {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ error: error.message }),
        }
    }

    if (!data) {
        return {
            status: 403,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ error: 'Forbidden' }),
        }
    }

    return NextResponse.next({ request });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        /*
         * Match all request paths except for the ones starting with:
         * - .swa (Azure Static Web Apps)
         */
        '/((?!.swa).*)',
    ],
}