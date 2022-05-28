package com.example.demo.reservation;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserServiceImpl;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path = "api/v1")
@RequiredArgsConstructor
@Slf4j
public class ReservationController {
    private final ReservationService reservationService;
    private final AppUserServiceImpl appUserServiceImpl;

    @PostMapping("reservation/save")
    public ResponseEntity<Reservation> saveReservation(HttpServletRequest request, @RequestBody ReservationForm reservationForm){
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/reservation/save").toUriString());
        String refresh_token = authorizationHeader.substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(refresh_token);
        String email = decodedJWT.getSubject();
        log.info("the email is {}",email);
        AppUser user = appUserServiceImpl.getAppUser(email);
        return ResponseEntity.created(uri).body(reservationService.saveReservation(reservationForm, user));
    }

    @GetMapping("reservations")
    public ResponseEntity<List<Reservation>> getReservations(){
        return ResponseEntity.ok().body(reservationService.getReservations());
    }
}

@Data
class ReservationForm{
    private String startDate;
    private String endDate;
    private String roomName;
}
