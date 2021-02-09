package com.belinked.services;

import java.util.List;

import com.belinked.dto.RelationshipDTO;
import com.belinked.exception.RelationshipNotFoundException;
import com.belinked.model.Relationship;

public interface RelationshipService {
	/**
     * Creates a new relationship.
     * @param created   The information of the created relationship.
     * @return  The created person.
     */
    public Relationship create(RelationshipDTO created);

    /**
     * Deletes a person.
     * @param personId  The id of the deleted person.
     * @return  The deleted person.
     * @throws PersonNotFoundException  if no person is found with the given id.
     */
    public Relationship delete(Long id) throws RelationshipNotFoundException;

    /**
     * Finds all persons.
     * @return  A list of persons.
     */
    public List<Relationship> findAll();

    /**
     * Finds person by id.
     * @param id    The id of the wanted person.
     * @return  The found person. If no person is found, this method returns null.
     */
    public Relationship findById(Long id);

    /**
     * Updates the information of a person.
     * @param updated   The information of the updated person.
     * @return  The updated person.
     * @throws PersonNotFoundException  if no person is found with given id.
     */
    public Relationship update(RelationshipDTO updated) throws RelationshipNotFoundException;
}
