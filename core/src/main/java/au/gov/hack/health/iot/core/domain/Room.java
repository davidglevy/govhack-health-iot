package au.gov.hack.health.iot.core.domain;

import java.util.List;

public class Room {

	private String hospitalId;
	
	private String floorId;
	
	private String localId;
	
	List<Point> corners;

	public String getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(String hospitalId) {
		this.hospitalId = hospitalId;
	}

	public String getFloorId() {
		return floorId;
	}

	public void setFloorId(String floorId) {
		this.floorId = floorId;
	}

	public String getLocalId() {
		return localId;
	}

	public void setLocalId(String localId) {
		this.localId = localId;
	}

	public List<Point> getCorners() {
		return corners;
	}

	public void setCorners(List<Point> corners) {
		this.corners = corners;
	}
	
	
	
}
