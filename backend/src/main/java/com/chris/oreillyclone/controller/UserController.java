package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization")String jwt) throws UserException {
        User user = userService.findUserByJWT(jwt);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }
}
