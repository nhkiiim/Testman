package com.henh.testman.results.api_results;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.tabs.Tab;
import com.henh.testman.tabs.TabRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;
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
    public Optional<ApiResults> insertApi(ApiInsertReq apiInsertReq) throws JsonProcessingException {
        Tab tab = tabRepository.findBySeq(apiInsertReq.getTabSeq())
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + apiInsertReq.getTabSeq()));
        tab.updateByApi(apiInsertReq);

        System.out.println("tab 성공");
        ResponseEntity<Map> resultMap = apiTest(apiInsertReq);
        return saveApi(resultMap, apiInsertReq.getTabSeq());
    }

    @Override
    public Long deleteApi(Long tapSeq) {
        checkNotNull(tapSeq, "tabSeq must be provided");
        ApiResults apiResults = apiResultRepository.findByTabSeq(tapSeq)
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + tapSeq));

        apiResultRepository.delete(apiResults);
        return apiResults.getTabSeq();
    }

    public ResponseEntity<Map> apiTest(ApiInsertReq apiInsertReq) {
        ResponseEntity<Map> resultMap;
        try {
            System.out.println("테스트 시작");
            String url = apiInsertReq.getAddress() + apiInsertReq.getPath();
            UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();
            System.out.println(uri.toString());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            JSONObject request = new JSONObject();
            request.put("userId", "ssafy5");
            request.put("password", "1234");
            request.put("email", "ssafy@naver.com");

            HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);

            resultMap = restTemplate.exchange(uri.toString(), HttpMethod.POST, entity, Map.class);
            System.out.println("테스트결과");
            System.out.println(resultMap.toString());
            return resultMap;

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("실패 statusCode: " + e.getRawStatusCode());

        } catch (Exception e) {
            System.out.println("statusCode: 500");
            System.out.println("excpetion오류");

        }
        return null;
    }

    public Optional<ApiResults> saveApi(ResponseEntity<Map> resultMap, Long tabSeq){
        JSONObject bodyJson = new JSONObject(resultMap.getBody());
        JSONObject headerJson = new JSONObject(resultMap.getHeaders());

        int code = resultMap.getStatusCodeValue();
        Map<String, Object> body = new HashMap<>();
        Map<String, String> header = new HashMap<>();

        System.out.println("body-------------------------");
        for (String key : bodyJson.keySet()) {
            body.put(key, bodyJson.get(key));
            System.out.println("key: "+ key + " value: " + bodyJson.get(key));
        }

        System.out.println("header-------------------------");
        for (String key : headerJson.keySet()) {
            header.put(key, headerJson.get(key).toString());
            System.out.println("key: "+ key + " value: " + headerJson.get(key));
        }

        ApiResults apiResults =  apiResultRepository.findByTabSeq(tabSeq)
                .orElse(new ApiResults());
        apiResults.update(tabSeq, code, body, header);

        return Optional.of(
                apiResultRepository.save(apiResults)
        );
    }

}
