package com.jobtracker.backend.ai;

import lombok.Data;

@Data
public class AiRequest {
    private String type;
    private String jd;
    private String resume;
    private String role;
    private String company;
    private String experience;
    private String tailorJd;
}