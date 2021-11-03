package com.henh.testman.results.load_results;

import lombok.ToString;
import org.apache.jmeter.samplers.SampleResult;

import java.text.DecimalFormat;

@ToString
public class MySummariser {

    private final DecimalFormat dfDouble = new DecimalFormat("#0.0");

    private final DecimalFormat errorFormatter = new DecimalFormat("#0%");

    private long counter;

    private long runningSum;

    private long max;

    private long min;

    private long errorCount;

    private long startTime;

    private long endTime;

    private long totalReceiveBytes;

    private long totalSentBytes;

    public MySummariser() {
        init();
    }

    private void init() {
        counter = 0L;
        runningSum = 0L;
        max = Long.MIN_VALUE;
        min = Long.MAX_VALUE;
        errorCount = 0L;
        startTime = System.currentTimeMillis();
        endTime = startTime;
    }

    public void clear() {
        init();
    }

    public void addSample(SampleResult res) {
        counter += res.getSampleCount();
        errorCount += res.getErrorCount();
        totalReceiveBytes += res.getBytesAsLong();
        totalSentBytes += res.getSentBytes();

        long aTimeInMillis = res.getTime();
        runningSum += aTimeInMillis;
        if (aTimeInMillis > max) {
            max = aTimeInMillis;
        }
        if (aTimeInMillis < min) {
            min = aTimeInMillis;
        }
        endTime = System.currentTimeMillis();
    }

    public long getNumSamples() {
        return counter;
    }

    public long getElapsed() {
        if (counter == 0) {
            return 0;
        }
        return endTime - startTime;
    }

    public double getRate() {
        long howLongRunning = getElapsed();

        if (howLongRunning == 0) {
            return Double.MAX_VALUE;
        }
        return (double) counter / howLongRunning * 1000.0;
    }

    public long getAverage() {
        if (counter == 0) {
            return 0;
        }
        return runningSum / counter;
    }

    public String getReceivePerSec() {
        long howLongRunning = getElapsed();

        if (howLongRunning == 0) {
            return null;
        }
        return dfDouble.format((double) totalReceiveBytes / howLongRunning);
    }

    public String getSentPerSec() {
        long howLongRunning = getElapsed();

        if (howLongRunning == 0) {
            return null;
        }
        return dfDouble.format((double) totalSentBytes / howLongRunning);
    }

    public long getErrorCount() {
        return errorCount;
    }

    public String getErrorPercentageString() {
        return errorFormatter.format(getErrorPercentage() * 100);
    }

    public double getErrorPercentage() {
        if (counter == 0) {
            return 0.0;
        }
        return  (double) errorCount / (double) counter;
    }

    public long getMax() {
        return max;
    }

    public long getMin() {
        return min;
    }

    public void setEndTime() {
        endTime = System.currentTimeMillis();
    }

}
