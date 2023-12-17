export const URLBASE = import.meta.env.VITE_BACKEND_URL ?? "HTTP://LOCALHOST:3000";

export const ENDPOINT = {
  login: `${URLBASE}/users/login`,
  signup: `${URLBASE}/users/signup`,
  users: `${URLBASE}/users/`,
  products: `${URLBASE}/inventory/`,
  favorite: `${URLBASE}/favorites/`
};
