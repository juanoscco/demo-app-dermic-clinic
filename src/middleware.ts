import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('logged');
    if (token) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL('/', request.url));
    }

}

export const config = {
    matcher: [
        '/dash-admin/home',
        // 
        '/dash-admin/persons/create/',
        '/dash-admin/persons/list/',
        '/dash-admin/persons/list/:path*',
        // 
        '/dash-admin/patients/create/',
        '/dash-admin/patients/list/',
        '/dash-admin/patients/list/:path*',
        // 
        '/dash-admin/procedures/create/',
        '/dash-admin/procedures/list/',
        '/dash-admin/procedures/list/:path*',
        // 
        '/dash-admin/infrastructure/create/',
        '/dash-admin/infrastructure/list/',
        '/dash-admin/infrastructure/list/:path*',
        // 
        // '/dash-admin/appointments/create/',
        '/dash-admin/appointments/list/',
        '/dash-admin/appointments/list/:path*',
        '/dash-admin/appointments/appointment-calendar/',
        '/dash-admin/appointments/appointment-reports/',
        '/dash-admin/appointments/appointment-extras/',
        '/dash-admin/appointments/waiting-patient/',

    ],
}