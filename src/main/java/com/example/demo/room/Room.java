package com.example.demo.room;

import com.example.demo.reservation.Reservation;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

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

    @JsonManagedReference
    @OneToMany(mappedBy = "room",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Reservation> reservationList = new ArrayList<>();

    public Room(String name, String startTime, String endTime, int minutes) {
        this.name = name;
        this.startTime = Time.valueOf(startTime);
        this.endTime = Time.valueOf(endTime);
        this.reservationTimeInMinutes = minutes;
    }

    public void addReservation(Reservation reservation){
        reservationList.add(reservation);
    }
}
