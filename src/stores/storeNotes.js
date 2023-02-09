import { defineStore, acceptHMRUpdate } from 'pinia'
import { db } from '@/js/firebase'
import { collection, query,
    onSnapshot, doc, setDoc, addDoc,
    deleteDoc, updateDoc, orderBy
  } from "firebase/firestore";
import { useStoreAuth } from '@/stores/storeAuth';

let noteCollectionRef
let noteCollectionQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        // {
        //   id: 'id1',
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut provident voluptas iusto sint, explicabo beatae optio repudiandae suscipit eos quae? Inventore a distinctio quaerat commodi suscipit itaque assumenda. Id, ut?'
        // },
        // {
        //   id: 'id2',
        //   content: 'this is a shorter note!!!!'
        // }
      ],
      notesLoaded: false
    }
  },

  actions: {
    init(){
      const storeAuth = useStoreAuth()

      noteCollectionRef = query(collection(db, 'users', storeAuth.user.id, 'notes'))
      noteCollectionQuery = query(noteCollectionRef, orderBy('date', 'desc'));
      this.getNote()
    },

    async getNote(){
      this.notesLoaded = false

      getNotesSnapshot = onSnapshot(noteCollectionQuery, (querySnapshot) => {

        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }

          notes.push(note)
        })

        this.notes = notes
        this.notesLoaded = true
      });
    },

    async addNote(newNoteContet) {

      let currentDate = new Date().getTime(),
            date = currentDate.toString()

      await addDoc(noteCollectionRef, {
        content: newNoteContet.value,
        date
      })
    },

    clearNotes(){
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() //unsubcribe 
    },

    async deleteNote(idToDelete){
      await deleteDoc(doc(noteCollectionRef, idToDelete));
    },

    async saveNote(id, content){
      await updateDoc(doc(noteCollectionRef, id), {
        content
      });
    }
  },

  getters:{

    getNoteContent: (state)=>{
      return (id) =>{
        return state.notes.filter(note=> note.id === id )[0].content
      }
    },

    totalNotesCount: (state) => {
      return state.notes.length
    },

    totalCharactersCount: (state) => {
      let count = 0

      state.notes.forEach(note => {
        count += note.content.length
      })

      return count
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
}