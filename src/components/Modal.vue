<template>
	<div class="fixed w-full h-full flex items-center justify-center bg-black/30 top-0 left-0" @click="closeModal">
		<form
			class="bg-white rounded shadow-xl py-6 px-4 flex flex-col w-4/5 sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-5"
			@click.stop="" type="submit">
			<h2 class="text-3xl col-span-full">Заказать звонок</h2>
			<Input v-model="form.name" :onChange="this.$store.commit('setName', form.name)" type="text" title="Имя*"
				placeholder="Иван Иванов" :errors='v$.form.name.$error' />
			<Input v-model="form.phone" :onChange="this.$store.commit('setPhone', phoneTransformation(form.phone))"
				type="tel" title="Телефон*" placeholder="+7 (___) ___-__-__" :errors='v$.form.phone.$error' />
			<Input v-model="form.email" :onChange="this.$store.commit('setEmail', form.email)" type="email"
				title="E-mail*" placeholder="you@example.com" :errors='v$.form.email.$error' />
			<Select class="sm:col-start-1 sm:col-end-3 lg:col-span-1" />
			<Button @click.prevent="onClickSubmit" type='submit'
				class="sm:col-start-3 sm:col-end-4 lg:col-start-4 lg:col-end-5 sm:self-end"
				background="green">Отправить</Button>
		</form>
		<transition name="slide-popup">
			<div v-if="isSendToRequest" class="bg-gray-300 rounded shadow-xl p-8 absolute top-2 right-2 duration-300"
				@click.stop="">
				<p v-if="response.status === 200" class="text-lg mb-1 text-green-600">Запрос успешно отправлен</p>
				<div v-html="response.data" class="text-lg mb-2" :class="{ 'text-red-600': response.status !== 200 }">
				</div>
				<Button v-if="response.status === 200" background="blue" @click="closeModal">ОК</Button>
			</div>
		</transition>
	</div>
</template>

<script>
import Button from './ui/Button.vue';
import Input from './ui/Input.vue';
import Select from './ui/Select.vue';

import { mapGetters } from 'vuex'

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	name: "Modal",
	components: { Button, Input, Select },
	props: {
		closeModal: Function
	},
	data: () => ({
		form: {
			name: '',
			email: '',
			phone: '',
		},
		isSendToRequest: false,
		response: ''
	}),
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			form: {
				name: { required },
				email: { required },
				phone: { required }
			}
		}
	},
	computed: {
		...mapGetters(['getUserForm'])
	},
	methods: {
		async onClickSubmit() {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}
			this.response = await this.$store.dispatch('requestToCall')
			this.isSendToRequest = true;

			if (this.response.status === 200) {
				this.form.name = ''
				this.form.email = ''
				this.form.phone = ''
			}
		},
		phoneTransformation(phone) {
			const newPhoneArray = phone.split('').filter(i => Number.isInteger(Number(i))).filter(i => i !== ' ')
			const newPhone = `+${newPhoneArray.join('')}`
			return newPhone
		}
	},
}
</script>

<style>
.slide-popup-enter-from,
.slide-popup-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
</style>