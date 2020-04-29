package com.vacademy.vacademybackend.database;

import com.vacademy.vacademybackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Integer> {

    Question findQuestionByPostedbyAndTimestampAndTopic(String user,String timestamp, String topic);
}
