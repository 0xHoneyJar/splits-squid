import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as pushSplitsFactoryAbi from "./abi/pushSplitsFactory";
import { Recipient, Split } from "./model";
import { processor, PUSH_SPLITS_FACTORY_ADDRESS } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const newSplits: Split[] = [];
  const newRecipients: Recipient[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address !== PUSH_SPLITS_FACTORY_ADDRESS) continue;

      let decodedEventData: any;

      if (
        pushSplitsFactoryAbi.events[
          "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)"
        ].is(log)
      ) {
        decodedEventData =
          pushSplitsFactoryAbi.events[
            "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address,bytes32)"
          ].decode(log);
      } else if (
        pushSplitsFactoryAbi.events[
          "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)"
        ].is(log)
      ) {
        decodedEventData =
          pushSplitsFactoryAbi.events[
            "SplitCreated(address indexed,(address[],uint256[],uint256,uint16),address,address)"
          ].decode(log);
      } else {
        continue;
      }

      const { split, splitParams, owner, creator } = decodedEventData;
      const {
        recipients,
        allocations,
        totalAllocation,
        distributionIncentive,
      } = splitParams;

      const splitId = split.toLowerCase();

      const splitEntity = new Split({
        id: splitId,
        owner: owner.toLowerCase(),
        creator: creator.toLowerCase(),
        distributionIncentive: distributionIncentive,
        totalAllocation: totalAllocation,
        blockNumber: block.header.height,
        timestamp: new Date(block.header.timestamp),
        transactionHash: log.transactionHash,
      });
      newSplits.push(splitEntity);

      for (let i = 0; i < recipients.length; i++) {
        const recipientAddress = recipients[i].toLowerCase();
        const recipientAllocation = allocations[i];

        const recipientId = `${splitId}-${recipientAddress}`;

        const recipientEntity = new Recipient({
          id: recipientId,
          split: splitEntity,
          address: recipientAddress,
          allocation: recipientAllocation,
        });
        newRecipients.push(recipientEntity);
      }
    }
  }

  if (newSplits.length > 0) {
    ctx.log.info(`Saving ${newSplits.length} new splits`);
    await ctx.store.upsert(newSplits);
  }
  if (newRecipients.length > 0) {
    ctx.log.info(`Saving ${newRecipients.length} new recipients`);
    await ctx.store.upsert(newRecipients);
  }
});
