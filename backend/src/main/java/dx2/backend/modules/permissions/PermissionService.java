package dx2.backend.modules.permissions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import dx2.backend.modules.roles.RoleRepository;

@Service
public class PermissionService {

  @Autowired
  PermissionRepository permissionRepository;

  @Autowired
  RoleRepository roleRepository;

  @Order(2)
  @EventListener
  public void seed(ContextRefreshedEvent event) {
    if (permissionRepository.count() == 0) {
      var now = LocalDateTime.now();
      var permissionNames = new ArrayList<String>();
      permissionNames.add("list_role");
      permissionNames.add("create_role");
      permissionNames.add("read_role");
      permissionNames.add("update_role");
      permissionNames.add("delete_role");
      permissionNames.add("list_permission");
      permissionNames.add("create_permission");
      permissionNames.add("read_permission");
      permissionNames.add("update_permission");
      permissionNames.add("delete_permission");
      permissionNames.add("list_user");
      permissionNames.add("create_user");
      permissionNames.add("read_user");
      permissionNames.add("update_user");
      permissionNames.add("delete_user");

      var newPermissions = new ArrayList<PermissionEntity>();
      for (var permissionName : permissionNames) {
        var newPermission = new PermissionEntity();
        newPermission.setName(permissionName);
        newPermission.setCreatedAt(now);
        newPermission.setUpdatedAt(now);
        newPermissions.add(newPermission);
      }

      permissionRepository.saveAllAndFlush(newPermissions);
    }
  }
}
