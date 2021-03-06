package com.example.demo.room;

import com.example.demo.reservation.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/room/save")
    public ResponseEntity<Room> saveRoom(@RequestBody RoomForm roomForm){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/room/save").toUriString());
        return ResponseEntity.created(uri).body(roomService.saveRoom(roomForm));
    }

    @PutMapping("/room/edit")
    public ResponseEntity<Room> editRoom(@RequestBody RoomForm roomForm){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/room/edit").toUriString());
        return ResponseEntity.created(uri).body(roomService.editRoom(roomForm));
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getRooms(){
        return ResponseEntity.ok().body(roomService.getRooms());
    }

    @GetMapping("/room/{name}")
    public ResponseEntity<List<RoomService.StartEnd>> getSlots(@PathVariable String name) {
        return ResponseEntity.ok().body(roomService.getRoomsTimeSlots(name));
    }

    @GetMapping("/room_reservations/{name}")
    public ResponseEntity<List<Reservation>> getRoomReservations(@PathVariable String name) {
        return ResponseEntity.ok().body(roomService.getRoomReservations(name));
    }
}

