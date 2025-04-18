import assert from "assert"
import * as marshal from "./marshal"

export class RecipientData {
    private _address!: string
    private _allocation!: bigint

    constructor(props?: Partial<Omit<RecipientData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._address = marshal.string.fromJSON(json.address)
            this._allocation = marshal.bigint.fromJSON(json.allocation)
        }
    }

    get address(): string {
        assert(this._address != null, 'uninitialized access')
        return this._address
    }

    set address(value: string) {
        this._address = value
    }

    get allocation(): bigint {
        assert(this._allocation != null, 'uninitialized access')
        return this._allocation
    }

    set allocation(value: bigint) {
        this._allocation = value
    }

    toJSON(): object {
        return {
            address: this.address,
            allocation: marshal.bigint.toJSON(this.allocation),
        }
    }
}
