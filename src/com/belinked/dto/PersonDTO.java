package com.belinked.dto;

import java.util.Date;

import org.hibernate.validator.constraints.NotEmpty;

import com.belinked.model.Person;


public class PersonDTO {
	private Long id;
	private String source;
	
	@NotEmpty
	private String fName;
	
	@NotEmpty
	private String lName;
	
	@NotEmpty
	private String sex;
	
	
	private Date dob;
	
	private String email;
	
	private Integer isAccount = 0;
			
	
	public PersonDTO() {}
	
	public PersonDTO(Person person) {
		this.id = person.getId();
		this.source = person.getId().toString() + ".png";
		this.fName = person.getFirstName();
		this.lName = person.getLastName();
		this.sex = person.getSex();
		this.dob = person.getDob();
		this.email = person.getEmail();
		this.isAccount = person.getIsAccount();
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
		return fName + " " + lName;		
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


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Integer getIsAccount() {
		return isAccount;
	}


	public void setIsAccount(Integer isAccount) {
		this.isAccount = isAccount;
	}	
	
	
}
