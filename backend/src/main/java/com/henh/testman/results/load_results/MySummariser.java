package com.henh.testman.results.load_results;

import lombok.ToString;
import org.apache.jmeter.samplers.SampleResult;

import java.text.DecimalFormat;

@ToString
public class MySummariser {

    private final DecimalFormat dfDouble = new DecimalFormat("#0.00");

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

    public void setEndTime() {
        endTime = System.currentTimeMillis();
    }

    // 샘플 수
    public long getNumSamples() {
        return counter;
    }

    // 총 응답시간
    public long getElapsed() {
        if (counter == 0) {
            return 0;
        }
        return endTime - startTime;
    }

    // 평균 응답시간
    public long getAverage() {
        if (counter == 0) {
            return 0;
        }
        return runningSum / counter;
    }

    // 최대 응답시간
    public long getMax() {
        return max;
    }

    // 최소 응답시간
    public long getMin() {
        return min;
    }

    // 처리량
    public String getThroughput() {
        long howLongRunning = getElapsed();

        if (howLongRunning == 0) {
            return dfDouble.format(Double.MAX_VALUE);
        }
        return dfDouble.format((double) counter / howLongRunning * 1000.0);
    }

    // 초당 받은 바이트
    public String getReceivePerSec() {
        long howLongRunning = getElapsed();

        if (howLongRunning == 0) {
            return null;
        }
        return dfDouble.format((double) totalReceiveBytes / howLongRunning);
    }

    // 초당 보낸 바이트
    public String getSentPerSec() {
        long howLongRunning = getElapsed();

        if (howLongRunning == 0) {
            return null;
        }
        return dfDouble.format((double) totalSentBytes / howLongRunning);
    }

    // 에러 횟수
    public long getErrorCount() {
        return errorCount;
    }

    // 에러율 (퍼센트)
    public String getErrorPercentageString() {
        return errorFormatter.format(getErrorPercentage() * 100);
    }

    // 에러율 (소수)
    public double getErrorPercentage() {
        if (counter == 0) {
            return 0.0;
        }
        return  (double) errorCount / (double) counter;
    }

}
