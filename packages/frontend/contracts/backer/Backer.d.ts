/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface BackerInterface extends ethers.utils.Interface {
  functions: {
    "canSubscribe(uint256,uint256)": FunctionFragment;
    "cancelSubscribe(address)": FunctionFragment;
    "claimCreatorPayment()": FunctionFragment;
    "currentPeriod()": FunctionFragment;
    "deleteSubscriptionPlan(uint256)": FunctionFragment;
    "deposit()": FunctionFragment;
    "getBalance(address)": FunctionFragment;
    "getCreatorPayment(address)": FunctionFragment;
    "getCreatorSubscribers(address)": FunctionFragment;
    "getCreatorSubscriptionPlans(address)": FunctionFragment;
    "getDomain(address)": FunctionFragment;
    "getSupporterCreatorSubscription(address,address)": FunctionFragment;
    "getSupporterSubscriptions(address)": FunctionFragment;
    "newSubscriptionPlan(uint256,string)": FunctionFragment;
    "period()": FunctionFragment;
    "removeExpiredSubscribers(address)": FunctionFragment;
    "removeExpiredSubscriptions(address)": FunctionFragment;
    "sendTip(address,uint256)": FunctionFragment;
    "setDomain(string)": FunctionFragment;
    "subscribe(address,uint256,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "canSubscribe",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSubscribe",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimCreatorPayment",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deleteSubscriptionPlan",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(functionFragment: "getBalance", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getCreatorPayment",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getCreatorSubscribers",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getCreatorSubscriptionPlans",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getDomain", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getSupporterCreatorSubscription",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getSupporterSubscriptions",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "newSubscriptionPlan",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "period", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeExpiredSubscribers",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeExpiredSubscriptions",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "sendTip",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setDomain", values: [string]): string;
  encodeFunctionData(
    functionFragment: "subscribe",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "canSubscribe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelSubscribe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimCreatorPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteSubscriptionPlan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCreatorPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCreatorSubscribers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCreatorSubscriptionPlans",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDomain", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSupporterCreatorSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSupporterSubscriptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "newSubscriptionPlan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "period", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeExpiredSubscribers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeExpiredSubscriptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sendTip", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setDomain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "subscribe", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(uint256,address,uint256)": EventFragment;
    "Subscribe(uint256,address,address,uint256,uint256)": EventFragment;
    "SubscribeCancelled(uint256,address,address,uint256)": EventFragment;
    "Withdraw(uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Subscribe"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscribeCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export type DepositEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    period: BigNumber;
    supporter: string;
    amount: BigNumber;
  }
>;

export type SubscribeEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber] & {
    period: BigNumber;
    supporter: string;
    creator: string;
    subscriptionPlanId: BigNumber;
    numOfPeriods: BigNumber;
  }
>;

export type SubscribeCancelledEvent = TypedEvent<
  [BigNumber, string, string, BigNumber] & {
    period: BigNumber;
    supporter: string;
    creator: string;
    subscriptionPlanId: BigNumber;
  }
>;

export type WithdrawEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    period: BigNumber;
    recipient: string;
    amount: BigNumber;
  }
>;

export class Backer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: BackerInterface;

  functions: {
    canSubscribe(
      amountPerPeriod: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    cancelSubscribe(
      creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimCreatorPayment(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    currentPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    deleteSubscriptionPlan(
      subscriptionPlanId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBalance(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getCreatorPayment(
      creator: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCreatorSubscribers(
      creator: string,
      overrides?: CallOverrides
    ): Promise<
      [
        ([
          string,
          [BigNumber, string, string, BigNumber] & {
            id: BigNumber;
            name: string;
            creator: string;
            amountPerPeriod: BigNumber;
          },
          BigNumber
        ] & {
          supporter: string;
          subscriptionPlan: [BigNumber, string, string, BigNumber] & {
            id: BigNumber;
            name: string;
            creator: string;
            amountPerPeriod: BigNumber;
          };
          afterLastPeriod: BigNumber;
        })[]
      ]
    >;

    getCreatorSubscriptionPlans(
      creator: string,
      overrides?: CallOverrides
    ): Promise<
      [
        ([BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        })[]
      ]
    >;

    getDomain(_address: string, overrides?: CallOverrides): Promise<[string]>;

    getSupporterCreatorSubscription(
      supporter: string,
      creator: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          [BigNumber, string, string, BigNumber] & {
            id: BigNumber;
            name: string;
            creator: string;
            amountPerPeriod: BigNumber;
          },
          BigNumber,
          boolean
        ] & {
          subscriptionPlan: [BigNumber, string, string, BigNumber] & {
            id: BigNumber;
            name: string;
            creator: string;
            amountPerPeriod: BigNumber;
          };
          afterLastPeriod: BigNumber;
          initialized: boolean;
        }
      ]
    >;

    getSupporterSubscriptions(
      supporter: string,
      overrides?: CallOverrides
    ): Promise<
      [
        ([
          [BigNumber, string, string, BigNumber] & {
            id: BigNumber;
            name: string;
            creator: string;
            amountPerPeriod: BigNumber;
          },
          BigNumber,
          boolean
        ] & {
          subscriptionPlan: [BigNumber, string, string, BigNumber] & {
            id: BigNumber;
            name: string;
            creator: string;
            amountPerPeriod: BigNumber;
          };
          afterLastPeriod: BigNumber;
          initialized: boolean;
        })[]
      ]
    >;

    newSubscriptionPlan(
      amountPerPeriod: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    period(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeExpiredSubscribers(
      creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeExpiredSubscriptions(
      supporter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendTip(
      creator: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDomain(
      domain: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    subscribe(
      creator: string,
      subscriptionPlanId: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  canSubscribe(
    amountPerPeriod: BigNumberish,
    numOfPeriods: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  cancelSubscribe(
    creator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimCreatorPayment(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  currentPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  deleteSubscriptionPlan(
    subscriptionPlanId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  getCreatorPayment(
    creator: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCreatorSubscribers(
    creator: string,
    overrides?: CallOverrides
  ): Promise<
    ([
      string,
      [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      },
      BigNumber
    ] & {
      supporter: string;
      subscriptionPlan: [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      };
      afterLastPeriod: BigNumber;
    })[]
  >;

  getCreatorSubscriptionPlans(
    creator: string,
    overrides?: CallOverrides
  ): Promise<
    ([BigNumber, string, string, BigNumber] & {
      id: BigNumber;
      name: string;
      creator: string;
      amountPerPeriod: BigNumber;
    })[]
  >;

  getDomain(_address: string, overrides?: CallOverrides): Promise<string>;

  getSupporterCreatorSubscription(
    supporter: string,
    creator: string,
    overrides?: CallOverrides
  ): Promise<
    [
      [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      },
      BigNumber,
      boolean
    ] & {
      subscriptionPlan: [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      };
      afterLastPeriod: BigNumber;
      initialized: boolean;
    }
  >;

  getSupporterSubscriptions(
    supporter: string,
    overrides?: CallOverrides
  ): Promise<
    ([
      [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      },
      BigNumber,
      boolean
    ] & {
      subscriptionPlan: [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      };
      afterLastPeriod: BigNumber;
      initialized: boolean;
    })[]
  >;

  newSubscriptionPlan(
    amountPerPeriod: BigNumberish,
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  period(overrides?: CallOverrides): Promise<BigNumber>;

  removeExpiredSubscribers(
    creator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeExpiredSubscriptions(
    supporter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendTip(
    creator: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDomain(
    domain: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  subscribe(
    creator: string,
    subscriptionPlanId: BigNumberish,
    numOfPeriods: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    canSubscribe(
      amountPerPeriod: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    cancelSubscribe(creator: string, overrides?: CallOverrides): Promise<void>;

    claimCreatorPayment(overrides?: CallOverrides): Promise<void>;

    currentPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    deleteSubscriptionPlan(
      subscriptionPlanId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(overrides?: CallOverrides): Promise<void>;

    getBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCreatorPayment(
      creator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCreatorSubscribers(
      creator: string,
      overrides?: CallOverrides
    ): Promise<
      ([
        string,
        [BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        },
        BigNumber
      ] & {
        supporter: string;
        subscriptionPlan: [BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        };
        afterLastPeriod: BigNumber;
      })[]
    >;

    getCreatorSubscriptionPlans(
      creator: string,
      overrides?: CallOverrides
    ): Promise<
      ([BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        name: string;
        creator: string;
        amountPerPeriod: BigNumber;
      })[]
    >;

    getDomain(_address: string, overrides?: CallOverrides): Promise<string>;

    getSupporterCreatorSubscription(
      supporter: string,
      creator: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        },
        BigNumber,
        boolean
      ] & {
        subscriptionPlan: [BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        };
        afterLastPeriod: BigNumber;
        initialized: boolean;
      }
    >;

    getSupporterSubscriptions(
      supporter: string,
      overrides?: CallOverrides
    ): Promise<
      ([
        [BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        },
        BigNumber,
        boolean
      ] & {
        subscriptionPlan: [BigNumber, string, string, BigNumber] & {
          id: BigNumber;
          name: string;
          creator: string;
          amountPerPeriod: BigNumber;
        };
        afterLastPeriod: BigNumber;
        initialized: boolean;
      })[]
    >;

    newSubscriptionPlan(
      amountPerPeriod: BigNumberish,
      name: string,
      overrides?: CallOverrides
    ): Promise<void>;

    period(overrides?: CallOverrides): Promise<BigNumber>;

    removeExpiredSubscribers(
      creator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeExpiredSubscriptions(
      supporter: string,
      overrides?: CallOverrides
    ): Promise<void>;

    sendTip(
      creator: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setDomain(domain: string, overrides?: CallOverrides): Promise<void>;

    subscribe(
      creator: string,
      subscriptionPlanId: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Deposit(uint256,address,uint256)"(
      period?: null,
      supporter?: string | null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { period: BigNumber; supporter: string; amount: BigNumber }
    >;

    Deposit(
      period?: null,
      supporter?: string | null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { period: BigNumber; supporter: string; amount: BigNumber }
    >;

    "Subscribe(uint256,address,address,uint256,uint256)"(
      period?: null,
      supporter?: string | null,
      creator?: string | null,
      subscriptionPlanId?: null,
      numOfPeriods?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber, BigNumber],
      {
        period: BigNumber;
        supporter: string;
        creator: string;
        subscriptionPlanId: BigNumber;
        numOfPeriods: BigNumber;
      }
    >;

    Subscribe(
      period?: null,
      supporter?: string | null,
      creator?: string | null,
      subscriptionPlanId?: null,
      numOfPeriods?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber, BigNumber],
      {
        period: BigNumber;
        supporter: string;
        creator: string;
        subscriptionPlanId: BigNumber;
        numOfPeriods: BigNumber;
      }
    >;

    "SubscribeCancelled(uint256,address,address,uint256)"(
      period?: null,
      supporter?: string | null,
      creator?: string | null,
      subscriptionPlanId?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber],
      {
        period: BigNumber;
        supporter: string;
        creator: string;
        subscriptionPlanId: BigNumber;
      }
    >;

    SubscribeCancelled(
      period?: null,
      supporter?: string | null,
      creator?: string | null,
      subscriptionPlanId?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber],
      {
        period: BigNumber;
        supporter: string;
        creator: string;
        subscriptionPlanId: BigNumber;
      }
    >;

    "Withdraw(uint256,address,uint256)"(
      period?: null,
      recipient?: string | null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { period: BigNumber; recipient: string; amount: BigNumber }
    >;

    Withdraw(
      period?: null,
      recipient?: string | null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { period: BigNumber; recipient: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    canSubscribe(
      amountPerPeriod: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelSubscribe(
      creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimCreatorPayment(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    currentPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    deleteSubscriptionPlan(
      subscriptionPlanId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCreatorPayment(
      creator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCreatorSubscribers(
      creator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCreatorSubscriptionPlans(
      creator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDomain(_address: string, overrides?: CallOverrides): Promise<BigNumber>;

    getSupporterCreatorSubscription(
      supporter: string,
      creator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSupporterSubscriptions(
      supporter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    newSubscriptionPlan(
      amountPerPeriod: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    period(overrides?: CallOverrides): Promise<BigNumber>;

    removeExpiredSubscribers(
      creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeExpiredSubscriptions(
      supporter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendTip(
      creator: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDomain(
      domain: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    subscribe(
      creator: string,
      subscriptionPlanId: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    canSubscribe(
      amountPerPeriod: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelSubscribe(
      creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimCreatorPayment(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    currentPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deleteSubscriptionPlan(
      subscriptionPlanId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCreatorPayment(
      creator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCreatorSubscribers(
      creator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCreatorSubscriptionPlans(
      creator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDomain(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSupporterCreatorSubscription(
      supporter: string,
      creator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSupporterSubscriptions(
      supporter: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    newSubscriptionPlan(
      amountPerPeriod: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    period(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeExpiredSubscribers(
      creator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeExpiredSubscriptions(
      supporter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendTip(
      creator: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDomain(
      domain: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    subscribe(
      creator: string,
      subscriptionPlanId: BigNumberish,
      numOfPeriods: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
