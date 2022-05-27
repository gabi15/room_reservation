package com.example.demo.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

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
        this.startDateTime = new Timestamp(handleDate(startDateTime).getTime());
        this.endDateTime = new Timestamp(handleDate(endDateTime).getTime());
    }

    private Date handleDate(String date){
        String target = "11-02-2022 15:30:00";
        DateFormat df = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss", Locale.ENGLISH);
        Date result;
        try{
        result = df.parse(date);
        }
        catch(Exception e){
            result = null;
        }
        return result;

    }
}
