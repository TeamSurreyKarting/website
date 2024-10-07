import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
      } = await supabase.auth.getUser()
    

    // If there is no user and an auth or admin route is hit, redirect to login
    if (
        !user && (
            request.nextUrl.pathname === '/auth' ||
            request.nextUrl.pathname.startsWith('/admin')
        )
      ) {
        // no user, potentially respond by redirecting the user to the login page
        console.log('No user, redirecting to login')
        return redirectToLogin(request);
    }

    // If the auth login route is hit and the user is already logged in, redirect
    if (request.nextUrl.pathname === '/auth/login' && user) {
        const isUserAdmin = user?.app_metadata?.is_admin === true;

        if (isUserAdmin) {
            // redirect to admin dashboard
            console.log('User is an admin, redirecting to admin dashboard: ', user);
            const url = request.nextUrl.clone();
            url.pathname = '/admin';
            return NextResponse.redirect(url);
        } else {
            // redirect to user dashboard
            console.log('User is not an admin, redirecting to user dashboard: ', user);
            const url = request.nextUrl.clone();
            // url.pathname = '/profile';
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    // console.log("\nNew Request");
    // console.log('User: ', user);
    // console.log('request.nextUrl.pathname: ', request.nextUrl.pathname);
    // console.log('user !== null: ', user !== null);
    // console.log('path starts with /admin: ', request.nextUrl.pathname.startsWith('/admin'));

    // If an admin route is hit, ensure the user is an admin
    if (user && request.nextUrl.pathname.startsWith('/admin')) {
        const isUserAdmin = user?.app_metadata?.is_admin === true;

        if (!isUserAdmin) {
            console.log('User is not an admin, redirecting to login: ', user);
            redirectToLogin(request);
        }
    }





    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}

function redirectToLogin(request: NextRequest) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url);
}