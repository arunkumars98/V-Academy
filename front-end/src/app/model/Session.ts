export class Session
{
  sessionid : number;
  type : string;
  username : string;
  log_date : string;
  intime : string;
  outTime : string;

  constructor(sessionid: number, type: string, username: string, log_date: string, in_time: string, out_time: string) {
    this.sessionid = sessionid;
    this.type = type;
    this.username = username;
    this.log_date = log_date;
    this.intime = in_time;
    this.outTime = out_time;
  }
}
