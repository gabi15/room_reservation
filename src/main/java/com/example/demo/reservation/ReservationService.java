package com.example.demo.reservation;

import com.example.demo.appuser.AppUser;
import com.example.demo.room.Room;
import com.example.demo.room.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomService roomService;
    public Reservation saveReservation(ReservationForm reservationForm, AppUser appUser){
        Room room = roomService.getRoomByName(reservationForm.getRoomName());
        Reservation reservation = new Reservation(reservationForm.getStartDate(), reservationForm.getEndDate(), room, appUser);
        reservationRepository.save(reservation);
        return reservation;

    }

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }
}
