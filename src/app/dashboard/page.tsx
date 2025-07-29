import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants'

export default function DashboardPage() {
  redirect(ROUTES.OVERVIEW)
}
