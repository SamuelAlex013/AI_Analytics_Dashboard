export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  OVERVIEW: '/dashboard/overview',
  USERS: '/dashboard/users',
  SALES: '/dashboard/sales',
  SETTINGS: '/dashboard/settings',
} as const

export const NAVIGATION_ITEMS = [
  {
    title: 'Overview',
    href: ROUTES.OVERVIEW,
    icon: 'LayoutDashboard',
  },
  {
    title: 'Users',
    href: ROUTES.USERS,
    icon: 'Users',
  },
  {
    title: 'Sales',
    href: ROUTES.SALES,
    icon: 'TrendingUp',
  },
  {
    title: 'Settings',
    href: ROUTES.SETTINGS,
    icon: 'Settings',
  },
] as const

export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  orange: '#f97316',
} as const

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const
