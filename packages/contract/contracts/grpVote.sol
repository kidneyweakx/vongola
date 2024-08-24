// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GrpVote {
    struct Group {
        string name;
        mapping(string => uint256) votes; 
        bool exists;
    }

    mapping(uint256 => Group) public groups;
    uint256 public groupCount;

    mapping(string => uint256) public groupId;

    event GroupCreated(uint256 groupId, string groupName);
    event Voted(uint256 groupId, string topic, uint256 votes);

    function createGroup(string calldata _name) external {
        require(groupId[_name] == 0, "Group name already exists");

        groupCount++;
        uint256 id = groupCount;
        groups[id].name = _name;
        groups[id].exists = true;
        groupId[_name] = id;

        emit GroupCreated(id, _name);
    }

    function vote(uint256 _groupId, string calldata _topic) external {
        require(groups[_groupId].exists, "Group does not exist");

        groups[_groupId].votes[_topic]++;
        emit Voted(_groupId, _topic, groups[_groupId].votes[_topic]);
    }

    function getVotes(uint256 _groupId, string calldata _topic) external view returns (uint256) {
        require(groups[_groupId].exists, "Group does not exist");

        return groups[_groupId].votes[_topic];
    }

    function getTotalVotes(string calldata _topic) external view returns (uint256) {
        uint256 totalVotes = 0;

        for (uint256 i = 1; i <= groupCount; i++) {
            if (groups[i].exists) {
                totalVotes += groups[i].votes[_topic];
            }
        }

        return totalVotes;
    }
}
