<template>
    <div class="taiji" :class="type"></div>
</template>

<style lang="less" src="./taiji.less" scoped></style>

<script>
    export default {
        name: 'taiji',

        props: {
            type: String
        }
    }
</script>