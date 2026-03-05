<template>
    <Modal :open="open" @close="close">
        <div class="border-b pb-5 border-gray-300" :class="{'text-red-700': type === 'error'}">{{ message?.error }}</div>
        <div class="pt-4 pb-10 text-center" :class="{'text-red-700': type === 'error'}">{{ message?.message }}</div>

        <div class="flex">
            <Button type="button" class="m-auto" @click="close" variant="outline-blue">Close</Button>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import type { Message } from '~/types/alert-message';


const props = defineProps<{
    open: Boolean,
    type: String,
    message: Message | null,
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const close = () => {
  emit('close', false)
}
</script>