//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ReEntrancyGuard.sol";


contract Backer is ReEntrancyGuard  {

    /***** EVENTS *****/
    event Deposit(uint256 period,address indexed supporter, uint256 amount);
    event Withdraw(uint256 period,address indexed recipient, uint256 amount);
    event Subscribe(uint256 period,address indexed supporter,address indexed creator, uint256 subscriptionPlanId, uint256 numOfPeriods);
    event SubscribeCancelled(uint256 period,address indexed supporter,address indexed creator, uint256 subscriptionPlanId);


    /***** DATA STRUCTURES *****/

    struct SubscriptionPlan {

        uint256 id;
        address creator;
        uint256 amountPerPeriod;
        string message;

    }

    struct Subscription {

        SubscriptionPlan subscriptionPlan;
        uint256 afterLastPeriod;
        bool initialized;

    }

    /***** STATES *****/

    uint256 subPlanId;
    uint256 period;
    uint256 contractStartTime;

    // creater => SubscriptionPlans
    mapping (address => SubscriptionPlan[]) creatorSubscriptionPlans;

    // supporter => creator => Subscription
    mapping (address => mapping(address => Subscription)) supporterSubscriptions;

    // creator => (period => payment)
    mapping (address => mapping(uint256 => uint256)) creatorPayments;
    mapping (address => uint256) creatorAfterLastClaimsPeriod;


    mapping (address => uint256) public balances;
    mapping (address => uint256) creatorBalances;


    constructor(uint256 _period) {

        period = _period;
        contractStartTime = block.timestamp;
        
    }


    /***** HELPER FUNCTIONS *****/

    function currentPeriod() internal view returns (uint) {

        return (block.timestamp - contractStartTime) / period;

    }


    /***** DEPOSIT & WITHDRAW *****/


    function getCreatorPayment() public view returns (uint256) {

        uint256 amount = 0;
        for(uint256 periodNum = creatorAfterLastClaimsPeriod[msg.sender]; periodNum < currentPeriod(); periodNum++) {
            amount += creatorPayments[msg.sender][periodNum];
        }
        return amount;

    }

    function deposit() payable external {

        balances[msg.sender] += msg.value;
        emit Deposit(currentPeriod(), msg.sender, msg.value);

    }


    function withdraw(uint256 amount) external noReentrant {

        require(balances[msg.sender] >= amount,"not enough fund to withdraw");

        (bool sent,) = msg.sender.call{value:amount}("");
        require(sent,"failed to send amount");

        balances[msg.sender] -= amount;
        emit Withdraw(currentPeriod(), msg.sender, amount);

    }

    function claimCreatorPayment() external {

        uint256 amount = getCreatorPayment();
        creatorAfterLastClaimsPeriod[msg.sender] = currentPeriod();
        balances[msg.sender] += amount;

    }

    function canSubscribe(uint256 amountPerPeriod, uint256 numOfPeriods) public view returns (bool) {

        return (balances[msg.sender] >= amountPerPeriod*numOfPeriods);

    }


    function subscribe(address creator,uint256 subscriptionPlanId,uint256 numOfPeriods) external {

        SubscriptionPlan memory subscriptionPlan;
        bool planFound;

        for(uint256 i=0; i< creatorSubscriptionPlans[creator].length;i++){
            if(creatorSubscriptionPlans[creator][i].id == subscriptionPlanId) {
                subscriptionPlan = creatorSubscriptionPlans[creator][i];
                planFound = true;
                break;
            }
        }

        require(planFound,"creator has no subscription plan with this id");
        require(canSubscribe(subscriptionPlan.amountPerPeriod, numOfPeriods),"not enough fund to subscribe");

        require(!supporterSubscriptions[msg.sender][creator].initialized);

        for(uint256 periodNum = currentPeriod(); periodNum < numOfPeriods; periodNum++) {

            creatorPayments[creator][periodNum] += subscriptionPlan.amountPerPeriod;

        }

        Subscription memory subscription = Subscription({
            subscriptionPlan: subscriptionPlan,
            afterLastPeriod : currentPeriod() + numOfPeriods,
            initialized: true 
        });

        supporterSubscriptions[msg.sender][creator] = subscription;
        balances[msg.sender] -= subscriptionPlan.amountPerPeriod * numOfPeriods;
        emit Subscribe(currentPeriod(), msg.sender, creator, subscriptionPlanId, numOfPeriods);

    }


    function cancelSubscribe(address creator) external {

        Subscription memory subscription = supporterSubscriptions[msg.sender][creator];
        require(subscription.initialized);

        balances[msg.sender] += subscription.subscriptionPlan.amountPerPeriod * (subscription.afterLastPeriod - currentPeriod());
        for(uint256 periodNum = currentPeriod(); periodNum < subscription.afterLastPeriod; periodNum++){
            creatorPayments[creator][periodNum] -= subscription.subscriptionPlan.amountPerPeriod;
        }

        delete supporterSubscriptions[msg.sender][creator];
        emit SubscribeCancelled(period, msg.sender, creator, subscription.subscriptionPlan.id);

    }




    


}