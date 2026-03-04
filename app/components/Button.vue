<template>
    <button class="cursor-pointer" :class="{
        'px-4 py-2 rounded bg-green-800 text-white' : variant === 'green',
        'px-4 py-2 rounded bg-blue-800 text-white' : variant === 'blue',
        'px-4 py-2 rounded border border-red-800 text-red-800' : variant === 'outline-red'
    }">
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    variant: String
}>()
</script>
