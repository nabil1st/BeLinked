package com.belinked.dto;

import java.util.ArrayList;
import java.util.List;

public class HierarchyNode {
	public PersonDTO info;
	public List<HierarchyNode> children;
	
	public HierarchyNode(){
		children = new ArrayList<HierarchyNode>();
	}

	public PersonDTO getInfo() {
		return info;
	}

	public void setInfo(PersonDTO info) {
		this.info = info;
	}

	public List<HierarchyNode> getChildren() {
		return children;
	}

	public void setChildren(List<HierarchyNode> children) {
		this.children = children;
	}
	
	public void addChild(HierarchyNode child) {
		this.children.add(child);
	}

}
