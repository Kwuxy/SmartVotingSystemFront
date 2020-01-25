// import contract from 'truffle-contract'
import VotingSystemContract from '../../build/contract/VotingSystem'
import Web3 from 'web3'

const VotingSystem = {
    contract: null,
    accounts: null,

    async init() {

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }

        this.accounts = await window.web3.eth.getAccounts()

        const networkId = await window.web3.eth.net.getId()
        const networkData = VotingSystemContract.networks[networkId]

        if(networkData) {
            this.contract = new window.web3.eth.Contract(VotingSystemContract.abi, networkData.address)
        } else {
            window.alert('Marketplace contract not deployed to detected network.')
        }
    },

    getConnectedAccount() {
        return this.accounts[0]
    },

    createBallot(ballotName) {
        // eslint-disable-next-line no-console
        console.log("ballotName from web3: " + ballotName)
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        // eslint-disable-next-line no-console
        console.log("ballotName from web3 after conversion: " + bytes32Name)
        // eslint-disable-next-line no-console
        console.log(this.accounts[0])
        this.contract.methods.createBallot(bytes32Name).send({ from: this.getConnectedAccount() })
            .on('receipt', function(receipt){
                // eslint-disable-next-line no-console
                console.log(receipt)
            })
            // eslint-disable-next-line no-console
            .on('error', console.error);
    },

    async openBallotVotes(ballotName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        await this.contract.methods.openBallotVotes(bytes32Name).send({ from: this.getConnectedAccount() })
            .on('receipt', function(receipt){
                // eslint-disable-next-line no-console
                console.log(receipt)
            })
            // eslint-disable-next-line no-console
            .on('error', console.error);
    },

    async getBallot(ballotName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        let result = await this.contract.methods.getBallot(bytes32Name).call({from: this.getConnectedAccount()})

        result.name = window.web3.utils.hexToString(result.name)
        for (let i = 0; i < result.candidatesName.length; i++) {
            result.candidatesName[i] = window.web3.utils.hexToString(result.candidatesName[i])
        }

        // eslint-disable-next-line no-console
        console.log(result.name)
        // eslint-disable-next-line no-console
        console.log(result.candidatesName)
        // eslint-disable-next-line no-console
        console.log(result.owner)
        // eslint-disable-next-line no-console
        console.log(result.state)

        return result
    },

    addCandidate(ballotName, candidateName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        let bytes32Candidate = window.web3.utils.fromAscii(candidateName);
        this.contract.methods.addCandidate(bytes32Name, bytes32Candidate).send({ from: this.getConnectedAccount() })
            .on('receipt', function(receipt){
                // eslint-disable-next-line no-console
                console.log(receipt)
            })
            // eslint-disable-next-line no-console
            .on('error', console.error);
    },



};

export default VotingSystem
