export const URLBASE = import.meta.env.VITE_BACKEND_URL ?? "HTTP://LOCALHOST:3000";

export const ENDPOINT = {
  login: `${URLBASE}/users/login`,
  signup: `${URLBASE}/signup`,
  users: `${URLBASE}/usuarios`,
  products: `${URLBASE}/inventory/`,
  favorite: `${URLBASE}/favorites/`
};
