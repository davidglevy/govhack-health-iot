package au.gov.hack.health.iot.core.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.categories.Category;

import au.gov.dhs.tcsi.core.test.HBaseTest;
import au.gov.hack.health.iot.core.domain.Person;
import au.gov.hack.health.iot.core.factory.BeanFactory;

import static org.junit.Assert.*;

@Category(HBaseTest.class)
public class HBaseProviderDaoITCase {

	private static final Logger logger = Logger.getLogger(HBaseProviderDaoITCase.class);

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
			if (!def.getId().startsWith("test")) {
				// Skip non-test ones.
				continue;
			}
			logger.info("Deleting provider with Id [" + def.getId() + "]");
			target.deleteHard(def.getId());
		}
		defs = target.getAll();
		assertTrue(defs.isEmpty());
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
		
		assertEquals(3, results.size());

		for (Person p : results) {
			logger.info("We found [" + p + "]");
		}

	}
}
