package com.henh.testman.results.api_results;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.henh.testman.common.errors.FailApiTestException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.histories.History;
import com.henh.testman.histories.HistoryRepository;
import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.tabs.Tab;
import com.henh.testman.tabs.TabRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class ApiResultServiceImpl implements ApiResultService {

    private final ApiResultRepository apiResultRepository;

    private final HistoryRepository historyRepository;

    private final RestTemplate restTemplate;

    private final TabRepository tabRepository;

    @Autowired
    public ApiResultServiceImpl(ApiResultRepository apiResultRepository,
                                RestTemplate restTemplate, TabRepository tabRepository, HistoryRepository historyRepository) {
        this.apiResultRepository = apiResultRepository;
        this.restTemplate = restTemplate;
        this.tabRepository = tabRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<ApiResults> insertApi(ApiInsertReq apiInsertReq) throws JsonProcessingException {
        Tab tab = tabRepository.findBySeq(apiInsertReq.getTabSeq())
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + apiInsertReq.getTabSeq()));
        tab.updateByApi(apiInsertReq);
        tabRepository.save(tab);
        historyRepository.save(new History(apiInsertReq));

        ResponseEntity<Map> resultMap = apiTest(apiInsertReq);
        return saveApi(resultMap, apiInsertReq.getTabSeq());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ApiResults> selectApi(Long tabSeq) {
        checkNotNull(tabSeq,"tabSeq must be provided");
        return apiResultRepository.findByTabSeq(tabSeq);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
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
            String url = apiInsertReq.getAddress() + apiInsertReq.getPath();
            UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();

            HttpHeaders headers = new HttpHeaders();
            //headers.setContentType(MediaType.APPLICATION_JSON);
            if(apiInsertReq.getHeaders() != null){
                for(Map.Entry<String,String> map : apiInsertReq.getHeaders().entrySet()){
                    headers.add(map.getKey(),map.getValue());
                }
            }

            JSONObject request = new JSONObject();
            if(apiInsertReq.getBody() != null){
                for(Map.Entry<String,Object> map : apiInsertReq.getBody().entrySet()){
                   request.put(map.getKey(),map.getValue());
                }
            }

            HttpMethod httpMethod;
            switch (apiInsertReq.getHttpMethod()){
                case "POST": httpMethod = HttpMethod.POST; break;
                case "PATCH": httpMethod = HttpMethod.PATCH; break;
                case "PUT": httpMethod = HttpMethod.PUT; break;
                case "DELETE": httpMethod = HttpMethod.DELETE; break;
                default: httpMethod = HttpMethod.GET; break;
            }

            HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
            resultMap = restTemplate.exchange(uri.toString(), httpMethod, entity, Map.class);
            return resultMap;

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new FailApiTestException("API TEST 실패 statusCode: " + e.getRawStatusCode());
        } catch (Exception e) {
            throw new FailApiTestException("API TEST 실패");
        }
    }

    public Optional<ApiResults> saveApi(ResponseEntity<Map> resultMap, Long tabSeq) throws JsonProcessingException {
        Integer code = resultMap.getStatusCodeValue();
        JSONObject headerJson = new JSONObject(resultMap.getHeaders());
        JSONObject bodyJson = new JSONObject(resultMap.getBody());

        String body = bodyJson.toString();
        String header = headerJson.toString();

        ApiResults apiResults = apiResultRepository.findByTabSeq(tabSeq)
                .orElse(new ApiResults());
        apiResults.update(tabSeq, code, body, header);

        return Optional.of(
                apiResultRepository.save(apiResults)
        );
    }

}
