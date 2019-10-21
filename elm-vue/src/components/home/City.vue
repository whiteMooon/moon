<template>
    <li>
        <router-link :to="'/city?id='+this.id" tag="span">{{ this.names }}</router-link>
    </li>
</template>

<script>
export default {
  name: "City",
  props: ["names",'id']
};
</script>

<style lang="scss" scoped>
li{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>