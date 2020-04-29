package com.vacademy.vacademybackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity( name = "admin_details")
public class Admin
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer adminid;
    private String fullname;
    private String username;
    private String password;
    private String designation;

     public Admin() {}

    public Admin(int id, String name, String username, String password, String designation) {
        this.adminid = id;
        this.fullname = name;
        this.username = username;
        this.password = password;
        this.designation = designation;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Integer getAdminid() {
        return adminid;
    }

    public void setAdminid(Integer adminid) {
        this.adminid = adminid;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}