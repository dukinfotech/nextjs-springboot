package dx2.backend.modules.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }
}
