package com.chris.oreillyclone.service;


import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.User;

public interface UserService {
    User findUserById(Long userId) throws UserException;

    User findUserByJWT(String jwt) throws UserException;

    User findUserByEmail(String email) throws UserException;

}
