package dx2.backend.modules.roles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
  RoleEntity findOneByName(String name);

  List<RoleEntity> findByNameIn(List<String> names);

  Page<RoleEntity> findByNameContainingIgnoreCaseOrTextContainingIgnoreCase(
      String search1, String search2,
      Pageable pageable);
}
