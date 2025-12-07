# SofaScore API Integration

This module provides TypeScript types and utilities for fetching team data from the SofaScore API via RapidAPI.

## Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
SOFASCORE_API_URL=https://sofascore.p.rapidapi.com
SOFASCORE_API_KEY=your-api-key-here
SOFASCORE_TEAM_ID=2692
```

## Usage

### In Server Components

```tsx
import { getTeamDetail } from "@/data/sofascore";

export default async function TeamPage() {
  const teamData = await getTeamDetail();

  return (
    <div>
      <h1>{teamData.team.name}</h1>
      <p>League: {teamData.team.primaryUniqueTournament.name}</p>
      <p>Country: {teamData.team.country.name}</p>
      <p>Venue: {teamData.team.venue.name}</p>
    </div>
  );
}
```

### In Server Actions

```tsx
"use server";

import { getTeamDetail } from "@/data/sofascore";

export async function fetchTeamData(teamId?: number) {
  try {
    const data = await getTeamDetail(teamId);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

### With Custom Team ID

```tsx
import { getTeamDetail } from "@/data/sofascore";

// Fetch data for a specific team
const teamData = await getTeamDetail(1234);
```

## Types

All TypeScript types are exported from `./types`:

- `SofaScoreTeamDetailResponse` - Main response type
- `SofaScoreTeam` - Team information
- `SofaScoreVenue` - Venue/stadium information
- `SofaScoreManager` - Manager information
- `SofaScorePregameForm` - Pre-game form data
- And more...

## Error Handling

The function will throw errors if:

- Required environment variables are missing
- Team ID is not provided (and not set in env)
- API request fails
- Response is not OK

Always wrap calls in try-catch blocks:

```tsx
try {
  const data = await getTeamDetail();
  // Use data
} catch (error) {
  console.error("Failed to fetch team data:", error);
  // Handle error
}
```

