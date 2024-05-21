import {redirect} from "next/navigation"

export async function GET() {
    redirect(`https://almunia.auth.${process.env.CLOUD_REGION}.amazoncognito.com/logout?client_id=${process.env.AUTH_COGNITO_ID}&logout_uri=${process.env.CANONICAL_URL}/`)
}