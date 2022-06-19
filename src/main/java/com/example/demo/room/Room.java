package com.example.demo.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Time;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;
    private Time startTime;
    private Time endTime;

    private int reservationTimeInMinutes;

    public Room(String name, String startTime, String endTime, int minutes) {
        this.name = name;
        this.startTime = Time.valueOf(startTime);
        this.endTime = Time.valueOf(endTime);
        this.reservationTimeInMinutes = minutes;
    }
}
