import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Claimed: event("0x7c6b338bd1a762ed17afe6b41e0f3ce0fb9da7c63e05eb1abbba460cec24c148", "Claimed(address,bytes32,uint256,uint256)", {"user": indexed(p.address), "root": p.bytes32, "index": p.uint256, "amount": p.uint256}),
    Drip: event("0x7cad7fbe1215c486c724bf41124e0ed689d280724381379da844556025c463c1", "Drip(address,uint256)", {"user": indexed(p.address), "amount": p.uint256}),
    OwnershipHandoverCanceled: event("0xfa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92", "OwnershipHandoverCanceled(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipHandoverRequested: event("0xdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d", "OwnershipHandoverRequested(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"oldOwner": indexed(p.address), "newOwner": indexed(p.address)}),
}

export const functions = {
    cancelOwnershipHandover: fun("0x54d1f13d", "cancelOwnershipHandover()", {}, ),
    claim: fun("0x172bd6de", "claim(address,uint256,uint256,bytes32[])", {"_user": p.address, "_index": p.uint256, "_amount": p.uint256, "_proof": p.array(p.bytes32)}, ),
    claimed: viewFun("0x317484fe", "claimed(bytes32,uint256)", {"_root": p.bytes32, "_index": p.uint256}, p.bool),
    completeOwnershipHandover: fun("0xf04e283e", "completeOwnershipHandover(address)", {"pendingOwner": p.address}, ),
    drip: fun("0x9e353a1e", "drip(address,uint256)", {"_user": p.address, "_amount": p.uint256}, ),
    merkleRoot: viewFun("0x2eb4a7ab", "merkleRoot()", {}, p.bytes32),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownershipHandoverExpiresAt: viewFun("0xfee81cf4", "ownershipHandoverExpiresAt(address)", {"pendingOwner": p.address}, p.uint256),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    requestOwnershipHandover: fun("0x25692962", "requestOwnershipHandover()", {}, ),
    setMerkleRoot: fun("0x7cb64759", "setMerkleRoot(bytes32)", {"_merkleRoot": p.bytes32}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    withdrawAllTokens: fun("0xa878aee6", "withdrawAllTokens(address)", {"_target": p.address}, ),
}

export class Contract extends ContractBase {

    claimed(_root: ClaimedParams["_root"], _index: ClaimedParams["_index"]) {
        return this.eth_call(functions.claimed, {_root, _index})
    }

    merkleRoot() {
        return this.eth_call(functions.merkleRoot, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownershipHandoverExpiresAt(pendingOwner: OwnershipHandoverExpiresAtParams["pendingOwner"]) {
        return this.eth_call(functions.ownershipHandoverExpiresAt, {pendingOwner})
    }
}

/// Event types
export type ClaimedEventArgs = EParams<typeof events.Claimed>
export type DripEventArgs = EParams<typeof events.Drip>
export type OwnershipHandoverCanceledEventArgs = EParams<typeof events.OwnershipHandoverCanceled>
export type OwnershipHandoverRequestedEventArgs = EParams<typeof events.OwnershipHandoverRequested>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>

/// Function types
export type CancelOwnershipHandoverParams = FunctionArguments<typeof functions.cancelOwnershipHandover>
export type CancelOwnershipHandoverReturn = FunctionReturn<typeof functions.cancelOwnershipHandover>

export type ClaimParams = FunctionArguments<typeof functions.claim>
export type ClaimReturn = FunctionReturn<typeof functions.claim>

export type ClaimedParams = FunctionArguments<typeof functions.claimed>
export type ClaimedReturn = FunctionReturn<typeof functions.claimed>

export type CompleteOwnershipHandoverParams = FunctionArguments<typeof functions.completeOwnershipHandover>
export type CompleteOwnershipHandoverReturn = FunctionReturn<typeof functions.completeOwnershipHandover>

export type DripParams = FunctionArguments<typeof functions.drip>
export type DripReturn = FunctionReturn<typeof functions.drip>

export type MerkleRootParams = FunctionArguments<typeof functions.merkleRoot>
export type MerkleRootReturn = FunctionReturn<typeof functions.merkleRoot>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnershipHandoverExpiresAtParams = FunctionArguments<typeof functions.ownershipHandoverExpiresAt>
export type OwnershipHandoverExpiresAtReturn = FunctionReturn<typeof functions.ownershipHandoverExpiresAt>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RequestOwnershipHandoverParams = FunctionArguments<typeof functions.requestOwnershipHandover>
export type RequestOwnershipHandoverReturn = FunctionReturn<typeof functions.requestOwnershipHandover>

export type SetMerkleRootParams = FunctionArguments<typeof functions.setMerkleRoot>
export type SetMerkleRootReturn = FunctionReturn<typeof functions.setMerkleRoot>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type WithdrawAllTokensParams = FunctionArguments<typeof functions.withdrawAllTokens>
export type WithdrawAllTokensReturn = FunctionReturn<typeof functions.withdrawAllTokens>

