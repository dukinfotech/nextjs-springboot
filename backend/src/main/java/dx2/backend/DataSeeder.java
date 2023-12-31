package dx2.backend;

import dx2.backend.modules.permissions.PermissionEntity;
import dx2.backend.modules.permissions.PermissionRepository;
import dx2.backend.modules.roles.RoleEntity;
import dx2.backend.modules.roles.RoleRepository;
import dx2.backend.modules.users.UserEntity;
import dx2.backend.modules.users.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder {
  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PermissionRepository permissionRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @EventListener
  public void seed(ContextRefreshedEvent event) {
    var isSeededUsers = this.seedUsers();
    var isSeededRoles = this.seedRoles();
    var isSeededPermissions = this.seedPermissions();

    if (isSeededRoles.equals(true) && isSeededPermissions.equals(true) && isSeededUsers.equals(true)) {
      this.linkRolesWithPermissions();
      this.linkUsersWithRoles();
    }
  }

  private Boolean seedRoles() {
    if (roleRepository.count() == 0) {
      var roleNames = new ArrayList<String>();
      roleNames.add("Super Admin");
      roleNames.add("Admin");
      roleNames.add("User");
      var newRoles = new ArrayList<RoleEntity>();

      for (var roleName : roleNames) {
        var newRole = new RoleEntity();
        newRole.setName(roleName);
        newRole.setText(roleName);
        newRoles.add(newRole);
      }
      roleRepository.saveAllAndFlush(newRoles);

      return true;
    }

    return false;
  }

  private Boolean seedPermissions() {
    if (permissionRepository.count() == 0) {
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
      // permissionNames.add("delete_permission");
      permissionNames.add("list_user");
      permissionNames.add("create_user");
      permissionNames.add("read_user");
      permissionNames.add("update_user");
      permissionNames.add("delete_user");
      var newPermissions = new ArrayList<PermissionEntity>();

      for (var permissionName : permissionNames) {
        var newPermission = new PermissionEntity();
        newPermission.setName(permissionName);
        newPermission.setText(permissionName);
        newPermissions.add(newPermission);
      }

      permissionRepository.saveAllAndFlush(newPermissions);

      return true;
    }

    return false;
  }

  private Boolean seedUsers() {
    if (userRepository.count() == 0) {
      var newUser = new UserEntity();
      newUser.setFirstName("Duc");
      newUser.setLastName("Doan");
      newUser.setEmail("dukinfotech@gmail.com");
      newUser.setHashedPassword(this.passwordEncoder.encode("@Haiphong888"));

      userRepository.saveAndFlush(newUser);

      return true;
    }

    return false;
  }

  private void linkRolesWithPermissions() {
    var superAdminRole = roleRepository.findOneByName("Super Admin");
    var permissions = permissionRepository.findAll();
    superAdminRole.setPermissions(permissions);

    roleRepository.saveAndFlush(superAdminRole);
  }

  private void linkUsersWithRoles() {
    var users = userRepository.findAll();
    var superAdminRole = roleRepository.findOneByName("Super Admin");

    for (var user : users) {
      user.setRoles(Arrays.asList(superAdminRole));
    }

    userRepository.saveAllAndFlush(users);
  }
}
