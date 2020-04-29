export class Reply
{
  rid : number;
  qid : number;
  timestamp : string;
  repliedby : string;
  content : string;

  constructor(rid: number,qid :number,timestamp: string, repliedby: string, content: string) {
    this.rid = rid;
    this.qid = qid;
    this.timestamp = timestamp;
    this.repliedby = repliedby;
    this.content = content;
  }
}
