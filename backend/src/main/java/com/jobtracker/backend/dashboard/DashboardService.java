package com.jobtracker.backend.dashboard;

import com.jobtracker.backend.job.JobRepository;
import com.jobtracker.backend.user.User;
import com.jobtracker.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Map<String, Long> getStats() {
        User user = getCurrentUser();
        Map<String, Long> stats = new HashMap<>();
        stats.put("total",       jobRepository.findByUser(user).size() * 1L);
        stats.put("applied",     jobRepository.countByUserAndStatus(user, "APPLIED"));
        stats.put("shortlisted", jobRepository.countByUserAndStatus(user, "SHORTLISTED"));
        stats.put("interview",   jobRepository.countByUserAndStatus(user, "INTERVIEW"));
        stats.put("offer",       jobRepository.countByUserAndStatus(user, "OFFER"));
        stats.put("rejected",    jobRepository.countByUserAndStatus(user, "REJECTED"));
        return stats;
    }
}