const bcypto = require('crypto')

const key1 = bcypto.randomBytes(32).toString('hex')
const key2 = bcypto.randomBytes(32).toString('hex')
const key3 = bcypto.randomBytes(32).toString('hex')

console.table([key1, key2, key3])