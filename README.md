# 🚀 ADmyBRAND Insights - AI-Powered Analytics Dashboard

A comprehensive, enterprise-grade analytics dashboard built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. This project showcases advanced dashboard development with real-time updates, interactive charts, comprehensive filtering, export functionality, and professional UI/UX patterns.

## ✨ Features

### 📊 Core Dashboard Features
- **Enhanced Overview Page** with animated metrics cards (Revenue, Users, Conversions, Growth %)
- **Interactive Charts** - Line chart, Bar chart, and Pie/Donut charts using Recharts
- **Advanced Data Tables** with sorting, filtering, pagination, and search using TanStack Table
- **Responsive Design** - Pixel-perfect on desktop, tablet, and mobile devices
- **Real-time Updates** with configurable refresh intervals (5s, 10s, 30s, 1m, off)
- **Live Data Streaming** with visual indicators and status monitoring

### 🎨 Modern UI/UX
- **Professional Design System** with consistent colors, typography, and spacing
- **Dark/Light Mode Toggle** with system preference detection
- **Smooth Animations** and micro-interactions throughout the interface
- **Beautiful Loading Skeletons** for enhanced perceived performance
- **Error Handling** with elegant fallbacks and retry mechanisms
- **Modern Component Library** using shadcn/ui with custom enhancements

### 🚀 Advanced Features
- **Enhanced Header Controls** with comprehensive dashboard management
  - **Smart Search** with keyboard shortcuts (Cmd/Ctrl + K)
  - **Notification System** with real-time alerts and dropdown
  - **User Profile Menu** with settings and logout options
  - **Dashboard Bookmark** functionality with persistence
  - **Share Dashboard** using Web Share API with clipboard fallback
  - **Fullscreen Toggle** using Fullscreen API
  - **Visibility Controls** to hide/show dashboard content
  - **Auto-refresh Settings** with configurable intervals

### 📈 Analytics & Data Management
- **Export Functionality** - PDF reports and CSV data export
- **Advanced Filtering** with date ranges, status filters, and search
- **Real-time Performance Metrics** with trend indicators
- **Traffic Source Analysis** with channel breakdown
- **Recent Activity Monitoring** with timestamp tracking
- **System Status Dashboard** with API health monitoring

### 🛠️ Settings & Configuration
- **Interactive Settings Page** with collapsible sections
- **Profile Management** with editable user information
- **Notification Preferences** with granular controls
- **Data Privacy Controls** with export and deletion options
- **API Key Management** with regeneration capabilities
- **Service Integrations** with webhook and automation setup
- **Comprehensive Export Options** (CSV, JSON, PDF, Metrics-only, Users-only)

### ⚡ Technical Excellence
- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** with custom animations and transitions
- **Component Architecture** with reusable, composable components
- **Mock Data Integration** with realistic sample data
- **Custom Hooks** for data fetching and state management
- **Local Storage Persistence** for user preferences
- **Error Boundaries** and comprehensive error handling
- **Mock Data Integration** with realistic sample data
- **Custom Hooks** for data fetching and state management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui with Radix UI primitives
- **Charts**: Recharts for interactive data visualization
- **Tables**: TanStack React Table with advanced features
- **Icons**: Lucide React icon library
- **Theme**: next-themes for dark/light mode
- **PDF Generation**: jsPDF for export functionality
- **State Management**: React hooks with localStorage persistence
- **APIs**: Web Share API, Fullscreen API, Clipboard API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamuelAlex013/AI_Analytics_Dashboard.git
   cd vibe-analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🎯 Usage Guide

### Dashboard Navigation
- Use the **sidebar** to navigate between different dashboard sections
- **Search functionality** is available in the header (use ⌘K or Ctrl+K)
- Toggle **dark/light mode** using the theme switcher in the header

### Real-time Features
1. **Enable Live Updates**: Click the "Enable Live" button in the header
2. **Configure Refresh Rate**: Select from 5s, 10s, 30s, 1m, or off
3. **Monitor Status**: Watch for green pulse indicators on active components

### Export and Sharing
1. **Export Data**: Use the export buttons for PDF or CSV downloads
2. **Share Dashboard**: Click the share button to use native sharing or copy link
3. **Bookmark Views**: Save your current dashboard state with the bookmark button

### Settings Management
1. **Profile Settings**: Update your personal information and preferences
2. **Notifications**: Configure alert preferences and frequency
3. **Data Privacy**: Manage your data and export options
4. **API Access**: Generate and manage API keys for integrations

## 🏗️ Project Structure

```
vibe-analytics/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── overview/       # Main dashboard view
│   │   │   ├── analytics/      # Analytics page
│   │   │   ├── customers/      # Customer management
│   │   │   ├── products/       # Product analytics
│   │   │   ├── reports/        # Report generation
│   │   │   └── settings/       # User settings
│   │   ├── globals.css        # Global styles & animations
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home page
│   ├── components/             # Reusable components
│   │   ├── charts/            # Interactive chart components
│   │   ├── layout/            # Navigation & header components
│   │   ├── ui/                # shadcn/ui component library
│   │   └── dashboard/         # Dashboard-specific components
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAnalytics.ts    # Analytics data management
│   │   ├── useLocalStorage.ts # Persistent storage
│   │   └── useTheme.ts        # Theme management
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts           # General utilities
│   │   ├── export.ts          # PDF/CSV export functions
│   │   └── constants.ts       # App constants
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── docs/                     # Documentation
└── .vscode/                  # VS Code configuration
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Optional: Analytics API endpoints
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_API_KEY=your-api-key

# Optional: Export settings
NEXT_PUBLIC_EXPORT_LIMIT=10000
```

