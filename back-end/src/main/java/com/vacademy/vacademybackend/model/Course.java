package com.vacademy.vacademybackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity( name = "courses_details")
public class Course
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer courseid;
    private String coursecode;
    private String coursename;
    private String author;
    private String descrp;
    private String price;
    private String rating;
    private String tags;
    private String test;
    private String chapters;
    private String videos;
    private String image;
    private String enrolls;
    private String posted_on;
    private String updated_on;

    public Course() {
    }

    public Course(Integer courseid, String coursecode, String coursename, String author, String descrp, String price, String rating, String tags, String test, String chapters, String videos, String image, String enrolls, String posted_on, String updated_on) {
        this.courseid = courseid;
        this.coursecode = coursecode;
        this.coursename = coursename;
        this.author = author;
        this.descrp = descrp;
        this.price = price;
        this.rating = rating;
        this.tags = tags;
        this.test = test;
        this.chapters = chapters;
        this.videos = videos;
        this.image = image;
        this.enrolls = enrolls;
        this.posted_on = posted_on;
        this.updated_on = updated_on;
    }

    public Integer getCourseid() {
        return courseid;
    }

    public void setCourseid(Integer courseid) {
        this.courseid = courseid;
    }

    public String getCoursecode() {
        return coursecode;
    }

    public void setCoursecode(String course_code) {
        this.coursecode = course_code;
    }

    public String getCoursename() {
        return coursename;
    }

    public void setCoursename(String course_name) {
        this.coursename = course_name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescrp() {
        return descrp;
    }

    public void setDescrp(String descrp) {
        this.descrp = descrp;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getChapters() {
        return chapters;
    }

    public void setChapters(String chapters) {
        this.chapters = chapters;
    }

    public String getVideos() {
        return videos;
    }

    public void setVideos(String videos) {
        this.videos = videos;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getEnrolls() {
        return enrolls;
    }

    public void setEnrolls(String enrolls) {
        this.enrolls = enrolls;
    }

    public String getPosted_on() {
        return posted_on;
    }

    public void setPosted_on(String posted_on) {
        this.posted_on = posted_on;
    }

    public String getUpdated_on() {
        return updated_on;
    }

    public void setUpdated_on(String updated_on) {
        this.updated_on = updated_on;
    }
}