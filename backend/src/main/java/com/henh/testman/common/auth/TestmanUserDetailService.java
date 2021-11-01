package com.henh.testman.common.auth;

import com.henh.testman.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class TestmanUserDetailService implements UserDetailsService {

	private final UserService userService;

	@Autowired
	public TestmanUserDetailService(UserService userService) {
		this.userService = userService;
	}
	
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		return userService.selectUser(id)
			.map(TestmanUserDetails::new)
			.get();
    }
}
