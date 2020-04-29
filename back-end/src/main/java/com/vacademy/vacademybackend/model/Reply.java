package com.vacademy.vacademybackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity( name = "forum_replies")
public class Reply
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer rid;
    private Integer qid;
    private String timestamp;
    private String repliedby;
    private String content;

    public Reply() {
    }

    public Reply(Integer rid, Integer qid, String timestamp, String repliedby, String content) {
        this.rid = rid;
        this.qid = qid;
        this.timestamp = timestamp;
        this.repliedby = repliedby;
        this.content = content;
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public Integer getQid() {
        return qid;
    }

    public void setQid(Integer qid) {
        this.qid = qid;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getRepliedby() {
        return repliedby;
    }

    public void setRepliedby(String repliedby) {
        this.repliedby = repliedby;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}