import { Transfer as TransferEvent } from "../generated/CryptoPhunksToken/CryptoPhunksToken"
import { PhunkTransfer } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let sale = new PhunkTransfer(
    event.transaction.hash.toHexString()
  )
  sale.phunkID = event.params.tokenId
  sale.transactionHash = event.transaction.hash
  sale.blockTimestamp = event.block.timestamp // var date = new Date(1626232414*1000)
  sale.from = event.params.from
  sale.to = event.params.to
  sale.value = event.transaction.value // (event.transaction.value)  / (10 ** 18)
  sale.gasPrice = event.transaction.gasPrice

  sale.save()
}
