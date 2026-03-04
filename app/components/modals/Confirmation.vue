<template>
    <Modal :open="open" @close="close">
        <div class="border-b pb-5 border-gray-300">{{ title }}</div>
        <div class="pt-4 pb-10">{{ description }}</div>

        <div class="grid grid-cols-2 gap-3">
            <Button type="button" @click="close" variant="outline-red">Cancel</Button>
            <Button type="submit" @click="submit" variant="blue">
                {{ submitButton }}
            </Button>
        </div>
    </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
    open: Boolean,
    title: String,
    description: String,
    submitButton: String
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
  (e: 'submit', value: boolean): void
}>()

const close = () => {
  emit('close', false)
}

const submit = async () => {
  emit('submit', false)
}
</script>