<template>
  <div
    class="`card p-4 mb-5`"
    :class="`has-background-${ bgColor }-dark `"
  >
    <div class="field">
      <div class="control">

        <label
          v-if="label"
          class="label has-text-white"
          :label="label"
        >
          {{ label }}
        </label>

        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textAreaRef"
          maxlength="100"
          v-autofocus
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
/* imports */
import {vAutofocus} from '@/directives/vAutofocus'
import { ref } from 'vue';
/* props */

const props = defineProps({
  modelValue:{
    type: String,
    required: true
  },

  bgColor:{
    type: String,
    default: 'success'
  },

  placeholder:{
    type: String,
    default: 'Type something...'
  },

  label:{
    type: String
  }
})

/* emits */
const emit = defineEmits(['update:modelValue'])


/* focus text area */
const textAreaRef = ref(null)

const focusTextArea = ()=>{
  textAreaRef.value.focus()
}

defineExpose({
  focusTextArea
})

</script>