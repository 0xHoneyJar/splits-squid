module.exports = class Data1744942390918 {
    name = 'Data1744942390918'

    async up(db) {
        await db.query(`CREATE TABLE "split" ("id" character varying NOT NULL, "owner" text NOT NULL, "creator" text NOT NULL, "distribution_incentive" integer NOT NULL, "total_allocation" numeric NOT NULL, "recipients" jsonb NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_a656ea46749d1567ca7e7d5923a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bc3af98cb6b808477ccc5a21a8" ON "split" ("owner") `)
        await db.query(`CREATE INDEX "IDX_e6b17f62f5f078a79da5b7d08a" ON "split" ("creator") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "split"`)
        await db.query(`DROP INDEX "public"."IDX_bc3af98cb6b808477ccc5a21a8"`)
        await db.query(`DROP INDEX "public"."IDX_e6b17f62f5f078a79da5b7d08a"`)
    }
}
