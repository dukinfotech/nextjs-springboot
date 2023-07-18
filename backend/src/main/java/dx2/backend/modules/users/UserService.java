package dx2.backend.modules.users;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  @Order(3)
  @EventListener
  public void seed(ContextRefreshedEvent event) {
    if (userRepository.count() == 0) {
      var now = LocalDateTime.now();
      var newUser = new UserEntity();
      newUser.setFirstName("Duc");
      newUser.setLastName("Doan");
      newUser.setEmail("dukinfotech@gmail.com");
      var strength = 10;
      var bcryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
      newUser.setHashedPassword(bcryptPasswordEncoder.encode("@Haiphong888"));
      newUser.setCreatedAt(now);
      newUser.setUpdatedAt(now);

      userRepository.saveAndFlush(newUser);
    }
  }

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }
}
