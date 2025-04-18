import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    'SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)': event("0xc4cec5a1846f5c98dc275670618bfecffec4da2e7cba63760ef46f38c75d236e", "SplitCreated(address,(address[],uint256[],uint256,uint16),address,address,bytes32)", {"split": indexed(p.address), "splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "owner": p.address, "creator": p.address, "salt": p.bytes32}),
    'SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)': event("0xb3ec24e9259e438f9917b49f27c0dd89a11b7626cb63e6fc977863c0b26a681b", "SplitCreated(address,(address[],uint256[],uint256,uint16),address,address)", {"split": indexed(p.address), "splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "owner": p.address, "creator": p.address}),
}

export const functions = {
    SPLIT_WALLET_IMPLEMENTATION: viewFun("0xfc6119b1", "SPLIT_WALLET_IMPLEMENTATION()", {}, p.address),
    createSplit: fun("0x2556fa39", "createSplit((address[],uint256[],uint256,uint16),address,address)", {"_splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "_owner": p.address, "_creator": p.address}, p.address),
    createSplitDeterministic: fun("0xf79918b0", "createSplitDeterministic((address[],uint256[],uint256,uint16),address,address,bytes32)", {"_splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "_owner": p.address, "_creator": p.address, "_salt": p.bytes32}, p.address),
    isDeployed: viewFun("0xcd6bc121", "isDeployed((address[],uint256[],uint256,uint16),address,bytes32)", {"_splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "_owner": p.address, "_salt": p.bytes32}, {"split": p.address, "exists": p.bool}),
    nonces: viewFun("0x9e317f12", "nonces(bytes32)", {"_hash": p.bytes32}, p.uint256),
    'predictDeterministicAddress((address[],uint256[],uint256,uint16),address)': viewFun("0x80ebf0ab", "predictDeterministicAddress((address[],uint256[],uint256,uint16),address)", {"_splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "_owner": p.address}, p.address),
    'predictDeterministicAddress((address[],uint256[],uint256,uint16),address,bytes32)': viewFun("0xe9889edd", "predictDeterministicAddress((address[],uint256[],uint256,uint16),address,bytes32)", {"_splitParams": p.struct({"recipients": p.array(p.address), "allocations": p.array(p.uint256), "totalAllocation": p.uint256, "distributionIncentive": p.uint16}), "_owner": p.address, "_salt": p.bytes32}, p.address),
}

export class Contract extends ContractBase {

    SPLIT_WALLET_IMPLEMENTATION() {
        return this.eth_call(functions.SPLIT_WALLET_IMPLEMENTATION, {})
    }

    isDeployed(_splitParams: IsDeployedParams["_splitParams"], _owner: IsDeployedParams["_owner"], _salt: IsDeployedParams["_salt"]) {
        return this.eth_call(functions.isDeployed, {_splitParams, _owner, _salt})
    }

    nonces(_hash: NoncesParams["_hash"]) {
        return this.eth_call(functions.nonces, {_hash})
    }

    'predictDeterministicAddress((address[],uint256[],uint256,uint16),address)'(_splitParams: PredictDeterministicAddressParams_0["_splitParams"], _owner: PredictDeterministicAddressParams_0["_owner"]) {
        return this.eth_call(functions['predictDeterministicAddress((address[],uint256[],uint256,uint16),address)'], {_splitParams, _owner})
    }

    'predictDeterministicAddress((address[],uint256[],uint256,uint16),address,bytes32)'(_splitParams: PredictDeterministicAddressParams_1["_splitParams"], _owner: PredictDeterministicAddressParams_1["_owner"], _salt: PredictDeterministicAddressParams_1["_salt"]) {
        return this.eth_call(functions['predictDeterministicAddress((address[],uint256[],uint256,uint16),address,bytes32)'], {_splitParams, _owner, _salt})
    }
}

/// Event types
export type SplitCreatedEventArgs_0 = EParams<typeof events['SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)']>
export type SplitCreatedEventArgs_1 = EParams<typeof events['SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)']>

/// Function types
export type SPLIT_WALLET_IMPLEMENTATIONParams = FunctionArguments<typeof functions.SPLIT_WALLET_IMPLEMENTATION>
export type SPLIT_WALLET_IMPLEMENTATIONReturn = FunctionReturn<typeof functions.SPLIT_WALLET_IMPLEMENTATION>

export type CreateSplitParams = FunctionArguments<typeof functions.createSplit>
export type CreateSplitReturn = FunctionReturn<typeof functions.createSplit>

export type CreateSplitDeterministicParams = FunctionArguments<typeof functions.createSplitDeterministic>
export type CreateSplitDeterministicReturn = FunctionReturn<typeof functions.createSplitDeterministic>

export type IsDeployedParams = FunctionArguments<typeof functions.isDeployed>
export type IsDeployedReturn = FunctionReturn<typeof functions.isDeployed>

export type NoncesParams = FunctionArguments<typeof functions.nonces>
export type NoncesReturn = FunctionReturn<typeof functions.nonces>

export type PredictDeterministicAddressParams_0 = FunctionArguments<typeof functions['predictDeterministicAddress((address[],uint256[],uint256,uint16),address)']>
export type PredictDeterministicAddressReturn_0 = FunctionReturn<typeof functions['predictDeterministicAddress((address[],uint256[],uint256,uint16),address)']>

export type PredictDeterministicAddressParams_1 = FunctionArguments<typeof functions['predictDeterministicAddress((address[],uint256[],uint256,uint16),address,bytes32)']>
export type PredictDeterministicAddressReturn_1 = FunctionReturn<typeof functions['predictDeterministicAddress((address[],uint256[],uint256,uint16),address,bytes32)']>

