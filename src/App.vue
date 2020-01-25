<template>
  <v-app>
    <v-app-bar
            app
            color="primary"
            dark
    >
      <div class="d-flex align-center">
        <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                transition="scale-transition"
                width="40"
        />

        <v-img
                alt="Vuetify Name"
                class="shrink mt-1 hidden-sm-and-down"
                contain
                min-width="100"
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                width="100"
        />
      </div>

      <v-spacer/>
      <v-text-field v-model="searchedBallot" placeholder="Ballot name"/>
      <v-btn v-on:click="getBallot()" color="indigo" fab small dark style="margin-left: 10px;">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer/>
    </v-app-bar>

    <v-content>
      <template v-if="ballot != null">
        <v-card>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{this.ballot.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div>
            </div>
          </v-toolbar>
          <v-banner
                  single-line
          >
            <template v-slot:actions>
              <v-btn v-if="ballot.state == 1 && isOwner"
                     text
                     color="deep-purple accent-4"
                     @click="openBallot">OPEN</v-btn>
              <v-btn v-if="ballot.state == 2 && isOwner"
                     text
                     color="deep-purple accent-4" @click="closeBallot">CLOSE</v-btn>
            </template>
          </v-banner>
          <v-card-text class="grey lighten-5">
            <template class="mx-auto">
              <v-row justify="space-around">
                <v-col cols="12" sm="6" md="4" lg="3">
                  <v-sheet class="pa-4 grey lighten-5">
                    <v-chip-group
                            column
                            active-class="primary--text" >
                      <v-chip v-for="candidate in ballot.candidatesName" :key="candidate">
                        {{ candidate }}
                      </v-chip>
                    </v-chip-group>
                  </v-sheet>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </template>
      <Popup/>
    </v-content>
  </v-app>
</template>

<script>
  import Popup from "./components/Popup";
  import VotingSystem from "./web3/web3";

  export default {
    name: 'App',

    components: {
      Popup
    },

    data () {
      return {
        searchedBallot: '',
        dialog: false,
        ballot: null,
      }
    },

    created() {
      this.init()
    },

    methods: {
      async init() {
        await VotingSystem.init()
      },

      async getBallot() {
        this.ballot = await VotingSystem.getBallot(this.searchedBallot)
      },

      async openBallot() {
        await VotingSystem.openBallotVotes(this.ballot.name)
        this.getBallot()
      },

      async closeBallot() {
        await VotingSystem.closeBallotVotes(this.ballot.name)
        this.getBallot()
      },

      isOwner() {
        return this.owner == VotingSystem.getConnectedAccount
      }
    }
  };
</script>
