<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to the front"/>
<!--        <p>{{toDisplay}}</p>-->
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'

    // if (typeof voting_system.currentProvider.sendAsync !== "function") {
    //   voting_system.currentProvider.sendAsync = function() {
    //     return voting_system.currentProvider.send.apply(
    //             voting_system.currentProvider, arguments
    //     );
    //   };
    // }


    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        // data () {
        //     return {
        //         ballot: "",
        //         toDisplay: "default",
        //         web3: ""
        //     }
        // },
        // created() {
        //     let Web3 = require('web3');
        //     let contract = require('truffle-contract');
        //
        //     if (typeof web3 !== 'undefined') {
        //         this.$data.web3 = new Web3(window.web3.currentProvider);
        //     } else {
        //         this.$data.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        //     }
        //
        //     const voting_system_artifacts = require('../build/contract/VotingSystem.json');
        //     const voting_system = contract(voting_system_artifacts);
        //
        //     voting_system.setProvider(this.$data.web3.currentProvider);
        //
        //     this.test();
        // },
        // methods() {
        //     async function test() {
        //         let instance = await voting_system.deployed();
        //         let _ballotName = 'urgiherigherg';
        //
        //         let bytes32Name = convertStringToBytes32(_ballotName);
        //
        //         this.$data.toDisplay = this.$data.web3.eth.givenProvider;
        //         // console.log(web3.eth.givenProvider);
        //
        //         await instance.createBallot(bytes32Name, {from: this.$data.web3.eth.givenProvider.selectedAccount});
        //
        //         this.ballot = await instance.getBallot(bytes32Name);
        //
        //         alert(this.ballot);
        //         // console.log(ballot);
        //     }
        //
        //     function convertStringToBytes32(_string) {
        //         return this.$data.web3.utils.fromAscii(_string);
        //     }
        // }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
