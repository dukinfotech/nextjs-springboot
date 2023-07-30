package dx2.backend.modules.permissions;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

  @Autowired
  PermissionRepository permissionRepository;

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

  public Optional<PermissionEntity> get(Long id) {
    var permission = permissionRepository.findById(id);
    return permission;
  }

  public PermissionEntity create(PermissionEntity permission) {
    permission.setCreatedAt(LocalDateTime.now());
    permission.setUpdatedAt(LocalDateTime.now());
    permissionRepository.saveAndFlush(permission);
    return permission;
  }

  public void softDelete(Long id) {
    permissionRepository.deleteById(id);
  }
}
