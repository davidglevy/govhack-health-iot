package au.gov.hack.health.iot.core.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.categories.Category;

import au.gov.hack.health.iot.core.domain.Person;
import au.gov.hack.health.iot.core.factory.BeanFactory;
import au.gov.hack.health.iot.core.test.HBaseTest;

import static org.junit.Assert.*;

@Category(HBaseTest.class)
public class HBasePersonDaoITCase {

	private static final Logger logger = Logger.getLogger(HBasePersonDaoITCase.class);

	HBasePersonDao target;

	@Before
	public void setup() {
		target = BeanFactory.get().getBeanByClass(HBasePersonDao.class);
		if (target == null) {
			throw new RuntimeException("Target class is null");
		}

		logger.info("Removing existing rows");

		List<Person> defs = target.getAll();
		for (Person def : defs) {
			if (def.getId().startsWith("test")) {
				logger.info("Deleting provider with Id [" + def.getId() + "]");
				target.deleteHard(def.getId());
			}
		}
		defs = target.getAll();
	}

	@Test
	public void testPersistAndRetrieve() {

		Person p1 = new Person();
		p1.setId("test-1");
		p1.setEmail("213412341234");
		p1.setName("Test Person 1");

		target.persist(p1);

		List<Person> results = target.getAll();
		logger.info("There were [" + results.size() + "]");
		
		for (Person p : results) {
			logger.info("We found [" + p + "]");
		}

	}
	
	@Test
	public void testSerialWrites() {

		long startTime = System.currentTimeMillis();
		
		// 5 minutes
		long endTime = startTime + (60 * 1000 * 5);

		int personCount = 0;
		int personCountPerSecond = 0;
		int numSecondsPassed = 0;
		
		long lastSecond = startTime;
		
		ArrayList<Integer> countPerSecond = new ArrayList<>();
		
		while (System.currentTimeMillis() < endTime) {
			long current = System.currentTimeMillis();
			if (lastSecond + 1000 < current) {
				// We have seen a second elapse.
				logger.info("Seconds progressed ["+numSecondsPassed+"] and count is ["+personCount+"]");
				countPerSecond.add(personCountPerSecond);
				numSecondsPassed++;
				// Increment the last second millis.
				lastSecond += 1000;
			}
			
			Person p1 = new Person();
			
			
			p1.setId("test-" + current);
			p1.setEmail("current");
			p1.setName("Test Person " + personCount);

			target.persist(p1);
			personCount++;
			personCountPerSecond++;
			
		}
		
		logger.info("There were [" + personCount + "] created");
		
		
		for (int i = 0; i < countPerSecond.size(); i++) {
			String second = StringUtils.leftPad(Integer.toString(i), 3);
			String count = StringUtils.leftPad(Integer.toString(countPerSecond.get(i)), 3);
			System.out.println(second + "," + count);
		}

	}

}
