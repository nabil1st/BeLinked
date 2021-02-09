package com.belinked.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;

import com.belinked.model.Person;
import com.belinked.model.Relationship;
import com.belinked.services.RepositoryPersonService;
import com.belinked.services.RepositoryRelationshipService;
import com.belinked.util.DateUtils;

@Configurable(dependencyCheck=true)
public class PeopleMap {	
	
	@Autowired
	private RepositoryPersonService personService;
	
	@Autowired
	private RepositoryRelationshipService relationshipService;
	
	private Map<Long, PersonDTO> map = new HashMap<Long, PersonDTO>();
	private List<RelationshipDTO> relationshipMap = new ArrayList<RelationshipDTO>();
	
	private static PeopleMap instance = new PeopleMap();
			
	public PeopleMap() {
		/*PersonDTO person = new PersonDTO();
		person.setId(new Long(1));
		person.setDob(DateUtils.toDate("01-01-1980"));
		person.setfName("Bugs");
		person.setlName("Bunny");
		person.setSex(RelationshipDTO.MALE);
		person.setSource("BugsBunny.jpg");
		
		map.put(person.getId(), person);*/		
	}
	
	public static PeopleMap getInstance() {		
		return instance;
	}
	
	public PersonDTO getPersonById(Long id) {
		Person person = personService.findById(id);
		return new PersonDTO(person);
		//return this.map.get(id);
	}
	
	public void addPerson(PersonDTO person) {
		this.map.put(person.getId(), person);
	}
	
	private String convertRelationshipDetailToRelationShip(String relationshipDetail) {
		String relationship = "";
		if (relationshipDetail.equals(RelationshipDTO.BROTHER) || relationshipDetail.equals(RelationshipDTO.SISTER)) {
			relationship = RelationshipDTO.SIBLING;
		} else if (relationshipDetail.equals(RelationshipDTO.FATHER) || relationshipDetail.equals(RelationshipDTO.MOTHER)) {
			relationship = RelationshipDTO.PARENT;
		} else if (relationshipDetail.equals(RelationshipDTO.SON) || relationshipDetail.equals(RelationshipDTO.DAUGHTER)) {
			relationship = RelationshipDTO.CHILD;
		} else if (relationshipDetail.equals(RelationshipDTO.WIFE) || relationshipDetail.equals(RelationshipDTO.HUSBAND)) {
			relationship = RelationshipDTO.SPOUCE;
		}
		
		return relationship;
	}
	
	public void addRelatedPersonByRelationship(PersonDTO person, Long relatedToId, String relationship) {
			
		RelationshipDTO rDTO = new RelationshipDTO(person.getId(), 
				relatedToId, 
				relationship);
		
		Relationship r = relationshipService.create(rDTO);
		
		rDTO = new RelationshipDTO(r);				
		relationshipMap.add(rDTO);
		
		String reverseRelationship = "";
		if (relationship.equals(RelationshipDTO.SPOUCE)) {
			reverseRelationship = RelationshipDTO.SPOUCE;
		} else if (relationship.equals(RelationshipDTO.CHILD)) {
			reverseRelationship = RelationshipDTO.PARENT;
		} else if (relationship.equals(RelationshipDTO.PARENT)) {
			reverseRelationship = RelationshipDTO.CHILD;
		} else if (relationship.equals(RelationshipDTO.SIBLING)) {
			reverseRelationship = RelationshipDTO.SIBLING;
		}
		
		rDTO = new RelationshipDTO(relatedToId, person.getId(), reverseRelationship);
		r = relationshipService.create(rDTO);		
		rDTO = new RelationshipDTO(r);
		relationshipMap.add(rDTO);
	}
	
	
	public void addRelatedPersonByRelationshipDetail(PersonDTO person, Long relatedToId, String relationshipDetail) {
		//this.map.put(person.getId(), person);		
		String relationship = convertRelationshipDetailToRelationShip(relationshipDetail);
		addRelatedPersonByRelationship(person, relatedToId, relationship);
		
		// a new child is automatically the sibling of all other children
		if (relationship.equals(RelationshipDTO.CHILD)) {
			List<PersonDTO> allChildren = findAllRelatives(relatedToId, RelationshipDTO.CHILD);
			for(PersonDTO c : allChildren) {
				if (c.getId().longValue() != person.getId().longValue()) {
					addRelatedPersonByRelationship(person, c.getId(), RelationshipDTO.SIBLING);
				}
			}
		}
		
		
//		if (relationship.equals(Relationship.PARENT)) {
//			
//			Relationship r1 = null;
//			Relationship r2 = null;
//			// Find the other parent (if present) and create a spouce relationship between the two
//			for (Relationship r : relationshipMap) {
//				if (r.getId2().longValue() == relatedToId.longValue() && 
//						r.getId1().longValue() != person.getId() &&
//						r.getRelationship().equals(Relationship.PARENT)) {
//					r1 = new Relationship(person.getId(), r.getId1(), Relationship.SPOUCE);
//					r2 = new Relationship(r.getId1(), person.getId(), Relationship.SPOUCE);
//					break;
//				}
//			}
//			
//			if (r1 != null) {
//				relationshipMap.add(r1);
//			}
//			
//			if (r2 != null) {
//				relationshipMap.add(r2);
//			}
//		}
	}
	
