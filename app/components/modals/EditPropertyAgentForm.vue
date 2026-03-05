<template>
    <Modal :open="open" @close="close">
        <form @submit.prevent="submit">
            <div class="border-b pb-5 border-gray-300">Edit Property Agent</div>
            <div class="gap-3 grid py-5">
                <Input id="firstName" label="Firstname" placeholder="Enter your firstname" v-model="form.firstName" required :error="propertyAgentStore.fieldErrors?.firstName" />
                <Input id="lastName" label="Lastname" placeholder="Enter your lastname" v-model="form.lastName" required :error="propertyAgentStore.fieldErrors?.lastName" />
                <Input id="email" type="email" label="Email" placeholder="Enter your email" v-model="form.email" required :error="propertyAgentStore.fieldErrors?.email" />
                <Input id="mobileNumber" label="Mobile #" placeholder="Enter your mobile #" v-model="form.mobileNumber" required :error="propertyAgentStore.fieldErrors?.mobileNumber" />
            </div>
            <div class="grid grid-cols-2 gap-3">
                <Button type="button" @click="close"  variant="outline-red">Cancel</Button>
                <Button type="submit" variant="blue">
                    {{ propertyAgentStore.loading ? 'Updating...' : 'Update' }}
                </Button>
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import type { PropertyAgent } from '~/types/property-agent';

const props = defineProps<{
    open: Boolean
    propertyAgent: PropertyAgent
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const propertyAgentStore = usePropertyAgentStore();

const form = ref<PropertyAgent>({ ...props.propertyAgent })

watch(
  () => props.propertyAgent,
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
    await propertyAgentStore.updateAgent(form.value)

    form.value = {} as PropertyAgent
    close()
  } catch (err) {
    console.error('Failed to update agent')
  }
}
</script>