package com.belinked.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.belinked.dto.HierarchyNode;
import com.belinked.dto.PeopleMap;
import com.belinked.dto.PersonDTO;


@Controller
@RequestMapping("/userHierarchy")
public class HierarchyController {
	
	@RequestMapping(value="/{id}", method = RequestMethod.GET)
	public @ResponseBody HierarchyNode getUserHierrachy(@PathVariable Long id) {
		
		PersonDTO rp = PeopleMap.getInstance().getPersonById(new Long(1));
		HierarchyNode rn = new HierarchyNode();
		rn.setInfo(rp);
		
		
		PersonDTO cp1 = generateTestNode(new Long(2));
		HierarchyNode cn1 = new HierarchyNode();
		cn1.setInfo(cp1);
		
		rn.addChild(cn1);
		
		
		PersonDTO cp12 = generateTestNode(new Long(4));
		HierarchyNode cn12 = new HierarchyNode();
		cn12.setInfo(cp12);		
		cn1.addChild(cn12);		
		
		
		PersonDTO cp129 = generateTestNode(new Long(9));
		HierarchyNode cn129 = new HierarchyNode();
		cn129.setInfo(cp129);		
		cn12.addChild(cn129);
		
		PersonDTO cp1210 = generateTestNode(new Long(10));
		HierarchyNode cn1210 = new HierarchyNode();
		cn1210.setInfo(cp1210);		
		cn12.addChild(cn1210);
		
		PersonDTO cp13 = generateTestNode(new Long(5));
		HierarchyNode cn13 = new HierarchyNode();
		cn13.setInfo(cp13);		
		cn1.addChild(cn13);
		
		PersonDTO cp14 = generateTestNode(new Long(6));
		HierarchyNode cn14 = new HierarchyNode();
		cn14.setInfo(cp14);		
		cn1.addChild(cn14);
		
		PersonDTO cp2 = generateTestNode(new Long(3));
		HierarchyNode cn2 = new HierarchyNode();
		cn2.setInfo(cp2);
		
		rn.addChild(cn2);
		
		PersonDTO cp112 = generateTestNode(new Long(12));
		HierarchyNode cn112 = new HierarchyNode();
		cn112.setInfo(cp112);		
		cn2.addChild(cn112);
		
		
		PersonDTO cp21 = generateTestNode(new Long(7));
		HierarchyNode cn21 = new HierarchyNode();
		cn21.setInfo(cp21);		
		cn2.addChild(cn21);
		
		PersonDTO cp212 = generateTestNode(new Long(8));
		HierarchyNode cn212 = new HierarchyNode();
		cn212.setInfo(cp212);		
		cn21.addChild(cn212);
		
		
		PersonDTO cp213 = generateTestNode(new Long(11));
		HierarchyNode cn213 = new HierarchyNode();
		cn213.setInfo(cp213);		
		cn21.addChild(cn213);
		
		return rn;
				
	}
	
	private PersonDTO generateTestNode(Long id) {
		PersonDTO p = new PersonDTO();
		p.setId(new Long(id));
		p.setfName(id.toString());
		p.setlName("");
		p.setSex("m");
		p.setSource(id.toString() + ".png");
		return p;
	}
}

