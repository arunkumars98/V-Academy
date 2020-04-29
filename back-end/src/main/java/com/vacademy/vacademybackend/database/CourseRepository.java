package com.vacademy.vacademybackend.database;

import com.vacademy.vacademybackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course,Integer>
{
    Course findCourseByCoursenameAndAuthor(String name, String author);
    Course findCourseByCoursecode(String course_code);
    Course findCourseByCourseid(Integer id);
    Boolean existsCourseByCourseid(Integer id);
    void removeCourseByCourseid(Integer id);
}