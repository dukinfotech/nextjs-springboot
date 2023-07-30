package dx2.backend.modules.permissions;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<PermissionEntity, Long> {
  Page<PermissionEntity> findByNameContainingIgnoreCaseOrTextContainingIgnoreCase(
      String search1, String search2,
      Pageable pageable);
}
