import create from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

// interface UserState {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   } | null;
//   setUser: (user: UserState['user']) => void;
// }

interface AccessTokenState {
  accessToken: string | null;
  setAccessToken: (user: AccessTokenState['accessToken']) => void;
}

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));


export const accessTokenStore = create<AccessTokenState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
}));


export const useStore = create()((devtools(persist
  (subscribeWithSelector((set) => ({

    accessToken: null,
    setAccessToken: (data: any) => set((state: any) => {
      return {
        accessToken: data
      }
    }),

  })), {
    name: 'zustand',
  }))))
