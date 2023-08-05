package dx2.backend.modules.traces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraceRepository extends JpaRepository<TraceEntity, Long> {
  Page<TraceEntity> findByTableNameContainingIgnoreCaseOrOperationContainingIgnoreCase(
      String search1, String search2,
      Pageable pageable);
}