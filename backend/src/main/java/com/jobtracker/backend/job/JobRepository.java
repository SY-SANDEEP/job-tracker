package com.jobtracker.backend.job;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobtracker.backend.user.User;
import java.util.List;

public interface JobRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUser(User user);
    long countByUserAndStatus(User user, String status);
}