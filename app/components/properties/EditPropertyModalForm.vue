<template>
    <Modal :open="open" @close="close">
        <form @submit.prevent="submit">
            <div class="border-b pb-5 border-gray-300">Add Property</div>
            <div class="gap-3 grid py-5">
                <Select id="agentId" label="Agent" placeholder="Select agent" v-model="form.agentId" :options="options" required></Select>
                <Input id="name" label="Property Name" placeholder="Enter the property name" v-model="form.name" required />
                <Input id="address" label="Address" placeholder="Enter the address" v-model="form.address" required />
                <Input id="familyName" label="Tenant name" placeholder="Enter the tenant name" v-model="formFamily.name" required />
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
import type { Family } from '~/types/family';
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
const familyStore = useFamilyStore();

const form = ref<Property>({ ...props.property })
const formFamily = ref<Family>({ ...props.property.family })

watch(
  () => props.property,
  (newVal) => {
    if (newVal) { 
        form.value = { ...newVal }
        formFamily.value = { ...newVal.family }
    }
  },
  { immediate: true }
)

const close = () => {
  emit('close', false)
}

const submit = async () => {
  try {
    const res = await propertyStore.updateProperty(form.value)
    await familyStore.updateFamily(formFamily.value)

    form.value = {} as Property
    formFamily.value = {} as Family

    await propertyStore.fetchProperties()

    close()
  } catch (err) {
    console.error('Failed to save property')
  }
}
</script>