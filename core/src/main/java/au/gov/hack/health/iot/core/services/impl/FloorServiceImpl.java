package au.gov.hack.health.iot.core.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import au.gov.hack.health.iot.core.dao.HBaseFloorDao;
import au.gov.hack.health.iot.core.domain.Floor;
import au.gov.hack.health.iot.core.services.FloorService;

/**
 * Temporary service which will be deprecated in favour of the HospitalService.
 * 
 * @author davidlevy
 *
 */
@Component
public class FloorServiceImpl implements FloorService {

	@Autowired
	private HBaseFloorDao floorDao;
	
	@Override
	public Floor get(String id) {
		return floorDao.get(id);
	}

	
	
}
