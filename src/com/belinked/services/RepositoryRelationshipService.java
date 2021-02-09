package com.belinked.services;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.belinked.dto.RelationshipDTO;
import com.belinked.exception.RelationshipNotFoundException;
import com.belinked.model.Relationship;
import com.belinked.repository.RelationshipRepository;

@Service
public class RepositoryRelationshipService implements RelationshipService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(RepositoryRelationshipService.class);

	@Resource
	private RelationshipRepository relationshipRepository;
	
	@Transactional
	@Override
	public Relationship create(RelationshipDTO created) {
		LOGGER.debug("Creating a new relationship with information: " + created);        
        Relationship relationship = new Relationship();
        relationship.setId1(created.getId1());
        relationship.setId2(created.getId2());
        relationship.setRelationship(created.getRelationship());
        
        return relationshipRepository.save(relationship);
	}

	@Transactional(rollbackFor = RelationshipNotFoundException.class)
	@Override
	public Relationship delete(Long relationshipId) throws RelationshipNotFoundException {
		LOGGER.debug("Deleting relationship with id: " + relationshipId);
		Relationship deleted = relationshipRepository.findOne(relationshipId);
		
		if (deleted == null) {
			LOGGER.debug("No relationship found with id: " + relationshipId);
            throw new RelationshipNotFoundException();
		}
		
		relationshipRepository.delete(deleted);
		return deleted;
	}

	@Transactional(readOnly = true)
	@Override
	public List<Relationship> findAll() {
		LOGGER.debug("Finding all relationships");
        return relationshipRepository.findAll();
	}

	@Transactional(readOnly = true)
	@Override
	public Relationship findById(Long id) {
		LOGGER.debug("Finding relationship by id: " + id);
        return relationshipRepository.findOne(id);
    }
	

	@Transactional(rollbackFor = RelationshipNotFoundException.class)
	@Override
	public Relationship update(RelationshipDTO updated) throws RelationshipNotFoundException {
		LOGGER.debug("Updating relationship with information: " + updated);
        
        Relationship relationship = relationshipRepository.findOne(updated.getId());
        
        if (relationship == null) {
            LOGGER.debug("No relationship found with id: " + updated.getId());
            throw new RelationshipNotFoundException();
        }
        
        relationship.setId1(updated.getId1());
        relationship.setId2(updated.getId2());
        relationship.setRelationship(updated.getRelationship());
                
        return relationship;
	}
	
	/**
     * This setter method should be used only by unit tests.
     * @param relationshipRepository
     */
    protected void setRelationshipRepository(RelationshipRepository relationshipRepository) {
        this.relationshipRepository = relationshipRepository;
    }

}
