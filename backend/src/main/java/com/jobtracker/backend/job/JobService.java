package com.jobtracker.backend.job;

import com.jobtracker.backend.user.User;
import com.jobtracker.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<JobApplication> getAllJobs() {
        return jobRepository.findByUser(getCurrentUser());
    }

    public JobApplication addJob(JobApplication job) {
        job.setUser(getCurrentUser());
        return jobRepository.save(job);
    }

    public JobApplication updateJob(Long id, JobApplication updated) {
        JobApplication existing = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        existing.setCompanyName(updated.getCompanyName());
        existing.setRole(updated.getRole());
        existing.setStatus(updated.getStatus());
        existing.setAppliedDate(updated.getAppliedDate());
        existing.setJobLink(updated.getJobLink());
        existing.setNotes(updated.getNotes());
        return jobRepository.save(existing);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}