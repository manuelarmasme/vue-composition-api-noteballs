<template>
  <div class="edit-note container is-max-desktop px-2 py-4">
    <AddEditNote
      v-model:modelValue="noteContent"
      bgColor="link"
      ref="addEditNoteRef"
      placeholder="Edit a note..."
      label="Edit Note"
    >
      <template #buttons>
        <button
            @click="$router.back()"
            class="button is-link is-light mr-2"
        >
            Cancel
        </button>

        <button
            @click="handleSavedClick"
            class="button is-link has-background-link"
            :disabled="!noteContent"
          >
            Save note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
  /* imports */
  import AddEditNote from '@/components/Notes/AddEditNote.vue';
  import { ref } from 'vue';
  import { useStoreNotes } from '@/stores/storeNotes';
  import { useRoute, useRouter } from 'vue-router'

  /* stores */
  const storeNotes = useStoreNotes()

  /* route */

  const route = useRoute()
  const router = useRouter()

  /* Notes */

  const noteContent = ref('')

  noteContent.value = storeNotes.getNoteContent(route.params.id)

  /* Handled saved Click */

  const handleSavedClick = ()=>{
    storeNotes.saveNote(route.params.id, noteContent.value)
    router.push('/')
  }
</script>