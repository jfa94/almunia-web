import {redirect} from "next/navigation"

export async function GET() {
    console.log('logging out...')
    redirect(`https://auth.almunia.io/logout?client_id=${process.env.AUTH_COGNITO_ID}&logout_uri=${process.env.CANONICAL_URL}/`)
}