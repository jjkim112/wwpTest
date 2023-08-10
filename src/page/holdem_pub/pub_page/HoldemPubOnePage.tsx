import { Pub } from "../../../domain/Pub.model";
import {useState} from 'react';

export function HoldemPubOnePage(pubId: string) {
    const [thisPub, setThisPub] = useState<Pub | null>(null);
  return (
    thisPub === null ? 
    <div>로딩중 화면</div>
    :
    <div>
      holdem pub one page
      <div>ID : {pubId}</div>
    </div>
  );
}
