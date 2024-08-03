import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as hivev2 from "./abi/hivev2";
import { Stats, User } from "./model";
import { processor } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const users: Map<string, User> = new Map();
  let stats = await ctx.store.get(Stats, "unique");
  if (!stats) {
    stats = new Stats({
      id: "unique",
      uniqueUserCount: 0,
    });
  }

  for (let c of ctx.blocks) {
    // Handle Drip events
    for (let log of c.logs) {
      if (hivev2.events.Drip.is(log)) {
        const { user, amount } = hivev2.events.Drip.decode(log);
        let userEntity = users.get(user) || (await ctx.store.get(User, user));

        if (!userEntity) {
          userEntity = new User({
            id: user,
            address: user,
            totalDrip: 0n,
            lastDripBlock: 0,
            dripCount: 0,
          });
          stats.uniqueUserCount += 1;
        }

        userEntity.totalDrip += amount;
        userEntity.lastDripBlock = c.header.height;
        userEntity.dripCount += 1;

        users.set(user, userEntity);
      }
    }
  }

  ctx.log.info(`Unique users: ${stats.uniqueUserCount}`);

  // Upsert users and stats
  await ctx.store.upsert([...users.values()]);
  await ctx.store.save(stats);
});
