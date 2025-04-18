import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {RecipientData} from "./_recipientData"

@Entity_()
export class Split {
    constructor(props?: Partial<Split>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    owner!: string

    @Index_()
    @StringColumn_({nullable: false})
    creator!: string

    @IntColumn_({nullable: false})
    distributionIncentive!: number

    @BigIntColumn_({nullable: false})
    totalAllocation!: bigint

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new RecipientData(undefined, marshal.nonNull(val)))}, nullable: false})
    recipients!: (RecipientData)[]

    @IntColumn_({nullable: false})
    blockNumber!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @StringColumn_({nullable: false})
    transactionHash!: string
}
