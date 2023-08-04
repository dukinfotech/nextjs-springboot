package dx2.backend.modules.users;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }

  public UserEntity getLoginUserInfo() {
    val authentication = SecurityContextHolder.getContext().getAuthentication();
    val email = authentication.getName();
    var userOptional = userRepository.findOneByEmail(email);

    if (userOptional.isPresent()) {
      var user = userOptional.get();
      return user;
    } else {
      throw new EntityNotFoundException("User not found");
    }
  }
}
