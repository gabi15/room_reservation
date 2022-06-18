package com.example.demo;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.appuser.Role;
import com.example.demo.room.RoomForm;
import com.example.demo.room.RoomService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }


    @Bean
    CommandLineRunner run(AppUserService appUserService, RoomService roomService) {
        return args -> {
            appUserService.saveRole(new Role(null, "ROLE_USER"));
            appUserService.saveRole(new Role(null, "ROLE_ADMIN"));
            appUserService.saveAppUser(new AppUser(null, "Gabi", "Lesn", "gabi@mail.com", "pass", new ArrayList<>()));
            appUserService.saveAppUser(new AppUser(null, "Gabi", "Lesn4", "gabi4@mail.com", "pass", new ArrayList<>()));
            appUserService.addRoleToAppUser("gabi@mail.com", "ROLE_USER");
            appUserService.addRoleToAppUser("gabi4@mail.com", "ROLE_ADMIN");
            appUserService.addRoleToAppUser("gabi4@mail.com", "ROLE_USER");
            roomService.saveRoom(new RoomForm("salka wspinaczkowa", "15-02-2022 15:30:00", "15-02-2022 15:30:00", 60));
        };

    }
}
