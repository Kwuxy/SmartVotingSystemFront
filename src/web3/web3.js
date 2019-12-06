import contract from 'truffle-contract'
import voting_system from '../../build/contract/VotingSystem'

const VotingSystem = {
    contract: null,
    instance: null,
    init() {
        let self = this;

        return new Promise(function (resolve, reject) {
            self.contract = contract(voting_system);
            self.contract.setProvider(window.web3.currentProvider);

            self.contract.deployed().then(instance => {
                self.instance = instance;
                resolve();
            }).catch(err => {
                reject(err);
            });
        })
    },

    createBallot(ballotName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);

        // eslint-disable-next-line
        console.log(window.web3.givenProvider.selectedAddress);
        return this.instance.createBallot(bytes32Name, {from: window.web3.givenProvider.selectedAddress});
    },

    getBallot(ballotName) {
        let bytes32Name = window.web3.utils.fromAscii(ballotName);
        let ballot = this.instance.getBallot(bytes32Name);

        return new Promise((resolve) => {
            return ballot.then((ballot) => {
                ballot.name = window.web3.utils.hexToString(ballot.name);
                resolve(ballot);
            });
        });
    }
};

export default VotingSystem
