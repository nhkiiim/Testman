package com.henh.testman.results.api_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.tabs.Tab;
import com.henh.testman.tabs.TabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class ApiResultServiceImpl implements ApiResultService {

    private final ApiResultRepository apiResultRepository;

    private final RestTemplate restTemplate;

    private final TabRepository tabRepository;

    @Autowired
    public ApiResultServiceImpl(ApiResultRepository apiResultRepository,
                                RestTemplate restTemplate, TabRepository tabRepository) {
        this.apiResultRepository = apiResultRepository;
        this.restTemplate = restTemplate;
        this.tabRepository = tabRepository;
    }

    @Override
    public Optional<ApiResults> selectApi(Long tapSeq) {
        checkNotNull(tapSeq, "tabSeq must be provided");
        Tab tab = tabRepository.findBySeq(tapSeq)
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + tapSeq));

        apiTest(tab);
        return Optional.empty();
    }

    @Override
    public Long deleteApi(Long tapSeq) {
        checkNotNull(tapSeq, "tabSeq must be provided");
        ApiResults apiResults = apiResultRepository.findByTabSeq(tapSeq)
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + tapSeq));

        apiResultRepository.delete(apiResults);
        return apiResults.getTabSeq();
    }

    //문제 1. url 가져오기
    //문제 2. 쿼리있는 경우는 ..? -> path에 포함으로? 쿼리 지정해주는 함수 따로 있음
    //문제 3. delete update는 반환해주는지 모르겠다(해보자)
    //문제 4. 헤더 입력 for문 돌리기..? string으로 입력 받는게 맞나욥..
    //문제 5. prams도 마찬가지..
    public void apiTest(Tab tab){
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
            HttpEntity<String> request;
            if (tab.getHeaders() != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                request = new HttpEntity<>("Hello World!", headers);
            }

            String url = "";
            UriComponents uri = UriComponentsBuilder.fromHttpUrl(url + tab.getPath());


            String empEntity = restTemplate.exchange(BASE_URL + "/exchange/employee/{id}", HttpMethod.GET, request, Employee.class, 50);

        }catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("body"  , e.getStatusText());
            System.out.println("오류");
            System.out.println(e.toString());

        } catch (Exception e) {
            result.put("statusCode", "500");
            result.put("body"  , "excpetion오류");
            System.out.println(e.toString());
        }
    }

}
