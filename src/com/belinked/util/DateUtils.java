package com.belinked.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
	public static Date toDate(String str) {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    	try {
			return format.parse(str);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	return null;
	}
}
