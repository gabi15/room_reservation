package com.example.demo.room;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public
class RoomForm {
    private String name;
    private String startDate;
    private String endDate;
    private int reservationTimeInMinutes;
}
