import { API_VENUES_BY_TEAM_RESPONSE } from "./venues-by-team";
import { API_VENUE_BY_ID_RESPONSE } from "./venue-by-id";

export const VENUES_BY_TEAM = (API_VENUES_BY_TEAM_RESPONSE.response as Array<{
  id: number;
  name: string;
  address: string | null;
  city: string;
  country: string;
  capacity: number | null;
  surface: string | null;
  image: string | null;
}>).map((item) => ({
  id: item.id,
  name: item.name,
  address: item.address,
  city: item.city,
  country: item.country,
  capacity: item.capacity,
  surface: item.surface,
  image: item.image,
}));

export const VENUE_BY_ID = API_VENUE_BY_ID_RESPONSE.response.map((item) => ({
  id: item.id,
  name: item.name,
  address: item.address,
  city: item.city,
  country: item.country,
  capacity: item.capacity,
  surface: item.surface,
  image: item.image,
}));

