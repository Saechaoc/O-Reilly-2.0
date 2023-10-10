package com.chris.oreillyclone.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication authentication) {
        long expirationTimeMillis = 24 * 60 * 60 * 1000L; // 24 hours in milliseconds
        Date now = new Date();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if(authorities.isEmpty()) {
            System.out.println("Authorities are empty");
        }

        String authoritiesString = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        System.out.println(authorities);

        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationTimeMillis))
                .claim("email", authentication.getName())
                .claim("authorities", authoritiesString)
                .signWith(key)
                .compact();
    }

    //How should I handle missing tokens? Possibly create two exceptions since this is connected to user, UserException & InvalidTokenException
    public String getEmailFromToken(String jwt) {
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        return (String) claims.get("email");
    }

    public List<SimpleGrantedAuthority> getAuthoritiesFromToken(String jwt) {
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String authoritiesString = (String) claims.get("authorities");
        return Arrays.stream(authoritiesString.split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }


}

