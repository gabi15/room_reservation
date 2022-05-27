package com.example.demo.reservation;

import com.example.demo.room.Room;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Table
@Data
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private Timestamp creationDate;

    @ManyToOne
    private Room room;

    public Reservation(Long id, String name, Date startDate, Date endDate) {
        java.util.Date utilDate = new java.util.Date();
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creationDate = new Timestamp(utilDate.getTime());
    }
}
