// Coordinates use decimal degrees: north/east positive, south/west negative.
// Coordinates mark an approximate center of each country.
// Add a country here; the globe and country selector update together.
export const serviceLocations = [
  {
    id: 'chile',
    flag: 'CL',
    latitude: -35.7,
    longitude: -71.5,
  },
  {
    id: 'japan',
    flag: 'JP',
    latitude: 36.2,
    longitude: 138.3,
  },
  {
    id: 'brazil',
    flag: 'BR',
    latitude: -10.3,
    longitude: -53.2,
  },
  {
    id: 'nicaragua',
    flag: 'NI',
    latitude: 12.9,
    longitude: -85.2,
  },
  {
    id: 'madagascar',
    flag: 'MG',
    latitude: -18.8,
    longitude: 46.9,
  },
] as const;
