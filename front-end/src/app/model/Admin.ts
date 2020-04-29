export class Admin
{
  adminid : number;
  fullname : string;
  username : string;
  password : string;
  designation : string;

  constructor(adminid: number, fullname: string, username: string, password: string, designation: string) {
    this.adminid = adminid;
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.designation = designation;
  }
}
