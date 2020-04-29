#create com.vacademy.vacademybackend.database IF NOT EXISTS vacademy;
use vacademy;
/*create table if not exists admin_details( adminid integer AUTO_INCREMENT PRIMARY KEY, fullname varchar(20) not null, username varchar(12) unique not null,
						   password varchar(12) not null, designation text not null);
insert into admin_details values(1,"Arun Kumar S","arunsdrip", "12345678","Developer");
insert into admin_details values(2,"Haresha S K","haresha", "12345678","Developer");
insert into admin_details values(3,"Shalini A","shalini", "12345678","Developer");*/
select * from admin_details;
#drop table admin_details;