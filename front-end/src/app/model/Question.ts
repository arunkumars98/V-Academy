export class Question
{
  qid : number;
  timestamp : string;
  postedby : string;
  topic : string;
  content : string;

  constructor(qid: number, timestamp: string, postedby: string, topic: string, content: string) {
    this.qid = qid;
    this.timestamp = timestamp;
    this.postedby = postedby;
    this.topic = topic;
    this.content = content;
  }

}
