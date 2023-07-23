package dx2.backend.modules.users;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.val;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }

  public Optional<UserEntity> getLoginUserInfo() {
    val authentication = SecurityContextHolder.getContext().getAuthentication();
    val email = authentication.getName();
    return userRepository.findOneByEmail(email);
  }
}
