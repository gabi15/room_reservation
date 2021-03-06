package com.example.demo.room;

import com.example.demo.reservation.Reservation;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoomService {
    private final RoomRepository roomRepository;

    public Room saveRoom(RoomForm roomForm){
        Room room = new Room(roomForm.getName(), roomForm.getStartTime(), roomForm.getEndTime(), roomForm.getReservationTimeInMinutes());
        Optional<Room> roomByName = roomRepository.findByName(room.getName());
        if( roomByName.isPresent()){
            throw new IllegalStateException("Room name taken");
        }
        log.info("Saving new room {} to the database", room.getName());
        roomRepository.save(room);
        return room;
    }

    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomByName(String roomName){
        Optional<Room> roomByName = roomRepository.findByName(roomName);
        if(roomByName.isEmpty()){
            throw new IllegalStateException("No such room");
        }
        return roomByName.get();
    }

    public Room editRoom(RoomForm roomForm) {
        Room room = getRoomByName(roomForm.getName());
        room.setName(roomForm.getName());
        room.setReservationTimeInMinutes(roomForm.getReservationTimeInMinutes());
        //room.setStartDateTime(roomForm.getStartDate());
        return room;
    }

    public List<StartEnd> getRoomsTimeSlots(String roomName){
        Room room = getRoomByName(roomName);
        LocalTime start = room.getStartTime().toLocalTime();
        LocalTime end = room.getEndTime().toLocalTime();
        int minutes = room.getReservationTimeInMinutes();
        ArrayList<StartEnd> slots = new ArrayList<StartEnd>();
        while(start.compareTo(end) < 0 ){
            StartEnd startEnd = new StartEnd();
            startEnd.setStart(start.toString());
            start = start.plusMinutes(minutes);
            startEnd.setEnd(start.toString());
            slots.add(startEnd);
        }
        return slots;

    }

    public List<Reservation> getRoomReservations(String roomName) {
        Room room = getRoomByName(roomName);
        return room.getReservationList();

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    class StartEnd{
        String start;
        String end;
    }
}
