import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
// import { assertNotNull } from "@subsquid/util-internal";
import assert from "assert";
import * as pushSplitsFactoryAbi from "./abi/pushSplitsFactory";

export const PUSH_SPLITS_FACTORY_ADDRESS =
  "0x65B682D297C09f21B106EBb16666124431fB178D".toLowerCase();

export const processor = new EvmBatchProcessor()
  // Use Berachain gateway
  .setGateway("https://v2.archive.subsquid.io/network/berachain-mainnet")
  // Chain RPC endpoint is required
  .setRpcEndpoint({
    url: (() => {
      const url = process.env.RPC_BERACHAIN_HTTP;
      assert(url, "RPC_BERACHAIN_HTTP environment variable is not set");
      return url;
    })(),
    rateLimit: 10,
  })
  .setFinalityConfirmation(75) // Adjust if needed for Berachain
  // Set correct start block
  .setBlockRange({
    from: 3804583,
  })
  // Add log config for PushSplitsFactory SplitCreated event
  .addLog({
    address: [PUSH_SPLITS_FACTORY_ADDRESS],
    topic0: [
      pushSplitsFactoryAbi.events[
        "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)"
      ].topic,
      pushSplitsFactoryAbi.events[
        "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)"
      ].topic,
    ],
  })
  // Optional: Select specific fields needed
  .setFields({
    log: {
      transactionHash: true,
      topics: true,
      data: true,
    },
    block: {
      timestamp: true,
    },
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
