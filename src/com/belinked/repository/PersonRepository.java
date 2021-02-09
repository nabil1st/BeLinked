package com.belinked.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.belinked.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long>{
	Person findByEmail(String email);
}
