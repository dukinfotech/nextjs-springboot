package dx2.backend.modules.permissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import jakarta.persistence.EntityNotFoundException;

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
    try {
      var permission = permissionService.get(id);
      return ResponseEntity.ok(permission);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @PostMapping
  ResponseEntity<PermissionEntity> create(@RequestBody PermissionEntity permission) {
    var newPermission = permissionService.create(permission);
    return ResponseEntity.ok(newPermission);
  }

  @PutMapping("{id}")
  ResponseEntity<PermissionEntity> update(@PathVariable Long id, @RequestBody PermissionEntity permission) {
    try {
      var updatedPermission = permissionService.update(id, permission);
      return ResponseEntity.ok(updatedPermission);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @DeleteMapping("{id}")
  ResponseEntity<Void> softDelete(@PathVariable Long id) {
    try {
      permissionService.softDelete(id);
      return ResponseEntity.ok(null);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
}
