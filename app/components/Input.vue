<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"  
      :class="[
        'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
      ]"
      :required="required"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
}>()

const emits = defineEmits(['update:modelValue'])

// Two-way binding for v-model
const onInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<!-- bind input event to v-model -->