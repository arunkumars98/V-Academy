package com.vacademy.vacademybackend.controller;

import com.vacademy.vacademybackend.database.*;
import com.vacademy.vacademybackend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
public class VacademyRestController
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ReplyRepository replyRepository;

    //Admin
    @GetMapping(value = "/admin/all-admins")
    public List<Admin> getAllAdmin(){
        return adminRepository.findAll();
    }

    @GetMapping(value = "/admin/get-admin/{username}")
    public Admin getAdmin(@PathVariable String username)
    {
        return adminRepository.findAdminByUsername(username);
    }

    @GetMapping(value = "/admin/user/all-users")
    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    @GetMapping(value = "/admin/instructor/all-instructors")
    public List<Instructor> getAllInstructors()
    {
        return instructorRepository.findAll();
    }

    @GetMapping(value = "/admin/session/all-sessions")
    public List<Session> getAllSessions()
    {
        return sessionRepository.findAll();
    }

    @PostMapping(value = "/admin/add-admin")
    public String addAdmin(@RequestBody Admin admin)
    {
        String admin_username =  admin.getUsername();
        if(adminRepository.existsAdminByUsername(admin_username)) {
            return "Admin Username already exists";
        }
        else
        {
            adminRepository.save(admin);
            return admin_username + "Account added Successfully";
        }
    }

    @Transactional
    @DeleteMapping(value = "/admin/delete-admin/{username}")
    public String deleteAdmin(@PathVariable String username)
    {
        if(adminRepository.existsAdminByUsername(username)) {
            adminRepository.removeAdminByUsername(username);
            return "Admin Account Removed Successfully";
        }
        else {
            return "Admin Account not found!";
        }
    }

    //Courses
    @GetMapping(value = "/common/all-courses")
    public List<Course> getAllCourses()
    {
        return courseRepository.findAll();
    }

    @PostMapping(value = "/course/get-course")
    public Course getCourseByCourseBody(@RequestBody Course course)
    {
        String name = course.getCoursename();
        String author = course.getAuthor();
        return courseRepository.findCourseByCoursenameAndAuthor(name,author);
    }

    @GetMapping(value = "/course/course-id={id}")
    public Course getCourseById(@PathVariable Integer id)
    {
        return courseRepository.findCourseByCourseid(id);
    }

    @PostMapping(value = "/course/add-course")
    public String addCourse(@RequestBody Course course)
    {
        try {
            String course_code = course.getCoursecode();
            String course_name = course.getCoursename();
            for (Course courses : courseRepository.findAll()) {
                if (courses.getCoursecode().equals(course_code)) {
                    return "Course Code already exists";
                } else if (courses.getCoursename().equals(course_name)) {
                    return "Course Name already exists";
                }
            }
            courseRepository.save(course);
            Course code_course = courseRepository.findCourseByCoursecode(course.getCoursecode());
            code_course.setCoursecode(code_course.getCoursecode().concat(Integer.toString(code_course.getCourseid())));
            courseRepository.save(code_course);
            return course_name + " added Successfully";
        }
        catch (Exception e)
        {
            return "Error! Course not added!";
        }
    }

    @Transactional
    @DeleteMapping(value = "/course/delete-course/{id}")
    public String deleteCourse(@PathVariable Integer id)
    {
        if(courseRepository.existsCourseByCourseid(id)) {
            courseRepository.removeCourseByCourseid(id);
            return "Course Removed Successfully";
        }
        else {
            return "Course not found!";
        }
    }

    @PostMapping(value = "course/update/details")
    public Course updateCourseDetails(@RequestBody Course course)
    {
        Course edit_course = courseRepository.findCourseByCoursecode(course.getCoursecode());
        edit_course.setCoursename(course.getCoursename());
        edit_course.setDescrp(course.getDescrp());
        edit_course.setAuthor(course.getAuthor());
        edit_course.setTags(course.getTags());
        edit_course.setTest(course.getTest());
        edit_course.setChapters(course.getChapters());
        edit_course.setVideos(course.getVideos());
        edit_course.setImage(course.getImage());
        edit_course.setPrice(course.getPrice());
        edit_course.setUpdated_on(course.getUpdated_on());
        try {
            courseRepository.save(edit_course);
            return courseRepository.findCourseByCoursecode(course.getCoursecode());
        }
        catch (Exception e) {
            return null;
        }
    }

    @GetMapping(value = "course/update/enrolls/{id}")
    public String updateEnrolls(@PathVariable Integer id)
    {
        Course edit_course = courseRepository.findCourseByCourseid(id);
        try {
            int x = Integer.parseInt(edit_course.getEnrolls()) + 1;
            edit_course.setEnrolls(Integer.toString(x));
            courseRepository.save(edit_course);
            return "Enrolls updated successfully";
        }
        catch (Exception e) {
            return "Enrolls not updated!";
        }
    }

    //User
    @GetMapping(value = "/user/get-user/{username}")
    public User getUser(@PathVariable String username)
    {
        return userRepository.findUserByUsername(username);
    }

    @PostMapping(value = "/common/add-user")
    public String createUser(@RequestBody User new_user)
    {
        try {
            String new_user_name = new_user.getUsername();
            String new_user_email = new_user.getEmail();
            String new_user_mobile = new_user.getMobile();
            if (userRepository.existsUserByUsername(new_user_name)) {
                return "Username already exists";
            } else if (userRepository.existsUserByEmail(new_user_email)) {
                return "Email already exists";
            } else if (userRepository.existsUserByMobile(new_user_mobile)) {
                return "Mobile already exists";
            } else {
                userRepository.save(new_user);
                return new_user_name + " Account added Successfully";
            }
        }
        catch (Exception e)
        {
            return "Invalid Details! Please provide correct details";
        }
    }

    @PostMapping(value = "/user/update/payment")
    public User updatePayment(@RequestBody User user)
    {
        User edit_user = userRepository.findUserByUserid(user.getUserid());
        edit_user.setEnrolled_courses(user.getEnrolled_courses());
        edit_user.setPayment_details(user.getPayment_details());
        userRepository.save(edit_user);
        return userRepository.findUserByUserid(user.getUserid());
    }

    @PostMapping(value = "/user/update/course-complete")
    public User updateCourseComplete(@RequestBody User user)
    {
        User edit_user = userRepository.findUserByUserid(user.getUserid());
        edit_user.setCourses_completed(user.getCourses_completed());
        edit_user.setActive_courses(user.getActive_courses());
        userRepository.save(edit_user);
        return userRepository.findUserByUserid(user.getUserid());
    }

    @PostMapping(value = "/user/update/active-course")
    public User updateActiveCourse(@RequestBody User user)
    {
        User edit_user = userRepository.findUserByUserid(user.getUserid());
        edit_user.setActive_courses(user.getActive_courses());
        userRepository.save(edit_user);
        return userRepository.findUserByUserid(user.getUserid());
    }

    @PostMapping(value = "/user/update/password")
    public User updatePassword(@RequestBody User user)
    {
        User edit_user = userRepository.findUserByUserid(user.getUserid());
        edit_user.setPassword(user.getPassword());
        userRepository.save(edit_user);
        return userRepository.findUserByUserid(user.getUserid());
    }

    @PostMapping(value = "/user/update/interest")
    public User updateSuggesstion(@RequestBody User user)
    {
        User edit_user = userRepository.findUserByUserid(user.getUserid());
        edit_user.setInterest(user.getInterest());
        userRepository.save(edit_user);
        return userRepository.findUserByUserid(user.getUserid());
    }

    @PostMapping(value = "/user/update/profile")
    public User updateProfile(@RequestBody User user)
    {
        User edit_user = userRepository.findUserByUserid(user.getUserid());
        edit_user.setFullname(user.getFullname());
        edit_user.setUsername(user.getUsername());
        edit_user.setEmail(user.getEmail());
        edit_user.setMobile(user.getMobile());
        edit_user.setParent_mobile(user.getParent_mobile());
        userRepository.save(edit_user);
        return userRepository.findUserByUserid(user.getUserid());
    }

    @Transactional
    @DeleteMapping(value = "/user/delete-user/{username}")
    public String deleteUser(@PathVariable String username)
    {
        if(userRepository.existsUserByUsername(username)) {
            userRepository.removeUserByUsername(username);
            return "Account Removed Successfully";
        }
        else {
            return "Account not found!";
        }
    }

    //Instructor
    @GetMapping(value = "/instructor/{username}")
    public Instructor getInstructor(@PathVariable String username)
    {
        return instructorRepository.findInstructorByUsername(username);
    }

    @Transactional
    @DeleteMapping(value = "/instructor/delete-instructor/{username}")
    public String deleteInstructor(@PathVariable String username)
    {
        if(instructorRepository.existsInstructorByUsername(username)) {
            instructorRepository.removeInstructorByUsername(username);
            return "Instructor Account Removed Successfully";
        }
        else {
            return "Instructor Account not found!";
        }
    }

    @PostMapping(value = "/common/add-instructor")
    public String addInstructor(@RequestBody Instructor instructor)
    {
        String instructor_username = instructor.getUsername();
        String instructor_email =  instructor.getEmail();
        if(instructorRepository.existsInstructorByUsername(instructor_username))
        {
            return "Instructor Username already exists";
        }
        else if(instructorRepository.existsInstructorByEmail(instructor_email))
        {
            return "Instructor Email already exists";
        }
        else {
            instructorRepository.save(instructor);
            return instructor_username + " Account added Successfully";
        }
    }

    @PostMapping(value = "/instructor/update/profile")
    public Instructor updateInstructorProfile(@RequestBody Instructor instructor)
    {
        Instructor edit_instructor = instructorRepository.findInstructorByUsername(instructor.getUsername());
        edit_instructor.setFullname(instructor.getFullname());
        edit_instructor.setUsername(instructor.getUsername());
        edit_instructor.setEmail(instructor.getEmail());
        edit_instructor.setMobile(instructor.getMobile());
        edit_instructor.setQualification(instructor.getQualification());
        instructorRepository.save(edit_instructor);
        return instructorRepository.findInstructorByUsername(instructor.getUsername());
    }

    @PostMapping(value = "/instructor/update/password")
    public Instructor updateInstructorPassword(@RequestBody Instructor instructor)
    {
        Instructor edit_instructor = instructorRepository.findInstructorByUsername(instructor.getUsername());
        edit_instructor.setPassword(instructor.getPassword());
        instructorRepository.save(edit_instructor);
        return instructorRepository.findInstructorByUsername(instructor.getUsername());
    }

    @GetMapping(value = "/instructor//update/course/{username}/{course_code}/{id}")
    public Instructor updateInstructorCourse(@PathVariable String username, @PathVariable String course_code, @PathVariable Integer id)
    {
        try {
            Instructor edit_instructor = instructorRepository.findInstructorByUsername(username);
            edit_instructor.setCourses(edit_instructor.getCourses().concat(course_code + "#" + id + ","));
            instructorRepository.save(edit_instructor);
            return instructorRepository.findInstructorByUsername(username);
        }
        catch (Exception e)
        {
            return null;
        }
    }

    //Session
    @GetMapping(value = "/session/{id}")
    public Session getSession(@PathVariable Integer id)
    {
        return sessionRepository.findSessionBySessionid(id);
    }

    @PostMapping(value = "/session/add-session")
    public Session addSession(@RequestBody Session session)
    {
        try {
            sessionRepository.save(session);
            return sessionRepository.findSessionByUsernameAndTypeAndIntimeAndOutTimeEquals(session.getUsername()
                    , session.getType(), session.getIntime(), "active");
        }
        catch (Exception e)
        {
            return null;
        }
    }

    @PostMapping(value = "/session/update")
    public String updateSession(@RequestBody Session session)
    {
        try {
            if (sessionRepository.existsSessionBySessionid(session.getSessionid())) {
                Session current_session = sessionRepository.findSessionBySessionid(session.getSessionid());
                String x = session.getOutTime();
                current_session.setOutTime(x);
                sessionRepository.save(current_session);
                return "Session Updated Successfully";
            } else {
                return "Session Not Found";
            }
        }
        catch (Exception e)
        {
            return "Error! Session not updated";
        }
    }

    @Transactional
    @DeleteMapping(value = "/session/delete-session/{id}")
    public String deleteSession(@PathVariable Integer id)
    {
        if(sessionRepository.existsSessionBySessionid(id)) {
            sessionRepository.removeSessionBySessionid(id);
            return "Session Removed Successfully";
        }
        else {
            return "Session not found!";
        }
    }

    //Question
    @GetMapping(value = "/forum/all-questions")
    public List<Question> getAllQuestions()
    {
        return questionRepository.findAll();
    }

    @PostMapping(value = "/forum/post/question")
    public Question addQuestion(@RequestBody Question question)
    {
        questionRepository.save(question);
        return questionRepository.findQuestionByPostedbyAndTimestampAndTopic(question.getPostedby(),question.getTimestamp(),question.getTopic());
    }

    //Reply
    @GetMapping(value = "/forum/all-replies")
    public List<Reply> getAllReplies()
    {
        return replyRepository.findAll();
    }

    @PostMapping(value = "/forum/post/reply")
    public Reply addReply(@RequestBody Reply reply)
    {
        replyRepository.save(reply);
        return replyRepository.findReplyByRepliedbyAndQidAndTimestamp(reply.getRepliedby(),reply.getQid(),reply.getTimestamp());
    }
}