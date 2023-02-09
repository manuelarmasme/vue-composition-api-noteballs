<template>
  <div class="container is-max-desktop px-2 py-4">
    <div class="notes">
      <AddEditNote
        v-model:modelValue="newNote"
        ref="addEditNoteRef"
        placeholder="Add a new Note..."
      >
        <template #buttons>
          <button
              @click="addNote"
              :disabled="!newNote"
              class="button is-link has-background-success"
            >
              Add a new note
            </button>
        </template>
      </AddEditNote>

      <progress
        v-if="!storeNotes.notesLoaded"
        class="progress is-large is-success mt-4"
        max="100"
      />

      <template v-else>

        <Note
          v-for="note in storeNotes.notes "
          :key="note.id"
          :note="note"
        />
      </template>

      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        <p>No notes here, yet....</p>
      </div>

    </div>
  </div>
</template>

<script setup>
/* imports */
import { ref, watch } from 'vue';
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes.js'
import { useWatchCharacters } from '@/use/useWatchCharacters.js'

/* stores */

const storeNotes = useStoreNotes()

/* notes */
const newNote= ref('')
const addEditNoteRef = ref(null)

const addNote = () => {

  storeNotes.addNote(newNote)

  newNote.value = ''

  addEditNoteRef.value.focusTextArea()

}

/* watcher character length */
useWatchCharacters(newNote)


</script>