package com.vacademy.vacademybackend.model;

import javax.persistence.*;

@Entity ( name = "user_details")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer userid;
    private String fullname;
    private String username;
    private String password;
    private String email;
    private String mobile;
    private String parent_mobile;
    private String enrolled_courses;
    private String payment_details;
    private String active_courses;
    private String courses_completed;
    private String interest;

    public User(){}

    public User(int userid, String fullname, String username, String password, String email, String mobile, String parent_mobile, String enrolled_courses, String payment_details, String active_courses, String courses_completed,String interest) {
        this.userid = userid;
        this.fullname = fullname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
        this.parent_mobile = parent_mobile;
        this.enrolled_courses = enrolled_courses;
        this.payment_details = payment_details;
        this.active_courses = active_courses;
        this.courses_completed = courses_completed;
        this.interest = interest;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getParent_mobile() {
        return parent_mobile;
    }

    public void setParent_mobile(String parent_mobile) {
        this.parent_mobile = parent_mobile;
    }

    public String getEnrolled_courses() {
        return enrolled_courses;
    }

    public void setEnrolled_courses(String enrolled_courses) {
        this.enrolled_courses = enrolled_courses;
    }

    public String getPayment_details() {
        return payment_details;
    }

    public void setPayment_details(String payment_details) {
        this.payment_details = payment_details;
    }

    public String getActive_courses() {
        return active_courses;
    }

    public void setActive_courses(String active_courses) {
        this.active_courses = active_courses;
    }

    public String getCourses_completed() {
        return courses_completed;
    }

    public void setCourses_completed(String courses_completed) {
        this.courses_completed = courses_completed;
    }

    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }
}