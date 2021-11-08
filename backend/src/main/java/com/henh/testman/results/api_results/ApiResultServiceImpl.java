package com.henh.testman.results.api_results;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.tabs.Tab;
import com.henh.testman.tabs.TabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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
        ResponseEntity<Map> resultMap = apiTest(apiInsertReq);

        Map<String, Object> body = new HashMap<>();
        Map<String, String> headers = new HashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        String bodyStr = mapper.writeValueAsString(resultMap.getBody());
        String headerStr = mapper.writeValueAsString(resultMap.getHeaders());

        System.out.println(bodyStr);
        System.out.println(headerStr);

        Tab tab = tabRepository.findBySeq(apiInsertReq.getTabSeq())
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + apiInsertReq.getTabSeq()));
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

    public ResponseEntity<Map> apiTest(ApiInsertReq apiInsertReq) {
        ResponseEntity<Map> resultMap = null;
        try {
            String url = apiInsertReq.getAddress() + apiInsertReq.getPath();
            UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();

            HttpHeaders headers = new HttpHeaders();

            MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
            params.add("userId", "ssafy17");
            params.add("password", "1234");
            params.add("email", "ssafy@naver.com");

            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(params, headers);

            resultMap = restTemplate.exchange(uri.toString(), HttpMethod.POST, request, Map.class);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("statusCode: " + e.getRawStatusCode());
            System.out.println(e.getStatusText());

        } catch (Exception e) {
            System.out.println("statusCode: 500");
            System.out.println("excpetion오류");

        }
        return resultMap;
    }

}
