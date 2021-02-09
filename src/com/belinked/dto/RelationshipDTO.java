package com.belinked.dto;

import com.belinked.model.Relationship;

public class RelationshipDTO {
	public static final String SPOUCE = "spouce";
	public static final String PARENT = "parent";
	public static final String CHILD = "child";
	public static final String SIBLING = "sibling";
	public static final String SELF = "self";
	
	public static final String WIFE = "Wife";
	public static final String HUSBAND = "Husband";
	public static final String FATHER = "Father";
	public static final String MOTHER = "Mother";
	public static final String SON = "Son";
	public static final String DAUGHTER = "Daughter";
	public static final String BROTHER = "Brother";
	public static final String SISTER = "Sister";
	
	public static final String MALE = "m";
	public static final String FEMALE = "f";
	
	private Long id;
	private Long id1;
	private Long id2;
	private String relationship;
	
	public RelationshipDTO(Long id1, Long id2, String relationship) {
		this.id1 = id1;
		this.id2 = id2;
		this.relationship = relationship;
	}
	
	public RelationshipDTO(Relationship r) {
		this.id = r.getId();
		this.id1 = r.getId1();
		this.id2 = r.getId2();
		this.relationship = r.getRelationship();
	}
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId1() {
		return id1;
	}
	public void setId1(Long id1) {
		this.id1 = id1;
	}
	public Long getId2() {
		return id2;
	}
	public void setId2(Long id2) {
		this.id2 = id2;
	}
	public String getRelationship() {
		return relationship;
	}
	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}
	
	
}
