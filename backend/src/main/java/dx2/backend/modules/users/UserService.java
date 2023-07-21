package dx2.backend.modules.users;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  @Order(3)
  @EventListener
  public void seed(ContextRefreshedEvent event) {
    
  }

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }
}
