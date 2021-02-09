package com.belinked.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.belinked.dto.PeopleMap;
import com.belinked.dto.RelationshipDTO;
import com.belinked.dto.TreeLeaf;

@Controller
@RequestMapping("/userTree")
public class TreeController {
	
	@RequestMapping(value="/{id}", method = RequestMethod.GET)
	public @ResponseBody List<TreeLeaf> getUserTree(@PathVariable Long id) {
		//return FamilyMaps.getInstance().getFamilyMap();
		return PeopleMap.getInstance().getTreeForId(id);
	}
	
	@RequestMapping(value="/{id}/{relationship}", method = RequestMethod.GET)
	public @ResponseBody List<TreeLeaf> getRelationshipConfirms(@PathVariable Long id, @PathVariable String relationship) {
		List<TreeLeaf> confirms = new ArrayList<TreeLeaf>();
		if (relationship.equals(RelationshipDTO.FATHER) || relationship.equals(RelationshipDTO.MOTHER)) {
			confirms.addAll(PeopleMap.getInstance().getAllRelativesMissingRelationship(id, RelationshipDTO.SIBLING, relationship));
			confirms.addAll(PeopleMap.getInstance().getAllRelativesMissingRelationship(id, RelationshipDTO.PARENT, relationship.equals(RelationshipDTO.MOTHER)?RelationshipDTO.FATHER:RelationshipDTO.MOTHER));
		} else if (relationship.equals(RelationshipDTO.BROTHER) || relationship.equals(RelationshipDTO.SISTER)) {
			confirms.addAll(PeopleMap.getInstance().getAllRelativesOfType(id, RelationshipDTO.SIBLING));
			confirms.addAll(PeopleMap.getInstance().getAllRelativesOfType(id, RelationshipDTO.PARENT));
		} else if (relationship.equals(RelationshipDTO.HUSBAND) || relationship.equals(RelationshipDTO.WIFE)) {
			confirms.addAll(PeopleMap.getInstance().getAllRelativesOfType(id, RelationshipDTO.CHILD));			
		} else if (relationship.equals(RelationshipDTO.SON) || relationship.equals(RelationshipDTO.DAUGHTER)) {
			confirms.addAll(PeopleMap.getInstance().getAllRelativesOfType(id, RelationshipDTO.SPOUCE));			
		} 
		
		// Set the relationship to other. This is the relation ship of the existing relative to the newly added person
		// For example, if a Father is being added, and there exists one or more siblings, the relationship to other in 
		// this case would be the relationship of the sibling to the father, which would be child relationship
		
		for (TreeLeaf confirm : confirms) {
			if (relationship.equals(RelationshipDTO.FATHER) || relationship.equals(RelationshipDTO.MOTHER)) {
				if (confirm.relationship.equals(RelationshipDTO.SIBLING)) {
					confirm.setRelationshipToOther(RelationshipDTO.CHILD);
				} else if (confirm.relationship.equals(RelationshipDTO.PARENT)) {
					confirm.setRelationshipToOther(RelationshipDTO.SPOUCE);
				} 
			} else if (relationship.equals(RelationshipDTO.BROTHER) || relationship.equals(RelationshipDTO.SISTER)) {
				if (confirm.relationship.equals(RelationshipDTO.SIBLING)) {
					confirm.setRelationshipToOther(RelationshipDTO.SIBLING);
				} else if (confirm.relationship.equals(RelationshipDTO.PARENT)) {
					confirm.setRelationshipToOther(RelationshipDTO.PARENT);
				}
			} else if (relationship.equals(RelationshipDTO.HUSBAND) || relationship.equals(RelationshipDTO.WIFE)) {
				if (confirm.relationship.equals(RelationshipDTO.CHILD)) {
					confirm.setRelationshipToOther(RelationshipDTO.CHILD);
				} 			
			} else if (relationship.equals(RelationshipDTO.SON) || relationship.equals(RelationshipDTO.DAUGHTER)) {
				if (confirm.relationship.equals(RelationshipDTO.SPOUCE)) {
					confirm.setRelationshipToOther(RelationshipDTO.PARENT);
				}			
			}
		}
		return confirms;
	}
}
