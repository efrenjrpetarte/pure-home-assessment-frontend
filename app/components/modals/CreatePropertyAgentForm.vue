<template>
    <Modal :open="open" @close="close">
        <form @submit.prevent="submit">
            <div class="border-b pb-5 border-gray-300">Add Property Agent</div>
            <div class="gap-3 grid py-5">
                <Input id="firstName" label="Firstname" placeholder="Enter your firstname" v-model="form.firstName" required />
                <Input id="lastName" label="Lastname" placeholder="Enter your lastname" v-model="form.lastName" required />
                <Input id="email" label="Email" placeholder="Enter your email" v-model="form.email" required />
                <Input id="mobileNumber" label="Mobile #" placeholder="Enter your mobile #" v-model="form.mobileNumber" required />
            </div>
            <div class="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline-red">Cancel</Button>
                <Button type="submit" variant="blue">
                    {{ propertyStore.loading ? 'Saving...' : 'Save' }}
                </Button>
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
    open: Boolean
}>()
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const propertyStore = usePropertyAgentStore();

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: ''
})

const close = () => {
  emit('close', false)
}

const submit = async () => {
  try {
    await propertyStore.createAgent(form.value)

    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: ''
    }

    close()
  } catch (err) {
    console.error('Failed to save agent')
  }
}
</script>