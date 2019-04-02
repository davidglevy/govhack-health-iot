package au.gov.hack.health.iot.core.dao;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Ignore;
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
			if (def.getId().contains("-test")) {
				logger.info("Deleting provider with Id [" + def.getId() + "]");
				target.deleteHard(def.getId());
			}
		}
		defs = target.getAll();
	}

	@Test
	@Ignore
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
	public void testReadPerformance() throws Exception {
		List<String> peopleIds = new ArrayList<>();
		
		logger.info("Creating people for exercise");
		int peopleToCreate = 1000000;
		int percentComplete = 0;
		
		long start = System.currentTimeMillis();
		
		for (int i = 0; i < peopleToCreate; i++) {
			String personId = StringUtils.leftPad(Integer.toString(i), 8, "0");
			personId = StringUtils.reverse(personId) + "-test";
			peopleIds.add(personId);
			
			Person p1 = new Person();
			
			p1.setId(personId);
			p1.setEmail("current@blah.com");
			p1.setName("Test Person " + personId);
			
			target.persist(p1, 9000000L);
			
			int currentPercentComplete = (i * 100) / peopleToCreate;
			
			if (currentPercentComplete > percentComplete) {
				percentComplete = currentPercentComplete;
				logger.info("We are now [" + StringUtils.leftPad(Integer.toString(percentComplete), 3) + "%] complete, created [" + i + "] people");
			}
		}
		
		long end = System.currentTimeMillis();
		long duration = end - start;
		
		logger.info("Created [" + peopleToCreate + "] in [" + (duration / 1000) + "s].");
		
		logger.info("Sleeping for 60 seconds to give system time to settle after writes");
		Thread.sleep(60 * 1000);
		
		logger.info("Now performing randomized queries with shuffle on person ids");
		Collections.shuffle(peopleIds);
		
		start = System.currentTimeMillis();
		
		for (int i = 0; i < peopleToCreate; i++) {
			Person p = target.get(peopleIds.get(i));
			if (i % 1000 == 0) {
				logger.info("On lookup [" + StringUtils.leftPad(Integer.toString(i), 8) + "], Found [" + p.getId() + "]");
			}
		}

		end = System.currentTimeMillis();

		duration = end - start;
		
		logger.info("Queried [" + peopleToCreate + "] by key in random order in [" + (duration / 1000) + "s].");

	}
	
	
	@Test
	@Ignore
	public void testSerialWrites() throws Exception {

		logger.info("Sleeping 1 minute to allow system to wait for expiry of elements");
		Thread.sleep(60000);
		
		
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
			
			
			p1.setId(StringUtils.reverse(Long.toString(current)) + "-test");
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

	@Test
	@Ignore
	public void testSerialBulkWrites10() throws Exception {

		logger.info("Sleeping 1 minute to allow system to wait for expiry of elements");
		Thread.sleep(60000);
		
		
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

			List<Person> people = new ArrayList<>();
			
			for (int i = 0; i < 10; i++) {
				Person p1 = new Person();
				p1.setId(StringUtils.reverse(Long.toString(current)) + "-test-" + i);
				p1.setEmail("current");
				p1.setName("Test Person " + personCount);
				people.add(p1);
			}
			target.persist(people);
			personCount += 10;
			personCountPerSecond += 10;
			
		}
		
		logger.info("There were [" + personCount + "] created");
		
		
		for (int i = 0; i < countPerSecond.size(); i++) {
			String second = StringUtils.leftPad(Integer.toString(i), 3);
			String count = StringUtils.leftPad(Integer.toString(countPerSecond.get(i)), 3);
			System.out.println(second + "," + count);
		}

	}

	@Test
	@Ignore
	public void testSerialBulkWrites100() throws Exception {

		logger.info("Sleeping 1 minute to allow system to wait for expiry of elements");
		Thread.sleep(60000);
		
		
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

			List<Person> people = new ArrayList<>();
			
			int batchSize = 100;
			
			for (int i = 0; i < batchSize; i++) {
				Person p1 = new Person();
				p1.setId(StringUtils.reverse(Long.toString(current)) + "-test-" + i);
				p1.setEmail("current");
				p1.setName("Test Person " + personCount);
				people.add(p1);
			}
			target.persist(people);
			personCount += batchSize;
			personCountPerSecond += batchSize;
			
		}
		
		logger.info("There were [" + personCount + "] created");
		
		
		for (int i = 0; i < countPerSecond.size(); i++) {
			String second = StringUtils.leftPad(Integer.toString(i), 3);
			String count = StringUtils.leftPad(Integer.toString(countPerSecond.get(i)), 3);
			System.out.println(second + "," + count);
		}

	}

}
