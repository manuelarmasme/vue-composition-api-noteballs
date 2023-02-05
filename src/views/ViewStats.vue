<template>
  <div class="stats container is-max-desktop px-2 py-4">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stats</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of characters (all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNoteballs"
      class="input"
      placeholder="Do you love noteballs?"
      type="text"
      v-autofocus
    >
  </div>
</template>

<script setup>
  /* import */
  import { useStoreNotes } from '@/stores/storeNotes';
  import {vAutofocus} from '@/directives/vAutofocus'
  import { useWatchCharacters } from '@/use/useWatchCharacters.js'
  import { ref } from 'vue';

  /* store */

  const storeNotes = useStoreNotes()

  /* love noteballs */
  const loveNoteballs= ref('')
  useWatchCharacters(loveNoteballs, 50)
</script>