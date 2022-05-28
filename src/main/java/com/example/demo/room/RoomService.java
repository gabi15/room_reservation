package com.example.demo.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoomService {
    private final RoomRepository roomRepository;

    public Room saveRoom(RoomForm roomForm){
        Room room = new Room(roomForm.getName(), roomForm.getStartDate(), roomForm.getEndDate());
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
}
