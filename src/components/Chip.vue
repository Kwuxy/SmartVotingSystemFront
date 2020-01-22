<template>
    <v-combobox
            v-model="chips"
            :items="items"
            chips
            label="Candidates names"
            multiple
            solo
    >
        <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="remove(item)"
            >
                <strong>{{ item }}</strong>&nbsp;
            </v-chip>
        </template>
    </v-combobox>
</template>

<script>
    export default {
        name: "chip",
        methods: {
            remove (item) {
                this.chips.splice(this.chips.indexOf(item), 1);
                this.chips = [...this.chips]
            },
        },
    }
</script>

<style scoped>

</style>