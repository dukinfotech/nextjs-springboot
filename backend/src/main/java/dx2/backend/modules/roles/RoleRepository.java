package dx2.backend.modules.roles;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
  RoleEntity findOneByName(String name);

  List<RoleEntity> findByNameIn(List<String> names);
}
