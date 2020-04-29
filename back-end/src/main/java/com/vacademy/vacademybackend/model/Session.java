package com.vacademy.vacademybackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity( name = "session_log")
public class Session
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer sessionid;
    private String type;
    private String username;
    private String log_date;
    private String intime;
    private String outTime;

    public Session() {
    }

    public Session(String type, String username, String log_date, String intime, String outTime) {
        this.type = type;
        this.username = username;
        this.log_date = log_date;
        this.intime = intime;
        this.outTime = outTime;
    }

    public Integer getSessionid() {
        return sessionid;
    }

    public void setSessionid(Integer sessionid) {
        this.sessionid = sessionid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLog_date() {
        return log_date;
    }

    public void setLog_date(String log_date) {
        this.log_date = log_date;
    }

    public String getIntime() {
        return intime;
    }

    public void setIntime(String in_time) {
        this.intime = in_time;
    }

    public String getOutTime() {
        return outTime;
    }

    public void setOutTime(String out_time) {
        this.outTime = out_time;
    }
}
