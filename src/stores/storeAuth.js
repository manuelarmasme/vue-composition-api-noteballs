import { defineStore, acceptHMRUpdate } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },

  actions: {
    init(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
        } else {
          this.user = {}
          this.router.replace('/auth')
        }
      })
    },

    registerUser(credentials){
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user
          // console.log(user)
        })
        .catch((error) => {
          // console.log('Error: ', error.message)
        })
    },

    loginUser(credentials){
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user
          // console.log('User', user);
        })
        .catch((error) => {
          // console.log('Error: ', error.message);
        })
    },

    logOutUser(){
      signOut(auth).then(() => {
        // console.log('User sign out');
      }).catch((error) => {
        // console.log(error.message);
      })
    }
  },


})

/* hot reloading */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot))
}