	public List<TreeLeaf> getTreeForId(Long id) {
		List<TreeLeaf> list = new ArrayList<TreeLeaf>();
		PersonDTO self = this.map.get(id);
		if (self != null) {
			list.add(new TreeLeaf(self, RelationshipDTO.SELF));
			for (RelationshipDTO r : relationshipMap) {
				if (r.getId2().longValue() == id.longValue()) {
					list.add(new TreeLeaf(map.get(r.getId1()), r.getRelationship()));				
				}
			}
		}
		
		return list;		
		
	}
	
	public List<TreeLeaf> getAllRelativesMissingRelationship(Long id, String relativeType, String missingRelationship) {
		List<PersonDTO> allRelatives = new ArrayList<PersonDTO>();
		for (RelationshipDTO r : relationshipMap) {
			if (r.getId2().longValue() == id.longValue() && r.getRelationship().equals(relativeType)) {
				allRelatives.add(map.get(r.getId1()));								
			}
		}
		
		List<TreeLeaf> allRelativesMissingRelationship = new ArrayList<TreeLeaf>();
		for (PersonDTO p : allRelatives) {
			List<RelationshipDTO> rlist = findRelationships(p, missingRelationship);
			if (rlist.size() == 0) { // This person does not have the relationship specified
				allRelativesMissingRelationship.add(new TreeLeaf(map.get(p.getId()), relativeType));
			}
		}
		
		return allRelativesMissingRelationship;	
	}
	
	private List<RelationshipDTO> findRelationships(PersonDTO p, String relationship) {
		List<RelationshipDTO> list = new ArrayList<RelationshipDTO>();
		for (RelationshipDTO r : relationshipMap) {
			if (r.getId2().longValue() == p.getId().longValue() && 
					r.getRelationship().equals(relationship)) {
				list.add(r);				
			}
		}
		
		return list;
	}
	
	public void createRelationship(Long selectedPersonId, 
			Long relatedPersonId, 
			PersonDTO newPerson, 
			String relationshipDetailOfNewPersonToSelectedPerson, 
			String relationshipOfRelatedPersonToSelectedPerson) {
		
		String relationshipOfNewPersonToSelectedPerson = convertRelationshipDetailToRelationShip(
				relationshipDetailOfNewPersonToSelectedPerson);
		
		if (relationshipOfNewPersonToSelectedPerson.equals(RelationshipDTO.PARENT)) {
			if (relationshipOfRelatedPersonToSelectedPerson.equals(RelationshipDTO.SIBLING)) {
				addRelatedPersonByRelationship(newPerson, relatedPersonId, RelationshipDTO.PARENT);
			} else if (relationshipOfRelatedPersonToSelectedPerson.equals(RelationshipDTO.PARENT)) {
				addRelatedPersonByRelationship(newPerson, relatedPersonId, RelationshipDTO.SPOUCE);
			}
		} else if (relationshipOfNewPersonToSelectedPerson.equals(RelationshipDTO.SIBLING)) {
			if (relationshipOfRelatedPersonToSelectedPerson.equals(RelationshipDTO.SIBLING)) {
				addRelatedPersonByRelationship(newPerson, relatedPersonId, RelationshipDTO.SIBLING);
			} else if (relationshipOfRelatedPersonToSelectedPerson.equals(RelationshipDTO.PARENT)) {
				addRelatedPersonByRelationship(newPerson, relatedPersonId, RelationshipDTO.CHILD);
			}
		} else if (relationshipOfNewPersonToSelectedPerson.equals(RelationshipDTO.SPOUCE)) {
			if (relationshipOfRelatedPersonToSelectedPerson.equals(RelationshipDTO.CHILD)) {
				addRelatedPersonByRelationship(newPerson, relatedPersonId, RelationshipDTO.PARENT);
			} 
		} else if (relationshipOfNewPersonToSelectedPerson.equals(RelationshipDTO.CHILD)) {
			if (relationshipOfRelatedPersonToSelectedPerson.equals(RelationshipDTO.SPOUCE)) {
				addRelatedPersonByRelationship(newPerson, relatedPersonId, RelationshipDTO.CHILD);
			} 
		}
	}
	
	private List<PersonDTO> findAllRelatives(Long personId, String relationship) {
		List<PersonDTO> list = new ArrayList<PersonDTO>();
		for (RelationshipDTO r : relationshipMap) {
			if (r.getId2().longValue() == personId.longValue() && r.getRelationship().equals(relationship)) {
				list.add(map.get(r.getId1()));								
			}
		}
		
		return list;
	}
	
	public List<TreeLeaf> getAllRelativesOfType(Long personId, String relationship) {
		List<PersonDTO> list = findAllRelatives(personId, relationship);
		List<TreeLeaf> treeLeaves = new ArrayList<TreeLeaf>();
		for(PersonDTO p : list) {
			treeLeaves.add(new TreeLeaf(p, relationship));
		}
		
		return treeLeaves;
	}

}
