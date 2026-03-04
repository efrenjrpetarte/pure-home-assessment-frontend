<template>
    <Modal :open="open" @close="close">
        <div>
            <div>Add Property Agent</div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
    open: Boolean
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const close = () => {
  emit('close', false)
}
</script>