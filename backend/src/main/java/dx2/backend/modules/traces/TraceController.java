package dx2.backend.modules.traces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/traces")
public class TraceController {
  @Autowired
  TraceService traceService;

  @GetMapping
  ResponseEntity<Page<TraceEntity>> findAllWithPagination(
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(defaultValue = "createdAt") String sort,
      @RequestParam(defaultValue = "false") Boolean isAsc) {
    var paginatedTraces = traceService.findAllWithPagination(search, page, size, sort, isAsc);
    return ResponseEntity.ok(paginatedTraces);
  }
}
