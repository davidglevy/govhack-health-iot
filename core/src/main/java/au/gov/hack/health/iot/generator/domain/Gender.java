package au.gov.hack.health.iot.generator.domain;

public enum Gender {

	MALE("Male"),
	FEMALE("Female"),
	OTHER("Other");
	
	String longForm;
	
	private Gender(String longForm) {
		this.longForm = longForm;
	}

	public String getLongForm() {
		return longForm;
	}
	
	
}
