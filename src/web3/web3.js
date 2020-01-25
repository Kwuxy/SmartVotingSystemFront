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

    createBallot(ballotName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        this.contract.methods.createBallot(bytes32Name).send({ from: this.accounts[0] })
            .on('receipt', function(receipt){
                // eslint-disable-next-line no-console
                console.log(receipt)
            })
            // eslint-disable-next-line no-console
            .on('error', console.error);
    },

    getBallot(ballotName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        // eslint-disable-next-line no-console
        console.log("ballot name : " + ballotName)
        this.contract.methods.getBallot(bytes32Name).call({from: this.accounts[0]})
            .then(function(result){
                // eslint-disable-next-line no-console
                console.log(result)
                result.name = window.web3.utils.hexToString(result.name)
                // eslint-disable-next-line no-console
                console.log("nom du ballot récupéré : " + result.name)

            })
    },

    addCandidate(ballotName, candidateName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        let bytes32Candidate = window.web3.utils.fromAscii(candidateName);
        return this.contract.methods.addCandidate(bytes32Name, bytes32Candidate).send({ from: this.accounts[0] })
    }
};

export default VotingSystem
