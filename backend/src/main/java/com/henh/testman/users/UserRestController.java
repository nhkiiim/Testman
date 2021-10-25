package com.henh.testman.users;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.henh.testman.utils.JwtTokenUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserRestController {

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

//    private final Jwt jwt;
//
//    private final AuthenticationManager authenticationManager;
//
//    public UserRestController(Jwt jwt, AuthenticationManager authenticationManager, UserService userService) {
//        this.jwt = jwt;
//        this.authenticationManager = authenticationManager;
//        this.userService = userService;
//    }
//
//    @PostMapping(path = "login")
//    public ApiResult<LoginResult> login(
//            @Valid @RequestBody LoginRequest request
//    ) throws UnauthorizedException {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new JwtAuthenticationToken(request.getPrincipal(), request.getCredentials())
//            );
//            final User user = (User) authentication.getDetails();
//            final String token = user.newJwt(
//                    jwt,
//                    authentication.getAuthorities().stream()
//                            .map(GrantedAuthority::getAuthority)
//                            .toArray(String[]::new)
//            );
//            return success(new LoginResult(token, user));
//        } catch (AuthenticationException e) {
//            throw new UnauthorizedException(e.getMessage(), e);
//        }
//    }
//
//    @GetMapping(path = "me")
//    public ApiResult<UserDto> me(
//            // JwtAuthenticationTokenFilter 에서 JWT 값을 통해 사용자를 인증한다.
//            // 사용자 인증이 정상으로 완료됐다면 @AuthenticationPrincipal 어노테이션을 사용하여 인증된 사용자 정보(JwtAuthentication)에 접근할 수 있다.
//            @AuthenticationPrincipal JwtAuthentication authentication
//    ) {
//        return success(
//                userService.findById(authentication.id)
//                        .map(UserDto::new)
//                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + authentication.id))
//        );
//    }

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
        String userId = loginInfo.getUserId();
        String password = loginInfo.getPassword();

        User user = null;
        try{
            user=userService.getUserByUserId(userId);
        }catch(TokenExpiredException e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "세션이 만료되었습니다."));
        }catch (Forbidden e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "접근권한이 없습니다."));
        }catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "존재하지 않는 계정입니다."));
        }
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if(passwordEncoder.matches(password, user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(UserLoginPostRes.of(200, "로그인 완.", JwtTokenUtil.getToken(userId)));
        }
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        else if(!passwordEncoder.matches(password, user.getPassword()) ) {
            // 유효한 패스워드가 아닌 경우, 잘못된 비밀번호로 응답.(액세스 토큰을 포함하여 응답값 전달)
            System.out.println(password+" "+user.getPassword());
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "잘못된 비밀번호 입니다."));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
    }
}