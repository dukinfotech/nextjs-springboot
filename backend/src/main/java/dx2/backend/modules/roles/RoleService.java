package dx2.backend.modules.roles;

import java.time.LocalDateTime;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

  @Autowired
  RoleRepository roleRepository;

  @Order(1)
  @EventListener
  public void seed(ContextRefreshedEvent event) {
    if (roleRepository.count() == 0) {
      var now = LocalDateTime.now();
      var roleNames = new ArrayList<String>();
      roleNames.add("Super Admin");
      roleNames.add("admin");
      roleNames.add("user");

      var newRoles = new ArrayList<RoleEntity>();
      for (var roleName : roleNames) {
        var newRole = new RoleEntity();
        newRole.setName(roleName);
        newRole.setCreatedAt(now);
        newRole.setUpdatedAt(now);
        newRoles.add(newRole);
      }

      roleRepository.saveAllAndFlush(newRoles);
    }
  }
}
