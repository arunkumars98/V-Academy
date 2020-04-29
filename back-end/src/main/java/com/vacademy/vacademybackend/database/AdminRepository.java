package com.vacademy.vacademybackend.database;

import com.vacademy.vacademybackend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Integer>
{
    Admin findAdminByUsername(String username);
    Boolean existsAdminByUsername(String username);
    void removeAdminByUsername(String username);
}