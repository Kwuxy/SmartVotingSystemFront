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
            <span class="grey--text">
            The ballot is {{stateDict[this.ballot.state]}}.
              </span>
            <template v-slot:actions>
              <v-btn v-if="ballot.state == 1 && isOwner"
                     text
                     color="deep-purple accent-4"
                     @click="openBallot">OPEN BALLOT</v-btn>
              <v-btn v-if="ballot.state == 2 && isOwner"
                     text
                     color="deep-purple accent-4" @click="closeBallot">CLOSE BALLOT</v-btn>
            </template>
          </v-banner>

          <v-card-text class="grey lighten-5">
            <template class="mx-auto">
              <v-row justify="space-around">
                <v-col cols="12" lg="12">
                  <v-sheet width="100%" class="pa-4 grey lighten-5">
                    <v-row justify="center" class="pa-5">
                      <v-chip-group
                              column
                              active-class="primary--text" >
                        <v-chip v-on:click="setSelectedCandidate(candidateResult.name)" large v-for="candidateResult in candidatesResult" :key="candidateResult.name">
                          <div>
                            <strong>{{ candidateResult.name }} </strong> &nbsp;
                            <span>({{ candidateResult.vote }})</span>
                          </div>

                        </v-chip>
                      </v-chip-group>
                    </v-row>
                    <v-row justify="center">
                      <v-btn v-if="ballot.state == 2"
                             text
                             color="deep-purple accent-4" @click="vote">VOTE</v-btn>
                    </v-row>
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
        candidatesResult: [],
        selectedCandidate: '',
        stateDict: {
          1: "waiting to be opened",
          2: "open",
          3: "closed"
        }
      }
    },

    created() {
      this.init()
    },

    computed: {
      isOwner() {
        return this.ballot.owner == (VotingSystem.getConnectedAccount())
      }
    },

    methods: {
      async init() {
        await VotingSystem.init()
      },

      async getBallot() {
        if (this.searchedBallot != '') {
          this.ballot = await VotingSystem.getBallot(this.searchedBallot)
          this.candidatesResult = await VotingSystem.getCandidatesResult(this.searchedBallot)
        }
      },

      async openBallot() {
        await VotingSystem.openBallotVotes(this.ballot.name)
        this.getBallot()
      },

      async closeBallot() {
        await VotingSystem.closeBallotVotes(this.ballot.name)
        this.getBallot()
      },

      async vote() {
        if(this.selectedCandidate != '') {
          await VotingSystem.vote(this.ballot.name, this.selectedCandidate)
          this.getBallot()
        }
        else {
          alert("You must select one candidate")
        }
      },

      setSelectedCandidate(candidateName) {
        if(this.selectedCandidate == candidateName)
          this.selectedCandidate = ''
        else
          this.selectedCandidate = candidateName
      },
    }
  };
</script>
