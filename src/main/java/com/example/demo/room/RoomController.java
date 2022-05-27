package com.example.demo.room;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

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
}

@Data
class RoomForm {
    private String name;
    private String startDate;
    private String endDate;
}

