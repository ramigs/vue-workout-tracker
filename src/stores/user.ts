import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null as User | null,
    }
  },
  actions: {
    setUser(session: Session | null) {
      this.user = session ? session.user : null
    },
  },
})
