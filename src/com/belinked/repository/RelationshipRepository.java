package com.belinked.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.belinked.model.Relationship;


public interface RelationshipRepository extends JpaRepository<Relationship, Long>{
	List<Relationship> findById1(Long id1);
	List<Relationship> findById2(Long id2);
	List<Relationship> findById1AndRelationship(Long id1, String relationship);
	List<Relationship> findById2AndRelationship(Long id2, String relationship);
}
