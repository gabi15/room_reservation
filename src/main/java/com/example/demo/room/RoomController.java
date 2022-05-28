package com.example.demo.room;

import lombok.Data;
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

    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getRooms(){
        return ResponseEntity.ok().body(roomService.getRooms());
    }
}

@Data
class RoomForm {
    private String name;
    private String startDate;
    private String endDate;
}

