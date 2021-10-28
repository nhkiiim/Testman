package com.henh.testman.collections;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
public class CollectionRestController {

    private final CollectionService collectionService;

    @Autowired
    public CollectionRestController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

}
