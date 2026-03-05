<template>
    <Modal :open="open" @close="close">
        <form @submit.prevent="submit">
            <div class="border-b pb-5 border-gray-300">Add Property</div>
            <div class="gap-3 grid py-5">
                <Select v-if="!agentId" id="agentId" label="Agent" placeholder="Select agent" v-model="form.agentId" :options="options" required></Select>
                <div v-else>
                    <div>Agent Name</div>
                    <span class="pl-2 font-semibold">{{ selectedAgent }}</span>
                </div>
                <Input id="name" label="Property Name" placeholder="Enter the property name" v-model="form.name" required />
                <Input id="address" label="Address" placeholder="Enter the address" v-model="form.address" required />
                <Input id="familyName" label="Tenant name" placeholder="Enter the tenant name" v-model="formFamily.name" />
            </div>
            <div class="grid grid-cols-2 gap-3">
                <Button type="button" @click="close"  variant="outline-red">Cancel</Button>
                <Button type="submit" variant="blue">
                    {{ propertyStore.loading ? 'Saving...' : 'Save' }}
                </Button>
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import type { Option } from '~/types/select-options';

const props = defineProps<{
    open: Boolean
    options: Option[]
    agentId?: string
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const propertyStore = usePropertyStore();
const familyStore = useFamilyStore();

const form = ref({
    agentId: '',
    name: '',
    address: '',
})

const formFamily = ref({
    propertyId: '',
    name: ''
})

const close = () => {
  emit('close', false)
}

const selectedAgent = computed(() => {
    return props.options.find(option => option.value === props.agentId)?.label
})

const submit = async () => {
    if (props.agentId) form.value.agentId = props.agentId
    try {
        const res = await propertyStore.createProperty(form.value)

        if (res && formFamily.value.name !== '') {
            formFamily.value.propertyId = res.id
            await familyStore.createFamily(formFamily.value)
        }

        form.value = {
            agentId: '',
            name: '',
            address: '',
        }

        await propertyStore.fetchProperties()

        close()
    } catch (err) {
        console.error('Failed to save property')
    }
}
</script>