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
        dialog: false
      }
    },

    created() {
      this.init()
    },

    methods: {
        async init() {
          await VotingSystem.init()
        },

        async createBallot(ballotName) {
          await VotingSystem.createBallot(ballotName)
        },

        async getBallot() {
          return VotingSystem.getBallot(this.searchedBallot)
        }
    }
  };
</script>
