package dx2.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    // Never disable CSRF protection while leaving session management enabled! Doing
    // so will open you up to a Cross-Site Request Forgery attack
    http.csrf(csrf -> csrf.disable()) // Disable Cross-Site Request Forgery (CSRF)
        // The user should be authenticated for any request in the application
        .authorizeHttpRequests(requests -> requests.anyRequest().authenticated())
        // Spring Security will never create an HttpSession and it will never use it to
        // obtain the Security Context
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // Spring Security’s HTTP Basic Authentication support is enabled by default
        .httpBasic(Customizer.withDefaults());

    return http.build();
  }
}
