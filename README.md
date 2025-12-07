# Pitch Perfect

A premium football analytics dashboard built with Next.js, providing comprehensive team statistics, match insights, and performance analytics powered by the SofaScore API.

## 🚀 Features

- **Team Dashboard**: Comprehensive overview with team identity, statistics, and key performance indicators
- **Match Analytics**: Upcoming matches with head-to-head data, recent form, and match predictions
- **Performance Metrics**: Interactive radar charts and statistical comparisons
- **Standings Tracking**: Current and historical league standings with visual comparisons
- **Player Statistics**: Top performers and player leaderboards
- **Transfer Insights**: Recent transfers and squad changes
- **Injury Tracking**: Real-time injury updates and player availability
- **Responsive Design**: Modern, mobile-first UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Custom components with Shadcn patterns
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Iconify](https://iconify.design/)
- **API**: [SofaScore API](https://rapidapi.com/tipsters/api/sofascore) via RapidAPI

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A RapidAPI account with SofaScore API access
- Environment variables configured (see below)

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd pitch-perfect
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# SofaScore API Configuration
SOFASCORE_API_URL=https://sofascore.p.rapidapi.com
SOFASCORE_API_KEY=your-rapidapi-key-here
SOFASCORE_TEAM_ID=2692
SOFASCORE_TOURNAMENT_ID=17  # Optional: defaults to team's primary tournament
```

**Getting your API key:**

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the [SofaScore API](https://rapidapi.com/tipsters/api/sofascore)
3. Copy your API key from the RapidAPI dashboard
4. Find your team ID by searching for your team on SofaScore

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## 📁 Project Structure

```
pitch-perfect/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page and components
│   │   ├── api/                # API routes
│   │   └── page.tsx            # Main dashboard page
│   ├── components/
│   │   ├── ui/                 # Global UI primitives (Shadcn components)
│   │   ├── general/            # Complex reusable components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   └── layout/             # Layout components
│   ├── data/
│   │   ├── sofascore/          # SofaScore API integration
│   │   └── mock/               # Mock data for development
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── public/                     # Static assets
├── docs/                       # Documentation
└── assets/                     # Design assets
```

### Component Organization

Following the project's feature-based structure:

- **`components/ui/`** - Global UI primitives (highest reusability)
- **`components/general/`** - Complex reusable components (used in 2+ features)
- **`components/`** (root) - App-level components (layouts, providers)
- **`app/[feature]/_components/`** - Feature-specific components (co-located)

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Code Style

- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- Components follow single responsibility principle
- Feature-based organization for scalability

## 🌐 API Integration

The project integrates with the SofaScore API via RapidAPI. Key endpoints used:

- Team details and information
- Match data (upcoming, past, head-to-head)
- Team and player statistics
- League standings
- Transfer information
- Squad data

For detailed API documentation, see:

- [SofaScore API Docs](./docs/sofascore_all_endpoints.md)
- [Integration Guide](./src/data/sofascore/README.md)

## 🎨 Styling

The project uses:

- **Tailwind CSS 4** for utility-first styling
- **CSS Variables** for theming and customization
- **Custom fonts**: Space Grotesk (UI) and Manrope (Headings)
- **Responsive design** with mobile-first approach

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

The project is optimized for Vercel's platform with Next.js.

### Environment Variables in Production

Make sure to set all required environment variables in your deployment platform:

- `SOFASCORE_API_URL`
- `SOFASCORE_API_KEY`
- `SOFASCORE_TEAM_ID`
- `SOFASCORE_TOURNAMENT_ID` (optional)

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For internal contributions, please follow the project's coding standards and component organization guidelines.

---

Built with ❤️ using Next.js and TypeScript
