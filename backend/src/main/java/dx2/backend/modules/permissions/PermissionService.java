package dx2.backend.modules.permissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import dx2.backend.modules.users.UserService;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PermissionService {

  @Autowired
  PermissionRepository permissionRepository;

  @Autowired
  UserService userService;

  public Page<PermissionEntity> findAllWithPagination(
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
    return permissionRepository.findByNameContainingIgnoreCaseOrTextContainingIgnoreCase(search, search, pageable);
  }

  public PermissionEntity get(Long id) {
    var permissionOptional = permissionRepository.findById(id);
    if (permissionOptional.isPresent()) {
      var permission = permissionOptional.get();
      return permission;
    } else {
      throw new EntityNotFoundException("Permission not found");
    }
  }

  public PermissionEntity create(PermissionEntity permission) {
    var logginUser = userService.getLoginUserInfo();
    permission.setLastUpdatedBy(logginUser);
    permissionRepository.saveAndFlush(permission);
    return permission;
  }

  public PermissionEntity update(Long id, PermissionEntity permission) {
    var updatedPermissionOptional = permissionRepository.findById(id);
    if (updatedPermissionOptional.isPresent()) {
      var logginUser = userService.getLoginUserInfo();
      var updatedPermission = updatedPermissionOptional.get();
      updatedPermission.setName(permission.getName());
      updatedPermission.setText(permission.getText());
      updatedPermission.setLastUpdatedBy(logginUser);
      permissionRepository.saveAndFlush(updatedPermission);
      return updatedPermission;
    } else {
      throw new EntityNotFoundException("Permission not found");
    }
  }

  public void softDelete(Long id) {
    var permission = this.get(id);
    var logginUser = userService.getLoginUserInfo();
    permission.setLastUpdatedBy(logginUser);
    permissionRepository.saveAndFlush(permission);
    permissionRepository.delete(permission);
  }
}
