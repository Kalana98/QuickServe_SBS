package com.epiclanka.bookingsysbackend.services.authentication;

import com.epiclanka.bookingsysbackend.dto.SignupRequestDTO;
import com.epiclanka.bookingsysbackend.dto.UserDto;

public interface AuthService {

    UserDto signupClient(SignupRequestDTO signupRequestDTO);

    Boolean presentByEmail(String email);

    UserDto signupCompany(SignupRequestDTO signupRequestDTO);
}
