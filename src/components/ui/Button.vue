<template>
	<button class="py-2 px-4 text-lg text-white rounded-lg hover:shadow-md"
		:class="{ 'bg-blue-600': background === 'blue', 'bg-teal-600': background === 'teal', 'bg-green-600': background === 'green' }">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'Button',
	props: {
		background: String,
	}
}
</script>