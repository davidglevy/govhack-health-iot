package au.gov.hack.health.iot.stub;

import org.springframework.stereotype.Component;

import au.gov.hack.health.iot.core.domain.Floor;
import au.gov.hack.health.iot.core.services.FloorService;

@Component
public class FloorServiceStub implements FloorService {

	@Override
	public Floor get(String id) {
		Floor f = new Floor();
		
		return f;
	}
	
}
