<template>
    <Modal :open="open" @close="close">
        <form @submit.prevent="submit">
            <div class="border-b pb-5 border-gray-300">Add Property</div>
            <div class="gap-3 grid py-5">
                <Select id="agentId" label="Agent" placeholder="Select agent" v-model="form.agentId" :options="options" required></Select>
                <Input id="name" label="Name" placeholder="Enter the name" v-model="form.name" required />
                <Input id="address" label="Address" placeholder="Enter the address" v-model="form.address" required />
            </div>
            <div class="grid grid-cols-2 gap-3">
                <Button type="button" @click="close"  variant="outline-red">Cancel</Button>
                <Button type="submit" variant="blue">
                    {{ propertyStore.loading ? 'Updating...' : 'Update' }}
                </Button>
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import type { Property } from '~/types/property';
import type { Option } from '~/types/select-options';

const props = defineProps<{
    open: Boolean
    property: Property
    options: Option[]
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const propertyStore = usePropertyStore();

const form = ref<Property>({ ...props.property })

watch(
  () => props.property,
  (newVal) => {
    if (newVal) form.value = { ...newVal }
  },
  { immediate: true }
)

const close = () => {
  emit('close', false)
}

const submit = async () => {
  try {
    await propertyStore.updateProperty(form.value)

    form.value = {} as Property

    close()
  } catch (err) {
    console.error('Failed to save property')
  }
}
</script>