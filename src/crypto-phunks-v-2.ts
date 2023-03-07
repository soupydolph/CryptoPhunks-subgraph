import { 
  Transfer as TransferEvent, 
  CryptoPhunksV2 as CryptoPhunksV2Contract 
} from '../generated/CryptoPhunksV2/CryptoPhunksV2'
import { Phunk, User } from '../generated/schema'

export function handleTransfer(event: TransferEvent): void {
  let phunk = Phunk.load(event.params.tokenId.toString());
  if (!phunk) {
    phunk = new Phunk(event.params.tokenId.toString());
    phunk.phunkID = event.params.tokenId
    phunk.creator = event.params.to.toHexString();
    phunk.createdAtTimestamp = event.block.timestamp;

    let cryptoPhunkV2Contract = CryptoPhunksV2Contract.bind(event.address);
    phunk.contentURI = cryptoPhunkV2Contract.tokenURI(event.params.tokenId);
  }
  phunk.owner = event.params.to.toHexString();
  phunk.save();

  let user = User.load(event.params.to.toHexString());

  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
