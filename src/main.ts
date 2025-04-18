import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as pushSplitsFactoryAbi from "./abi/pushSplitsFactory";
import { Split } from "./model";
import { processor, PUSH_SPLITS_FACTORY_ADDRESS } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const newSplitsData: any[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      // Ensure log comes from the correct factory address
      if (log.address !== PUSH_SPLITS_FACTORY_ADDRESS) continue;

      let decodedEventData: any;
      let eventName: string;

      // Try decoding with both event signatures
      if (
        pushSplitsFactoryAbi.events[
          "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)"
        ].is(log)
      ) {
        decodedEventData =
          pushSplitsFactoryAbi.events[
            "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)"
          ].decode(log);
        eventName = "SplitCreatedWithSalt";
      } else if (
        pushSplitsFactoryAbi.events[
          "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)"
        ].is(log)
      ) {
        decodedEventData =
          pushSplitsFactoryAbi.events[
            "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)"
          ].decode(log);
        eventName = "SplitCreated";
      } else {
        // Log is from the factory but not a SplitCreated event we handle
        continue;
      }

      // Extract data common to both event versions
      const { split, splitParams, owner, creator } = decodedEventData;
      const {
        recipients,
        allocations,
        totalAllocation,
        distributionIncentive,
      } = splitParams;

      // Format recipient data as defined in schema.graphql
      const recipientData = recipients.map((addr: string, index: number) => ({
        address: addr.toLowerCase(),
        allocation: allocations[index],
      }));

      // Create the data object for the Split entity
      const splitData = {
        id: split.toLowerCase(), // Use split address as ID
        owner: owner.toLowerCase(),
        creator: creator.toLowerCase(),
        distributionIncentive: distributionIncentive,
        totalAllocation: totalAllocation,
        recipients: recipientData,
        blockNumber: block.header.height,
        timestamp: new Date(block.header.timestamp),
        transactionHash: log.transactionHash,
      };

      newSplitsData.push(splitData);
    }
  }

  // Optional: Check if splits already exist if running from block 0
  // const existingSplitIds = await ctx.store.findBy(Split, { id: In(newSplitsData.map(s => s.id)) }).then(s => new Set(s.map(split => split.id)))
  // const splitsToInsert = newSplitsData.filter(s => !existingSplitIds.has(s.id)).map(s => new Split(s));

  // Create Split entities
  const splitsToInsert = newSplitsData.map((s) => new Split(s));

  if (splitsToInsert.length > 0) {
    ctx.log.info(`Saving ${splitsToInsert.length} new splits`);
    await ctx.store.upsert(splitsToInsert);
  }
});
