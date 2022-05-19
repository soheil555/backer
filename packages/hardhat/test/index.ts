import { expect } from "chai";
import { ethers } from "hardhat";
import { Backer } from "../typechain";

describe("Backer", function () {
  let backer: Backer;
  const period = 100; // each period is 100s

  this.beforeEach(async function () {
    const Backer = await ethers.getContractFactory("Backer");
    backer = await Backer.deploy(period);
    await backer.deployed();
  });

  it("should create subscription plans", async function () {
    const [_, creator] = await ethers.getSigners();

    let tx = await backer
      .connect(creator)
      .newSubscriptionPlan(ethers.utils.parseEther("1"), "silver plan");

    await tx.wait();

    tx = await backer
      .connect(creator)
      .newSubscriptionPlan(ethers.utils.parseEther("2"), "gold plan");

    await tx.wait();

    let plans = await backer.getCreatorSubscriptionPlans(creator.address);

    expect(plans).to.length(2);
    expect(plans[0].id).to.eq(1);
    expect(plans[1].id).to.eq(2);
  });

  it("should deposit and withdraw money", async function () {
    const [_, supporter] = await ethers.getSigners();

    let tx = await backer
      .connect(supporter)
      .deposit({ value: ethers.utils.parseEther("1") });

    await tx.wait();

    let balance = await backer.getBalance(supporter.address);
    expect(balance).to.eq(ethers.utils.parseEther("1"));

    const supporterBalanceBefore = await supporter.getBalance();

    tx = await backer
      .connect(supporter)
      .withdraw(ethers.utils.parseEther("0.5"));
    await tx.wait();

    const supporterBalanceAfter = await supporter.getBalance();

    const diff = supporterBalanceAfter.sub(supporterBalanceBefore);
    expect(diff).to.be.closeTo(
      ethers.utils.parseEther("0.5"),
      ethers.utils.parseEther("0.001")
    );

    balance = await backer.getBalance(supporter.address);
    expect(balance).to.eq(ethers.utils.parseEther("0.5"));

    await expect(
      backer.connect(supporter).withdraw(ethers.utils.parseEther("1.5"))
    ).to.be.revertedWith("not enough fund to withdraw");
  });

  it("should subscribe to a plan and cancel it", async function () {
    const [_, creator, supporter] = await ethers.getSigners();

    let tx = await backer
      .connect(creator)
      .newSubscriptionPlan(ethers.utils.parseEther("1.0"), "gold plan");
    await tx.wait();

    tx = await backer
      .connect(supporter)
      .deposit({ value: ethers.utils.parseEther("100") });
    await tx.wait();

    // subscribeing to a plan
    tx = await backer.connect(supporter).subscribe(creator.address, 1, 10);
    await tx.wait();

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("90")
    );

    // subscribeing to the same plan again. it should fail
    await expect(
      backer.connect(supporter).subscribe(creator.address, 1, 10)
    ).to.be.revertedWith("already have a plan");

    let subscribers = await backer.getCreatorSubscribers(creator.address);
    expect(subscribers).to.length(1);
    expect(subscribers[0].supporter).to.eq(supporter.address);
    expect(subscribers[0].subscriptionPlanId).to.eq(1);

    let subscriptions = await backer.getSupporterSubscriptions(
      supporter.address
    );
    expect(subscriptions).to.length(1);
    expect(subscriptions[0].subscriptionPlan.id).to.eq(1);

    await ethers.provider.send("evm_increaseTime", [2 * period]);
    await ethers.provider.send("evm_mine", []);

    let creatorPayment = await backer.getCreatorPayment(creator.address);
    expect(creatorPayment).to.eq(ethers.utils.parseEther("2.0"));

    tx = await backer.connect(creator).claimCreatorPayment();
    await tx.wait();

    await ethers.provider.send("evm_increaseTime", [10 * period]);
    await ethers.provider.send("evm_mine", []);

    creatorPayment = await backer.getCreatorPayment(creator.address);
    expect(creatorPayment).to.eq(ethers.utils.parseEther("8.0"));

    // subscribeing to the same plan after the subscription is over
    tx = await backer.connect(supporter).subscribe(creator.address, 1, 10);
    await tx.wait();

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("80")
    );

    subscribers = await backer.getCreatorSubscribers(creator.address);

    tx = await backer.connect(supporter).cancelSubscribe(creator.address);
    await tx.wait();

    subscribers = await backer.getCreatorSubscribers(creator.address);
    expect(subscribers).to.length(0);

    subscriptions = await backer.getSupporterSubscriptions(supporter.address);
    expect(subscriptions).to.length(0);

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("89")
    );

    tx = await backer.connect(supporter).subscribe(creator.address, 1, 10);
    await tx.wait();

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("79")
    );

    await ethers.provider.send("evm_increaseTime", [12 * period]);
    await ethers.provider.send("evm_mine", []);

    tx = await backer.connect(supporter).cancelSubscribe(creator.address);
    await tx.wait();

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("79")
    );
  });

  it("should send tip", async function () {
    const [_, creator, supporter] = await ethers.getSigners();

    let tx = await backer
      .connect(supporter)
      .deposit({ value: ethers.utils.parseEther("100") });
    await tx.wait();

    tx = await backer
      .connect(supporter)
      .sendTip(creator.address, ethers.utils.parseEther("20"));
    await tx.wait();

    let creatorBalance = await backer.getBalance(creator.address);
    let supporterBalance = await backer.getBalance(supporter.address);

    expect(creatorBalance).to.eq(ethers.utils.parseEther("20"));
    expect(supporterBalance).to.eq(ethers.utils.parseEther("80"));

    await expect(
      backer
        .connect(supporter)
        .sendTip(creator.address, ethers.utils.parseEther("100"))
    ).to.be.revertedWith("not enough fund");
  });

  it("should delete a subscription plan", async function () {
    const [_, creator, supporter] = await ethers.getSigners();

    let tx = await backer
      .connect(creator)
      .newSubscriptionPlan(ethers.utils.parseEther("1.0"), "gold plan");
    await tx.wait();

    let creatorSubscriptionPlans = await backer.getCreatorSubscriptionPlans(
      creator.address
    );
    expect(creatorSubscriptionPlans.length).to.eq(1);

    tx = await backer
      .connect(supporter)
      .deposit({ value: ethers.utils.parseEther("100") });
    await tx.wait();

    // subscribeing to a plan
    tx = await backer.connect(supporter).subscribe(creator.address, 1, 10);
    await tx.wait();

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("90")
    );

    let subscribers = await backer.getCreatorSubscribers(creator.address);
    expect(subscribers).to.length(1);

    let subscriptions = await backer.getSupporterSubscriptions(
      supporter.address
    );
    expect(subscriptions).to.length(1);

    await ethers.provider.send("evm_increaseTime", [2 * period]);
    await ethers.provider.send("evm_mine", []);

    // delete subscription plan
    await backer
      .connect(creator)
      .deleteSubscriptionPlan(creatorSubscriptionPlans[0].id);

    creatorSubscriptionPlans = await backer.getCreatorSubscriptionPlans(
      creator.address
    );
    expect(creatorSubscriptionPlans.length).to.eq(0);

    subscribers = await backer.getCreatorSubscribers(creator.address);
    expect(subscribers).to.length(0);

    subscriptions = await backer.getSupporterSubscriptions(supporter.address);
    expect(subscriptions).to.length(0);

    expect(await backer.getBalance(supporter.address)).to.eq(
      ethers.utils.parseEther("98")
    );

    await ethers.provider.send("evm_increaseTime", [2 * period]);
    await ethers.provider.send("evm_mine", []);

    let creatorPayment = await backer.getCreatorPayment(creator.address);
    expect(creatorPayment).to.eq(ethers.utils.parseEther("2.0"));
  });

  it("should remove expired subscriptions and subscribers", async function () {
    const [_, creator, supporter] = await ethers.getSigners();

    let tx = await backer
      .connect(creator)
      .newSubscriptionPlan(ethers.utils.parseEther("2.0"), "gold plan");
    await tx.wait();

    tx = await backer
      .connect(creator)
      .newSubscriptionPlan(ethers.utils.parseEther("1.0"), "silver plan");
    await tx.wait();

    tx = await backer
      .connect(supporter)
      .deposit({ value: ethers.utils.parseEther("100") });
    await tx.wait();

    // subscribeing to a plan
    tx = await backer.connect(supporter).subscribe(creator.address, 1, 10);
    await tx.wait();

    let subscribers = await backer.getCreatorSubscribers(creator.address);
    expect(subscribers).to.length(1);

    await ethers.provider.send("evm_increaseTime", [12 * period]);
    await ethers.provider.send("evm_mine", []);

    tx = await backer.removeExpiredSubscribers(creator.address);
    await tx.wait();

    subscribers = await backer.getCreatorSubscribers(creator.address);
    expect(subscribers).to.length(0);

    // subscribeing to the same plan
    tx = await backer.connect(supporter).subscribe(creator.address, 1, 10);
    await tx.wait();

    let subscriptions = await backer.getSupporterSubscriptions(
      supporter.address
    );
    expect(subscriptions).to.length(1);

    await ethers.provider.send("evm_increaseTime", [12 * period]);
    await ethers.provider.send("evm_mine", []);

    tx = await backer.removeExpiredSubscriptions(supporter.address);
    await tx.wait();

    subscriptions = await backer.getSupporterSubscriptions(supporter.address);
    expect(subscriptions).to.length(0);
  });
});
