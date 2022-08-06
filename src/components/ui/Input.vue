<template>
	<div class="flex flex-col gap-1">
		<label class="text-gray-700 text-lg">{{ title }}</label>
		<input @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" :type='type'
			:placeholder='placeholder' v-maska="type === 'tel' && '+7 (###) ###-##-##'"
			class="border rounded border-gray-400 py-2 px-3 text-lg" :class="{ 'border-red-600': errors }">
		<span v-if="errors" class="text-red-600">Обязательное поле</span>
	</div>

</template>

<script>
export default {
	name: 'Input',
	props: {
		title: String,
		type: String,
		placeholder: String,
		modelValue: String,
		errors: Boolean
	},
	data: () => ({
		textInput: ''
	}),
	methods: {
		onChangeInput() {
			switch (this.type) {
				case 'text':
					this.$store.commit('setName', this.textInput);
					break
				case 'tel':
					this.$store.commit('setPhone', this.textInput);
					break
				case 'email':
					this.$store.commit('setEmail', this.textInput);
					break
			}
		}
	}
}
</script>