<template>
    <button class="cursor-pointer" :class="{
        'ml-auto px-3 py-1 bg-green-800 text-white' : variant === 'green'
    }">
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    variant: String
}>()
</script>
