<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        @click.stop
      >
        <!-- Close button -->
        <button
          @click="close"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <!-- Modal content slot -->
        <slot />
      </div>
    </div>
  </transition>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>