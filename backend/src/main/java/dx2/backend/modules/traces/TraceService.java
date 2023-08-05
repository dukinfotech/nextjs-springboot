package dx2.backend.modules.traces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TraceService {
  @Autowired
  TraceRepository traceRepository;

  public Page<TraceEntity> findAllWithPagination(
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
    return traceRepository
        .findByTableNameContainingIgnoreCaseOrOperationContainingIgnoreCase(search,
            search, pageable);
  }
}
