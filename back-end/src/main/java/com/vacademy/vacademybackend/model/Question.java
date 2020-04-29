package com.vacademy.vacademybackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity( name = "forum_questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer qid;
    private String timestamp;
    private String postedby;
    private String topic;
    private String content;

    public Question() {
    }

    public Question(Integer rid, Integer qid, String timestamp, String postedby,String topic, String content) {
        this.qid = qid;
        this.timestamp = timestamp;
        this.postedby = postedby;
        this.topic = topic;
        this.content = content;
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

    public String getPostedby() {
        return postedby;
    }

    public void setPostedby(String postedby) {
        this.postedby = postedby;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}