package com.example.demo.room;

import com.example.demo.utils.DateHandler;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

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
    private Timestamp startDateTime;
    private Timestamp endDateTime;

    public Room(String name, String startDateTime, String endDateTime) {
        this.name = name;
        this.startDateTime = new Timestamp(DateHandler.handleDate(startDateTime).getTime());
        this.endDateTime = new Timestamp(DateHandler.handleDate(endDateTime).getTime());
    }
}
