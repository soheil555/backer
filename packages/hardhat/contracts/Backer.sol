//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ReEntrancyGuard.sol";

contract Backer is ReEntrancyGuard {
    /***** EVENTS *****/

    event Deposit(uint256 period, address indexed supporter, uint256 amount);
    event Withdraw(uint256 period, address indexed recipient, uint256 amount);
    event Subscribe(
        uint256 period,
        address indexed supporter,
        address indexed creator,
        uint256 subscriptionPlanId,
        uint256 numOfPeriods
    );
    event SubscribeCancelled(
        uint256 period,
        address indexed supporter,
        address indexed creator,
        uint256 subscriptionPlanId
    );

    /***** DATA STRUCTURES *****/

    struct SubscriptionPlan {
        uint256 id;
        string name;
        address creator;
        uint256 amountPerPeriod;
    }

    struct Subscription {
        SubscriptionPlan subscriptionPlan;
        uint256 afterLastPeriod;
        bool initialized;
    }

    struct Subscriber {
        address supporter;
        uint256 subscriptionPlanId;
        uint256 afterLastPeriod;
    }

    /***** STATES *****/

    uint256 nextSubscriptionPlanId;
    uint256 public period;
    uint256 contractStartTime;

    // creater => SubscriptionPlans
    mapping(address => SubscriptionPlan[]) creatorSubscriptionPlans;

    // supporter => creator => Subscription
    mapping(address => mapping(address => Subscription)) supporterCreatorSubscription;

    // supporter => subscriptions
    mapping(address => Subscription[]) supporterSubscriptions;

    // creator => subscribers
    mapping(address => Subscriber[]) creatorSubscribers;

    // creator => (period => payment)
    mapping(address => mapping(uint256 => uint256)) creatorPayments;
    mapping(address => uint256) creatorAfterLastClaimsPeriod;

    mapping(address => uint256) balances;

    constructor(uint256 _period) {
        period = _period;
        contractStartTime = block.timestamp;
    }

    /***** HELPER FUNCTIONS *****/

    function currentPeriod() public view returns (uint256) {
        return (block.timestamp - contractStartTime) / period;
    }

    /***** DEPOSIT & WITHDRAW *****/

    function getCreatorPayment() public view returns (uint256) {
        uint256 amount = 0;
        for (
            uint256 periodNum = creatorAfterLastClaimsPeriod[msg.sender];
            periodNum < currentPeriod();
            periodNum++
        ) {
            amount += creatorPayments[msg.sender][periodNum];
        }
        return amount;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(currentPeriod(), msg.sender, msg.value);
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    function withdraw(uint256 amount) external noReentrant {
        require(balances[msg.sender] >= amount, "not enough fund to withdraw");

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "failed to send amount");

        balances[msg.sender] -= amount;
        emit Withdraw(currentPeriod(), msg.sender, amount);
    }

    function claimCreatorPayment() external {
        uint256 amount = getCreatorPayment();
        creatorAfterLastClaimsPeriod[msg.sender] = currentPeriod();
        balances[msg.sender] += amount;
    }

    function sendTip(address creator, uint256 amount) external {
        require(balances[msg.sender] >= amount, "not enough fund");

        balances[msg.sender] -= amount;
        balances[creator] += amount;
    }

    /***** SUBSCRIPTION *****/

    function newSubscriptionPlan(uint256 amountPerPeriod, string memory name)
        external
    {
        nextSubscriptionPlanId += 1;

        SubscriptionPlan memory subscriptionPlan = SubscriptionPlan({
            id: nextSubscriptionPlanId,
            creator: msg.sender,
            amountPerPeriod: amountPerPeriod,
            name: name
        });

        creatorSubscriptionPlans[msg.sender].push(subscriptionPlan);
    }

    function getCreatorSubscriptionPlans(address creator)
        external
        view
        returns (SubscriptionPlan[] memory)
    {
        return creatorSubscriptionPlans[creator];
    }

    function getCreatorSubscribers(address creator)
        external
        view
        returns (Subscriber[] memory)
    {
        return creatorSubscribers[creator];
    }

    function getSupporterSubscriptions(address supporter)
        external
        view
        returns (Subscription[] memory)
    {
        return supporterSubscriptions[supporter];
    }

    function canSubscribe(uint256 amountPerPeriod, uint256 numOfPeriods)
        public
        view
        returns (bool)
    {
        return (balances[msg.sender] >= amountPerPeriod * numOfPeriods);
    }

    function subscribe(
        address creator,
        uint256 subscriptionPlanId,
        uint256 numOfPeriods
    ) external {
        SubscriptionPlan memory subscriptionPlan;
        bool planFound;

        uint256 i;
        for (i = 0; i < creatorSubscriptionPlans[creator].length; i++) {
            if (creatorSubscriptionPlans[creator][i].id == subscriptionPlanId) {
                subscriptionPlan = creatorSubscriptionPlans[creator][i];
                planFound = true;
                break;
            }
        }

        require(planFound, "creator has no subscription plan with this id");
        require(
            canSubscribe(subscriptionPlan.amountPerPeriod, numOfPeriods),
            "not enough fund to subscribe"
        );

        require(
            !supporterCreatorSubscription[msg.sender][creator].initialized ||
                supporterCreatorSubscription[msg.sender][creator]
                    .afterLastPeriod <=
                currentPeriod(),
            "already have a plan"
        );

        for (
            uint256 periodNum = currentPeriod();
            periodNum < currentPeriod() + numOfPeriods;
            periodNum++
        ) {
            creatorPayments[creator][periodNum] += subscriptionPlan
                .amountPerPeriod;
        }

        Subscription memory subscription = Subscription({
            subscriptionPlan: subscriptionPlan,
            afterLastPeriod: currentPeriod() + numOfPeriods,
            initialized: true
        });

        supporterCreatorSubscription[msg.sender][creator] = subscription;

        uint256 subscriptionsLen = supporterSubscriptions[msg.sender].length;
        for (i = 0; i < subscriptionsLen; i++) {
            if (
                supporterSubscriptions[msg.sender][i]
                    .subscriptionPlan
                    .creator == creator
            ) {
                supporterSubscriptions[msg.sender][i] = subscription;
                break;
            }
        }
        if (i == subscriptionsLen) {
            supporterSubscriptions[msg.sender].push(subscription);
        }

        Subscriber memory subscriber = Subscriber({
            supporter: msg.sender,
            subscriptionPlanId: subscriptionPlan.id,
            afterLastPeriod: subscription.afterLastPeriod
        });

        uint256 creatorSubscribersLen = creatorSubscribers[creator].length;
        for (i = 0; i < creatorSubscribersLen; i++) {
            if (creatorSubscribers[creator][i].supporter == msg.sender) {
                creatorSubscribers[creator][i] = subscriber;
                break;
            }
        }
        if (i == creatorSubscribersLen) {
            creatorSubscribers[creator].push(subscriber);
        }

        balances[msg.sender] -= subscriptionPlan.amountPerPeriod * numOfPeriods;
        emit Subscribe(
            currentPeriod(),
            msg.sender,
            creator,
            subscriptionPlanId,
            numOfPeriods
        );
    }

    function getSupporterCreatorSubscription(address supporter, address creator) external view returns (Subscription memory) {
        return supporterCreatorSubscription[supporter][creator];
    }

    function cancelSubscribe(address creator) external {
        Subscription memory subscription = supporterCreatorSubscription[
            msg.sender
        ][creator];
        require(subscription.initialized);

        //you can not get back current period money
        balances[msg.sender] +=
            subscription.subscriptionPlan.amountPerPeriod *
            (subscription.afterLastPeriod - currentPeriod() - 1);

        for (
            uint256 periodNum = currentPeriod() + 1;
            periodNum < subscription.afterLastPeriod;
            periodNum++
        ) {
            creatorPayments[creator][periodNum] -= subscription
                .subscriptionPlan
                .amountPerPeriod;
        }

        uint256 subscriptionsLen = supporterSubscriptions[msg.sender].length;
        for (uint256 i = 0; i < subscriptionsLen; i++) {
            if (
                supporterSubscriptions[msg.sender][i].subscriptionPlan.id ==
                subscription.subscriptionPlan.id
            ) {
                supporterSubscriptions[msg.sender][i] = supporterSubscriptions[
                    msg.sender
                ][subscriptionsLen - 1];
                supporterSubscriptions[msg.sender].pop();
                break;
            }
        }

        uint256 creatorSubscribersLen = creatorSubscribers[creator].length;
        for (uint256 i = 0; i < creatorSubscribersLen; i++) {
            if (creatorSubscribers[creator][i].supporter == msg.sender) {
                creatorSubscribers[creator][i] = creatorSubscribers[creator][
                    creatorSubscribersLen - 1
                ];
                creatorSubscribers[creator].pop();
                break;
            }
        }

        delete supporterCreatorSubscription[msg.sender][creator];
        emit SubscribeCancelled(
            period,
            msg.sender,
            creator,
            subscription.subscriptionPlan.id
        );
    }
}
