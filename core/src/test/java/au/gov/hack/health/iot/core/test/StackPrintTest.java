package au.gov.hack.health.iot.core.test;

import org.junit.Test;

public class StackPrintTest {

	@Test
	public void runTest() {
		System.out.println("java.lang.NullPointerException\n\tat au.gov.dhs.tcsi.spark.processor.FirstConversionCallback.process(FirstConversionCallback.java:71)\n\tat au.gov.dhs.tcsi.spark.processor.FirstConversionCallback.process(FirstConversionCallback.java:25)\n\tat au.gov.dhs.tcsi.spark.util.SparkStreamingTemplate$1$1.call(SparkStreamingTemplate.java:325)\n\tat au.gov.dhs.tcsi.spark.util.SparkStreamingTemplate$1$1.call(SparkStreamingTemplate.java:302)\n\tat org.apache.spark.api.java.JavaRDDLike$$anonfun$foreachPartition$1.apply(JavaRDDLike.scala:219)\n\tat org.apache.spark.api.java.JavaRDDLike$$anonfun$foreachPartition$1.apply(JavaRDDLike.scala:219)\n\tat org.apache.spark.rdd.RDD$$anonfun$foreachPartition$1$$anonfun$apply$29.apply(RDD.scala:926)\n\tat org.apache.spark.rdd.RDD$$anonfun$foreachPartition$1$$anonfun$apply$29.apply(RDD.scala:926)\n\tat org.apache.spark.SparkContext$$anonfun$runJob$5.apply(SparkContext.scala:2064)\n\tat org.apache.spark.SparkContext$$anonfun$runJob$5.apply(SparkContext.scala:2064)\n\tat org.apache.spark.scheduler.ResultTask.runTask(ResultTask.scala:87)\n\tat org.apache.spark.scheduler.Task.run(Task.scala:108)\n\tat org.apache.spark.executor.Executor$TaskRunner.run(Executor.scala:338)\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)\n\tat java.lang.Thread.run(Thread.java:745)");
	}
	
}
