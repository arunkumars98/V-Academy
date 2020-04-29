#create com.vacademy.vacademybackend.database IF NOT EXISTS vacademy;
use vacademy;
#create table if not exists session_log(sessionid integer AUTO_INCREMENT PRIMARY KEY, type text, username text, log_date text, intime text, outTime text);
#insert into session_log values(1,"User","arunsdrip","17/04/2020","10:00","14:00");
#insert into session_log values(2,"Instructor","hareshaa","18/04/2020","17:00","21:00");
select * from session_log;
#drop table session_log;