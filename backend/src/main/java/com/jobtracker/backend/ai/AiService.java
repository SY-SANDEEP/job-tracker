package com.jobtracker.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;
import java.util.List;

@Service
public class AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com")
            .build();

    public String callGemini(String prompt) {
        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        Map response = webClient.post()
                .uri("/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        try {
            List candidates = (List) response.get("candidates");
            Map first = (Map) candidates.get(0);
            Map content = (Map) first.get("content");
            List parts = (List) content.get("parts");
            Map part = (Map) parts.get(0);
            return (String) part.get("text");
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    public String scoreResume(String jd, String resume) {
        String prompt = "You are an ATS resume analyzer.\n\nJob Description:\n" + jd +
                "\n\nResume/Skills:\n" + resume +
                "\n\nGive:\n1. Match Score: X/100\n2. Matched Skills\n3. Missing Skills\n4. Top 3 Improvements\n5. Overall Assessment";
        return callGemini(prompt);
    }

    public String generateInterviewQuestions(String role, String company) {
        String prompt = "Generate 10 interview questions for " + role + " at " + (company.isEmpty() ? "a top tech company" : company) +
                ".\nInclude:\n- 3 Technical\n- 3 DSA\n- 2 Project\n- 2 HR\nFor each add: What they're testing.";
        return callGemini(prompt);
    }

    public String tailorResume(String jd, String experience) {
        String prompt = "Write a tailored resume for this job:\n\nJD:\n" + jd +
                "\n\nMy Experience:\n" + experience +
                "\n\nProvide:\n1. Professional summary (3 lines)\n2. 4 bullet points\n3. Key skills\n4. Cover letter pitch";
        return callGemini(prompt);
    }
}