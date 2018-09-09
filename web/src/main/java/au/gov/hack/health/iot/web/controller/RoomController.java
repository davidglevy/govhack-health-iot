package au.gov.hack.health.iot.web.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import au.gov.hack.health.iot.core.domain.Floor;
import au.gov.hack.health.iot.core.domain.Person;
import au.gov.hack.health.iot.core.domain.Room;
import au.gov.hack.health.iot.core.services.FloorService;
import au.gov.hack.health.iot.core.services.PersonService;
import au.gov.hack.health.iot.core.services.RoomService;

@RestController
public class RoomController {

	private static final Logger logger = Logger.getLogger(RoomController.class);
	
	@Autowired
	private RoomService service;
	
	@GetMapping("/room/{id}")
	public Room getRoom(@PathVariable("id") String roomId) {
		return service.get(roomId);
	}
	
	@GetMapping("/rooms/{floorId}")
	public List<Room> getRooms(@PathVariable("floorId") String floorId) {
		return service.allForFloor(floorId);
	}
}