### Customization
- **Theme Colors**: Edit `tailwind.config.js` for custom color schemes
- **Animation Settings**: Modify CSS variables in `globals.css`
- **Data Sources**: Update hooks in `src/hooks/` for different data providers
- **Component Styling**: Customize components in `src/components/ui/`

### Overview Page (`/dashboard/overview`)
- **Enhanced Metrics Cards** with real-time animations and trend indicators
- **Interactive Charts** with live data updates and hover effects
  - Revenue trends line chart with time-series data
  - User growth bar chart with comparative analysis
  - Traffic source pie chart with device breakdown
- **Advanced Data Table** with comprehensive user management
  - Real-time search across name and email fields
  - Multi-column sorting capabilities
  - Status filtering (Active, Inactive, Pending)
  - Export functionality (PDF/CSV)
- **Performance Dashboard** with key metrics
- **Traffic Analysis** with channel breakdown
- **Recent Activity Feed** with real-time updates
- **System Status Monitoring** with health indicators

### Enhanced Header Controls
- **Smart Search Bar** with keyboard shortcuts (⌘K / Ctrl+K)
- **Notification Center** with real-time alerts and activity feed
- **User Profile Menu** with settings access and logout
- **Dashboard Controls**:
  - Bookmark toggle with persistence
  - Share functionality (Web Share API + clipboard fallback)
  - Fullscreen mode toggle
  - Dashboard visibility controls
  - Auto-refresh interval settings (5s, 10s, 30s, 1m, off)
- **Real-time Status Indicators** with connection monitoring

### Users Page (`/dashboard/users`)
- Complete user management interface with enhanced filtering
- Sortable and filterable data table with search capabilities
- User status tracking with visual indicators
- Revenue and engagement metrics per user
- Bulk operations and export functionality

### Sales Page (`/dashboard/sales`)
- Sales transaction history with trend analysis
- Revenue summaries and performance metrics
- Order status tracking with real-time updates
- Multi-channel sales data (Online, Mobile, Store)
- Export capabilities for financial reporting

### Settings Page (`/dashboard/settings`)
- **Interactive Sections** with expand/collapse animations
- **Profile Management** with editable user information
- **Notification Preferences** with granular controls
- **Data & Privacy Controls** with comprehensive options
- **API Key Management** with secure regeneration
- **Service Integrations** with webhook configuration
- **Advanced Export Options**:
  - CSV format for spreadsheet analysis
  - JSON format for structured data
  - PDF reports with formatted layouts
  - Metrics-only exports for quick insights
  - User-specific data exports

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - For primary actions and navigation
- **Secondary**: Cyan (#06b6d4) - For secondary elements and accents
- **Success**: Green (#10b981) - For positive states and success indicators
- **Warning**: Amber (#f59e0b) - For warning states and attention items
- **Danger**: Red (#ef4444) - For error states and destructive actions

### Animation System
- **Hover Effects**: Scale transforms (hover:scale-105, hover:scale-[1.02])
- **Loading States**: Pulse animations for skeleton components
- **Page Transitions**: Slide-in animations with stagger effects
- **Real-time Indicators**: Animated dots and progress indicators
- **Micro-interactions**: Button press feedback and icon animations

### Component Architecture
- **Consistent Spacing**: Tailwind spacing scale (space-y-6, gap-4, etc.)
- **Typography Hierarchy**: Clear heading and text size relationships
- **Interactive States**: Hover, focus, and active state styling
- **Accessibility**: ARIA labels, keyboard navigation, and color contrast
- **Responsive Breakpoints**: Mobile-first design with progressive enhancement

## 🌟 Key Features Showcase

### Real-time Dashboard
- Live data updates with configurable refresh intervals
- Visual indicators for active connections and data streaming
- Performance metrics with trend analysis
- System health monitoring with status indicators

### Advanced Export System
- **PDF Reports**: Formatted documents with metrics and user data
- **CSV Exports**: Spreadsheet-compatible data for analysis
- **JSON Data**: Structured exports for API integration
- **Filtered Exports**: Respect current search and filter states

### Interactive UI Elements
- **Smart Search**: Global search with keyboard shortcuts
- **Notification System**: Real-time alerts with activity tracking
- **Bookmark System**: Save dashboard preferences with persistence
- **Share Functionality**: Native sharing with fallback options
- **Fullscreen Mode**: Distraction-free dashboard viewing

### Professional Settings Management
- **Collapsible Sections**: Organized settings with smooth animations
- **Live Preview**: Real-time changes with immediate feedback
- **Export Options**: Multiple formats for different use cases
- **API Management**: Secure key generation and service integration



## 📱 Mobile Responsiveness

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 640px - Stacked layout with touch-friendly controls
- **Tablet**: 640px - 1024px - Hybrid layout with collapsible sidebar
- **Desktop**: > 1024px - Full layout with all features visible

## 🚀 Deployment

### Quick Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy options:**
   - **Drag & Drop**: Upload the `out` folder to [Netlify](https://netlify.com)
   - **GitHub Integration**: Connect your repository for automatic deployments
   - **Netlify CLI**: Use `netlify deploy --prod --dir=out`

3. **Configuration:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Alternative Deployments
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Configure for static deployment
- **Any Static Host**: Use the `out` folder contents

