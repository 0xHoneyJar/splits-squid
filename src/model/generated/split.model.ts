import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Recipient} from "./recipient.model"

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

    @OneToMany_(() => Recipient, e => e.split)
    recipients!: Recipient[]

    @IntColumn_({nullable: false})
    blockNumber!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @StringColumn_({nullable: false})
    transactionHash!: string
}
