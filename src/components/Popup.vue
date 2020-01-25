<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn class="mx-2" fab dark color="indigo" fixed right bottom v-on="on">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Create ballot</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="ballotName" label="Ballot name *" required></v-text-field>
                            </v-col>
                            <Chip @candidatesChanged="candidates => { this.candidatesNames = candidates }"></Chip>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="createBallot">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import Chip from "./Chip";
    import VotingSystem from "../web3/web3";
    export default {
        name: "popup",
        components: {Chip},

        data: () => ({
            dialog: false,
            ballotName: '',
            candidatesNames: []
        }),

        methods: {
            async createBallot() {
                await VotingSystem.createBallot(this.ballotName)
                this.candidatesNames.forEach(candidate => VotingSystem.addCandidate(this.ballotName, candidate))
            }
        }
    }
</script>

<style scoped>

</style>