/*create com.vacademy.vacademybackend.database IF NOT EXISTS vacademy;*/
use vacademy;
/*create table if not exists user_details( userid integer AUTO_INCREMENT PRIMARY KEY, fullname varchar(20) not null, username varchar(12) unique not null,
						   password varchar(12) not null, email varchar(20) unique not null, mobile varchar(10) unique not null,
                           parent_mobile varchar(10), enrolled_courses text, active_courses text, courses_completed text, payment_details text, interest text);
insert into user_details values(1,"Arun Kumar S","arunsdrip", "12345678", "arunsdrip@gmail.com","9940681772","8072532631","1001,1002","1001","1002","12400/-","iot");
insert into user_details values(2,"Hareshaa S K", "hareshaa", "12345678", "hareshaask@gmail.com","9999999999","8888888888","1001,1003","1003","1001","12400/-","robotics");*/
select * from user_details;
#drop table user_details;