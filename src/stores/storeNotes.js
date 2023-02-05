import { defineStore, acceptHMRUpdate } from 'pinia'
import { db } from '@/js/firebase'
import { collection, query,
    onSnapshot, doc, setDoc, addDoc,
    deleteDoc, updateDoc, orderBy
  } from "firebase/firestore";

const noteCollectionRef = query(collection(db, 'notes'))
const noteCollectionQuery = query(noteCollectionRef, orderBy('date', 'desc'));

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
    async getNote(){
      this.notesLoaded = false

      onSnapshot(noteCollectionQuery, (querySnapshot) => {

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