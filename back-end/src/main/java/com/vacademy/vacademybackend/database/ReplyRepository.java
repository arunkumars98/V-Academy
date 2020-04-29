package com.vacademy.vacademybackend.database;

import com.vacademy.vacademybackend.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository  extends JpaRepository<Reply,Integer> {

    Reply findReplyByRepliedbyAndQidAndTimestamp(String user, Integer qid, String timestamp);
}