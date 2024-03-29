package com.example.demo.appuser;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.utils.AuthHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppUserController {

    private final AppUserServiceImpl appUserServiceImpl;
//
//    @Autowired
//    public AppUserController(AppUserServiceImpl appUserServiceImpl) {
//        this.appUserServiceImpl = appUserServiceImpl;
//    }

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(appUserServiceImpl.getUsers());
    }

    @GetMapping("/user/get")
    public ResponseEntity<UserWithoutPassword> getUser(HttpServletRequest request) {
        String email = AuthHandler.getCurrentUserEmail(request.getHeader(AUTHORIZATION));
        AppUser appUser = appUserServiceImpl.getAppUser(email);
        return ResponseEntity.ok().body(new UserWithoutPassword(appUser.getId(), appUser.getEmail(), appUser.getName(), appUser.getSurname()));
    }

    @GetMapping("/user/get_role")
    public ResponseEntity<List<Role>> getRoles(HttpServletRequest request) {
        String email = AuthHandler.getCurrentUserEmail(request.getHeader(AUTHORIZATION));
        List<Role> roles = appUserServiceImpl.getUserRole(email);
        return ResponseEntity.ok().body(roles);
    }


    @PostMapping("/user/save")
    public ResponseEntity<String> registerNewAppUser(@RequestBody AppUser appUser) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/user/save").toUriString());
        try {
            appUserServiceImpl.saveAppUser(appUser);
            appUserServiceImpl.addRoleToAppUser(appUser.getEmail(), "ROLE_USER");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.created(uri).body("success");
    }

    @PostMapping("/user/save/admin")
    public ResponseEntity<String> registerNewAppAdmin(@RequestBody AppUser appUser) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/user/save").toUriString());
        try {
            appUserServiceImpl.saveAppUser(appUser);
            appUserServiceImpl.addRoleToAppUser(appUser.getEmail(), "ROLE_ADMIN");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.created(uri).body("success");
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/role/save").toUriString());
        return ResponseEntity.created(uri).body(appUserServiceImpl.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm roleToUserForm) {
        appUserServiceImpl.addRoleToAppUser(roleToUserForm.getEmail(), roleToUserForm.getEmail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/check") public ResponseEntity<?> checkToken(HttpServletRequest request) throws IOException{
        return ResponseEntity.ok().build();
    }
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String SECRET_KEY = System.getenv("SECRET_KEY");
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String email = decodedJWT.getSubject();
                AppUser user = appUserServiceImpl.getAppUser(email);

                String access_token = JWT.create().withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

//    @DeleteMapping(path = "{userId}")
//    public void deleteAppUser(@PathVariable("userId") Long id) {
//        appUserServiceImpl.deleteAppUser(id);
//    }

    @PutMapping(path = "/user/{userId}")
    public void updateAppUser(
            @PathVariable("userId") Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) String email) {
        appUserServiceImpl.updateAppUser(id, name, surname, email);

    }
}

@Data
class RoleToUserForm {
    private String email;
    private String roleName;
}

@Data
@AllArgsConstructor
class UserWithoutPassword {
    private Long id;
    private String email;
    private String name;
    private String surname;
}

