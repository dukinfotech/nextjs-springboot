package dx2.backend.modules.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import dx2.backend.modules.users.UserService;
import jakarta.persistence.EntityNotFoundException;

@Service
public class RoleService {

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserService userService;

  public Page<RoleEntity> findAllWithPagination(
      String search,
      Integer page,
      Integer size,
      String sort,
      Boolean isAsc) {
    search = search.toLowerCase();
    Pageable pageable = null;
    if (isAsc) {
      pageable = PageRequest.of(page - 1, size, Sort.by(sort).ascending());
    } else {
      pageable = PageRequest.of(page - 1, size, Sort.by(sort).descending());
    }
    return roleRepository.findByNameContainingIgnoreCaseOrTextContainingIgnoreCase(search, search, pageable);
  }

  public RoleEntity get(Long id) {
    var roleOptional = roleRepository.findById(id);
    if (roleOptional.isPresent()) {
      var role = roleOptional.get();
      return role;
    } else {
      throw new EntityNotFoundException("Role not found");
    }
  }

  public RoleEntity create(RoleEntity role) {
    var logginUser = userService.getLoginUserInfo();
    role.setLastUpdatedBy(logginUser);
    roleRepository.saveAndFlush(role);
    return role;
  }

  public RoleEntity update(Long id, RoleEntity role) {
    var updatedRoleOptional = roleRepository.findById(id);
    if (updatedRoleOptional.isPresent()) {
      var logginUser = userService.getLoginUserInfo();
      var updatedRole = updatedRoleOptional.get();
      updatedRole.setName(role.getName());
      updatedRole.setText(role.getText());
      updatedRole.setLastUpdatedBy(logginUser);
      roleRepository.saveAndFlush(updatedRole);
      return updatedRole;
    } else {
      throw new EntityNotFoundException("Role not found");
    }
  }

  public void softDelete(Long id) {
    var role = this.get(id);
    var logginUser = userService.getLoginUserInfo();
    role.setLastUpdatedBy(logginUser);
    roleRepository.saveAndFlush(role);
    roleRepository.delete(role);
  }
}
