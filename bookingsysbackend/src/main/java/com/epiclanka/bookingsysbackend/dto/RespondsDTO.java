package com.epiclanka.bookingsysbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data

public class RespondsDTO {
    private String code;
    private String message;
    private Object content;

    public static RespondsDTO of(String code, String message, Object content) {
        return new RespondsDTO(code, message, content);
    }
}
