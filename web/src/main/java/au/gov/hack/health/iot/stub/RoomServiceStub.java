package au.gov.hack.health.iot.stub;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import au.gov.hack.health.iot.core.domain.Floor;
import au.gov.hack.health.iot.core.domain.Point;
import au.gov.hack.health.iot.core.domain.Room;
import au.gov.hack.health.iot.core.services.FloorService;
import au.gov.hack.health.iot.core.services.RoomService;

@Component
public class RoomServiceStub implements RoomService {

	@Override
	public Room get(String id) {
		Room f = new Room();
		f.setFloorId("0");
		f.setHospitalId("aaa");
		f.setId("1");
		f.setName("A");
		
		List<Point> corners = new ArrayList<>();
		corners.add(new Point(130, 130, 0));
		corners.add(new Point(160, 130, 0));
		corners.add(new Point(160, 160, 0));
		corners.add(new Point(130, 130, 0));		
		f.setCorners(corners);
		
		return f;
	}
	
}
