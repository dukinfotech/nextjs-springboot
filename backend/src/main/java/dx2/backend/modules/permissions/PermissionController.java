package dx2.backend.modules.permissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {
  @Autowired
  PermissionService permissionService;

  @GetMapping
  ResponseEntity<Page<PermissionEntity>> findAllWithPagination(
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(defaultValue = "createdAt") String sort,
      @RequestParam(defaultValue = "false") Boolean isAsc) {
    var paginatedPermissions = permissionService.findAllWithPagination(search, page, size, sort, isAsc);
    return ResponseEntity.ok(paginatedPermissions);
  }

  @GetMapping("{id}")
  ResponseEntity<PermissionEntity> get(@PathVariable Long id) {
    var permissionOptional = permissionService.get(id);
    if (permissionOptional.isPresent()) {
      var permission = permissionOptional.get();
      return ResponseEntity.ok(permission);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  ResponseEntity<PermissionEntity> create(@RequestBody PermissionEntity permission) {
    var newPermission = permissionService.create(permission);
    return ResponseEntity.ok(newPermission);
  }

  @DeleteMapping("{id}")
  ResponseEntity<Void> softDelete(@PathVariable Long id) {
    permissionService.softDelete(id);
    return ResponseEntity.ok(null);
  }
}
