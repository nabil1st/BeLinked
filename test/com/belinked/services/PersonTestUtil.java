package com.belinked.services;

import com.belinked.dto.PersonDTO;
import com.belinked.model.Person;


/**
 * An utility class which contains useful methods for unit testing person related
 * functions.  
 */
public class PersonTestUtil {

    public static PersonDTO createDTO(Long id, String firstName, String lastName) {
        PersonDTO dto = new PersonDTO();

        dto.setId(id);
        dto.setfName(firstName);
        dto.setlName(lastName);

        return dto;
    }

    public static Person createModelObject(Long id, String firstName, String lastName) {
        Person model = new Person();
        model.setFirstName(firstName);
        model.setLastName(lastName);
        model.setId(id);

        return model;
    }
}