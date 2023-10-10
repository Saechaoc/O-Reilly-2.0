package com.chris.oreillyclone.service;

import com.chris.oreillyclone.config.JwtProvider;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    // Inject required dependencies using @Autowired or constructor-based injection
    // Implement the methods

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public UserServiceImplementation(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long userId) throws UserException {
        return userRepository.findById(userId).orElseThrow(() -> new UserException("Product with id: " + userId + " does not exist."));
    }

    @Override
    public User findUserByJWT(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    public User findUserByEmail(String email) throws UserException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserException("User with email " + email + " does not exist."));
    }
}
