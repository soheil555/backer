import { expect } from "chai";
import { ethers } from "hardhat";
import { Backer } from "../typechain";

describe("Backer", function () {
  let backer: Backer;
  const period = 100; // each period is 5s

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

    let creatorPayment = await backer.connect(creator).getCreatorPayment();
    expect(creatorPayment).to.eq(ethers.utils.parseEther("2.0"));

    tx = await backer.connect(creator).claimCreatorPayment();
    await tx.wait();

    await ethers.provider.send("evm_increaseTime", [10 * period]);
    await ethers.provider.send("evm_mine", []);

    creatorPayment = await backer.connect(creator).getCreatorPayment();
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
  });
});
