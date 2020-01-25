<template>
    <v-combobox
            v-model="chips"
            chips
            label="Candidates names"
            multiple
            solo
            @input="dataChanged"
    >
        <template v-slot:selection="{ item }">
            <v-chip
                    close
                    @click:close="remove(item)"
            >
                <strong>{{ item }}</strong>&nbsp;
            </v-chip>
        </template>
    </v-combobox>
</template>

<script>
    export default {
        data: () => ({
            chips: []
        }),
        name: "chip",
        methods: {
            remove (item) {
                this.chips.splice(this.chips.indexOf(item), 1);
                this.chips = [...this.chips]
            },
            dataChanged () {
                // eslint-disable-next-line no-console
                console.log("dataChanged")
                this.$emit('candidatesChanged', this.chips)
            },
        },
    }
</script>

<style scoped>

</style>