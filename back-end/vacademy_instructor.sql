#create com.vacademy.vacademybackend.database IF NOT EXISTS vacademy;
use vacademy;
/*create table if not exists instructor_details( instructorid integer AUTO_INCREMENT PRIMARY KEY, fullname varchar(20) not null, username varchar(12) unique not null,
						   password varchar(12) not null, email varchar(20) unique not null, mobile varchar(10) not null, courses text, qualification text);
insert into instructor_details values(1,"Arun Kumar S","arunsdrip", "12345678","arunsdrip@gmail.com","9940681772","iot#1","B.E (ECE)");
insert into instructor_details values(2,"Haresha S K","haresha", "12345678","hareshaask@gmail.com","9999999999","rob#1","B.E (ECE)");*/
select * from instructor_details;
#drop table instructor_details;