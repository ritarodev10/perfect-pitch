import { API_COACHS_BY_TEAM_RESPONSE } from "./coachs-by-team";

export const COACHS_BY_TEAM = API_COACHS_BY_TEAM_RESPONSE.response.map((item) => ({
  id: item.id,
  name: item.name,
  firstName: item.firstname,
  lastName: item.lastname,
  age: item.age,
  birthDate: item.birth.date,
  birthPlace: item.birth.place,
  birthCountry: item.birth.country,
  nationality: item.nationality,
  height: item.height,
  weight: item.weight,
  photo: item.photo,
  teamId: item.team.id,
  teamName: item.team.name,
  teamLogo: item.team.logo,
  career: item.career.map((careerItem) => ({
    teamId: careerItem.team.id,
    teamName: careerItem.team.name,
    teamLogo: careerItem.team.logo,
    start: careerItem.start,
    end: careerItem.end,
  })),
}));



