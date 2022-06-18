package com.example.demo.reservation;

import com.example.demo.appuser.AppUserServiceImpl;
import com.example.demo.utils.AuthHandler;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
        String email = AuthHandler.getCurrentUserEmail(request.getHeader(AUTHORIZATION));
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/reservation/save").toUriString());
        return ResponseEntity.created(uri).body(reservationService.saveReservation(reservationForm, email));
    }

    @GetMapping("reservations")
    public ResponseEntity<List<Reservation>> getReservations(){
        return ResponseEntity.ok().body(reservationService.getReservations());
    }

    @DeleteMapping(value = "/reservations/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {

        boolean isRemoved = reservationService.deleteReservation(id);

        if (!isRemoved) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("successfully deleted", HttpStatus.OK);
    }
}

@Data
class ReservationForm{
    private String startDate;
    private String endDate;
    private String roomName;
}
