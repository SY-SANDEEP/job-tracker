package com.jobtracker.backend.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/score")
    public ResponseEntity<Map<String, String>> score(@RequestBody AiRequest req) {
        String result = aiService.scoreResume(req.getJd(), req.getResume());
        return ResponseEntity.ok(Map.of("result", result));
    }

    @PostMapping("/interview")
    public ResponseEntity<Map<String, String>> interview(@RequestBody AiRequest req) {
        String result = aiService.generateInterviewQuestions(
                req.getRole(),
                req.getCompany() != null ? req.getCompany() : ""
        );
        return ResponseEntity.ok(Map.of("result", result));
    }

    @PostMapping("/tailor")
    public ResponseEntity<Map<String, String>> tailor(@RequestBody AiRequest req) {
        String result = aiService.tailorResume(req.getJd(), req.getExperience());
        return ResponseEntity.ok(Map.of("result", result));
    }
}