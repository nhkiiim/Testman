# TESTMAN

Testman에 오신 걸 환영합니다!

저희 Testman은 API 테스트와 부하 테스트 그리고 간단한 성능 테스트까지 종합적인 테스트가 가능합니다.

테스트는 Workspace별로 관리되어 한번의 URL 입력으로 다양한 테스트를 경험할 수 있어요!

## Getting Started

배포는 docker-compose로 이루어집니다. 다만 image 컨트롤을 위한 공유 폴더를 만들어야 합니다!

### Prerequisites

What things you need to install the software and how to install them

Backend :
```
- java version : 8
- jmeter version : 5.4.1
- gradle : 7.1.1
- prometheous
- grafana
```

Frontend :
```
- yarn version : 1.22.10
- npm version : 6.14.13
- react version : 17.0.2
- next version : 12.0.1
```

Database :
```
- mysql version : 8.0.26
    - url : [k5d202.p.ssafy.io](http://k5d202.p.ssafy.io/):3306
    - id : root
    - pw : d202
- redis version : alpine
```

### Installing

프로젝프를 pull 합니다.

```
git pull https://github.com/henh-testman/TESTMAN.git
```
Docker-compose 를 사용하세요!

```
docker-compose up
```

+ mysql, redis 스토리지가 추가로 필요합니다!

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)
* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)
* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)
* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)
* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)


See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
