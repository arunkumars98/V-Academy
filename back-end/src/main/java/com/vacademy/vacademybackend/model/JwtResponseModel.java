package com.vacademy.vacademybackend.model;

import java.io.Serializable;

public class JwtResponseModel implements Serializable
{

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    public JwtResponseModel(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
}