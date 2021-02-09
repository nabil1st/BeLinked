package com.belinked.dto;

import java.util.Date;

public class TreeLeaf {
	public Long id;
	public String source;
	public String name;
	public String fName;
	public String lName;
	public String relationship;
	public String relationship_detail;
	public String sex;
	public Date dob;
	public String relationshipToOther;
	
	public TreeLeaf() {}
	
	public TreeLeaf(Long id, String source, String name, String relationship, String relationship_detail, String sex) {
		this.id = id;
		this.source = source;
		this.relationship = relationship;
		this.relationship_detail = relationship_detail;
		this.sex = sex;
		this.name = name;
	}
	
	public TreeLeaf(PersonDTO person, String relationship) {
		this.id = person.getId();
		this.source = person.getSource();
		this.fName = person.getfName();
		this.lName = person.getlName();
		this.sex = person.getSex();
		this.dob = person.getDob();
		
		this.relationship = relationship;
		
		if (relationship.equals(RelationshipDTO.CHILD)) {
			if (this.sex.equals(RelationshipDTO.MALE)) {
				this.relationship_detail = RelationshipDTO.SON;
			} else if (this.sex.equals(RelationshipDTO.FEMALE)) {
				this.relationship_detail = RelationshipDTO.DAUGHTER;
			}
		} else if (relationship.equals(RelationshipDTO.PARENT)) {
			if (this.sex.equals(RelationshipDTO.MALE)) {
				this.relationship_detail = RelationshipDTO.FATHER;
			} else if (this.sex.equals(RelationshipDTO.FEMALE)) {
				this.relationship_detail = RelationshipDTO.MOTHER;
			}
		} else if (relationship.equals(RelationshipDTO.SPOUCE)) {
			if (this.sex.equals(RelationshipDTO.MALE)) {
				this.relationship_detail = RelationshipDTO.HUSBAND;
			} else if (this.sex.equals(RelationshipDTO.FEMALE)) {
				this.relationship_detail = RelationshipDTO.WIFE;
			}
		} else if (relationship.equals(RelationshipDTO.SIBLING)) {
			if (this.sex.equals(RelationshipDTO.MALE)) {
				this.relationship_detail = RelationshipDTO.BROTHER;
			} else if (this.sex.equals(RelationshipDTO.FEMALE)) {
				this.relationship_detail = RelationshipDTO.SISTER;
			}
		}
				
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getName() {
		if (name != null) {
			return name;
		} else {
			return fName + " " + lName;
		}
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRelationship() {
		return relationship;
	}
	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}
	public String getRelationship_detail() {
		return relationship_detail;
	}
	public void setRelationship_detail(String relationship_detail) {
		this.relationship_detail = relationship_detail;
		if (relationship_detail.equals("Father") || relationship_detail.equals("Mother")) {
			relationship = "parent";
		} else if (relationship_detail.equals("Son") || relationship_detail.equals("Daughter")) {
			relationship = "child";
		} else if (relationship_detail.equals("Brother") || relationship_detail.equals("Sister")) {
			relationship = "sibling";
		} else if (relationship_detail.equals("Wife") || relationship_detail.equals("Husband")) {
			relationship = "spouce";
		}
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getRelationshipToOther() {
		return relationshipToOther;
	}

	public void setRelationshipToOther(String relationshipToOther) {
		this.relationshipToOther = relationshipToOther;
	}	
	
	
	
	
	
}
