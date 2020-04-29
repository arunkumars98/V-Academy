package com.vacademy.vacademybackend.database;

import com.vacademy.vacademybackend.model.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor,Integer> {

    Instructor findInstructorByUsername(String username);
    Boolean existsInstructorByUsername(String username);
    Boolean existsInstructorByEmail(String email);
    void removeInstructorByUsername(String username);
}