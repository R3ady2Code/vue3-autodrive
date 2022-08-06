<template>
	<div class="flex flex-col gap-1">
		<label for="cities" class="text-gray-700 text-lg">Город*</label>
		<select class="border rounded border-gray-400 py-2 px-3 text-lg" :value="getSelectedCity.name"
			v-model="selectCity">
			<option v-for="city in getCities" :key="city.id" :value="city">{{
					city.name
			}}
			</option>
		</select>
	</div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Select',
	computed: {
		...mapGetters(['getCities', 'getSelectedCity'])
	},
	data: () => ({
		selectCity: {}
	}),
	mounted() {
		this.selectCity = this.getSelectedCity
	},
	watch: {
		selectCity: function (val) {
			this.$store.commit('setCity', val)
		},
	},

}
</script>