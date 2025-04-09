// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GPUSim {
    struct Simulation {
        uint256 timestamp;
        uint256 score;
    }

    mapping(address => Simulation[]) public simulations;

    event SimulationSubmitted(address indexed user, uint256 score, uint256 time);

    function submitScore(uint256 _score) public {
        simulations[msg.sender].push(Simulation(block.timestamp, _score));
        emit SimulationSubmitted(msg.sender, _score, block.timestamp);
    }

    function getSimulations(address _user) public view returns (Simulation[] memory) {
        return simulations[_user];
    }
}
