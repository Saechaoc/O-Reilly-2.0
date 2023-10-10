package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.config.JwtProvider;
import com.chris.oreillyclone.config.Roles;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.repository.UserRepository;
import com.chris.oreillyclone.request.LoginRequest;
import com.chris.oreillyclone.response.AuthResponse;
import com.chris.oreillyclone.service.CartService;
import com.chris.oreillyclone.service.CustomerUserServiceImplementation;
import com.chris.oreillyclone.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/auth")
@Data
@Getter
@Setter
@AllArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomerUserServiceImplementation customerUserService;
    private final CartService cartService;
    private final UserService userService;

    @PostMapping(value = "/signup", produces = "application/json")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new UserException("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);

        if(user.getRole() == null || user.getRole().equals(Roles.USER)) {
            createdUser.setRole(Roles.USER);
        }else {
            createdUser.setRole(Roles.ADMIN);
        }

        createdUser.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(createdUser);

        Cart cart = cartService.createCart(savedUser);

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword(), authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "Sign up success");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse>loginUserHandler(@RequestBody LoginRequest loginRequest) throws UserException{
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "Sign in success");
        return new ResponseEntity<>(authResponse,HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String username, String password) throws UserException {
        UserDetails userDetails = customerUserService.loadUserByUsername(username);
        User user = userService.findUserByEmail(username);
        if(userDetails == null) throw new BadCredentialsException("Invalid username");

        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        String role = user.getRole();
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));
        return new UsernamePasswordAuthenticationToken(username,password,authorities);
    }

    @PostMapping("/test")
    public ResponseEntity<Map<String, String>> testEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Test successful");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

