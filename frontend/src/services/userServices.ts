interface User {
  id: number;
  username: string;
  email: string;
}

let currentUser: User | null = null;

export const userService = {
  getCurrentUser: (): User | null => {
    return currentUser;
  },
  loginUser: (username: string, email: string): void => {
    currentUser = { id: 1, username, email };
  },
  logoutUser: (): void => {
    currentUser = null;
  },
};