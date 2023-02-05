<template>
  <div class="modal is-active p-4">
    <div class="modal-background"></div>
    <div
      ref="modalCardRef"
      class="modal-card"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="closeModal"
          class="delete"
          aria-label="close"
        >
        </button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
        @click="closeModal"
          class="button"
        >
          Cancel
        </button>
        <button
          @click="storeNotes.deleteNote(noteId)"
          class="button is-danger"
        >
          Delete Note
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
  /* imports */
  import { onMounted, onUnmounted, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core'
  import { useStoreNotes } from '@/stores/storeNotes.js'

  /* props */
  const props = defineProps({
    deleteNote: {
      type: Boolean,
      default: false
    },
    noteId:{
      type: String,
      required: true
    }
  })

  /*emits*/
  const emit = defineEmits(['update:deleteNote'])

  /* store note */
  const storeNotes = useStoreNotes()

  /* close modal */
  const closeModal = ()=>{
    emit('update:deleteNote', false)
  }

  /* close modal outside */

  const modalCardRef= ref(null)

  onClickOutside(modalCardRef, closeModal)

  /* keyboard control */
  const handleKeyboard = e =>{
    if (e.key === 'Escape') closeModal()
  }

  onMounted(()=>{
    document.addEventListener('keyup', handleKeyboard)
  })

  onUnmounted(()=>{
    document.removeEventListener('keyup', handleKeyboard)
  })
</script>