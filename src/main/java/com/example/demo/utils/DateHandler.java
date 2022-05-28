package com.example.demo.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateHandler {
    public static Date handleDate(String date){
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
