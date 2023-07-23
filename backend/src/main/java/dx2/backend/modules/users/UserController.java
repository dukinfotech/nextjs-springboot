package dx2.backend.modules.users;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  UserService userService;

  @GetMapping
  ResponseEntity<List<UserEntity>> findAll() {
    var users = userService.findAll();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/info")
  ResponseEntity<UserEntity> getLoginUserInfo() {
    var userOptional = userService.getLoginUserInfo();
    if (userOptional.isPresent()) {
      var user = userOptional.get();
      return ResponseEntity.ok(user);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
