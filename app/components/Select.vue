<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium">
      {{ label }}
    </label>

    <select
      :id="id"
      v-model="selected"
      :required="required"
      class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Option } from '~/types/select-options';

const props = defineProps<{
  modelValue: string | number | null
  options: Option[]
  label?: string
  placeholder?: string
  id?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value as string | number),
})
</script>