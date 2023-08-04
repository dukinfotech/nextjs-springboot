package dx2.backend.modules.roles;

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
@RequestMapping("/api/roles")
public class RoleController {
  @Autowired
  RoleService roleService;

  @GetMapping
  ResponseEntity<Page<RoleEntity>> findAllWithPagination(
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(defaultValue = "createdAt") String sort,
      @RequestParam(defaultValue = "false") Boolean isAsc) {
    var paginatedRoles = roleService.findAllWithPagination(search, page, size, sort, isAsc);
    return ResponseEntity.ok(paginatedRoles);
  }

  @GetMapping("{id}")
  ResponseEntity<RoleEntity> get(@PathVariable Long id) {
    try {
      var role = roleService.get(id);
      return ResponseEntity.ok(role);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @PostMapping
  ResponseEntity<RoleEntity> create(@RequestBody RoleEntity role) {
    var newRole = roleService.create(role);
    return ResponseEntity.ok(newRole);
  }

  @PutMapping("{id}")
  ResponseEntity<RoleEntity> update(@PathVariable Long id, @RequestBody RoleEntity role) {
    try {
      var updatedRole = roleService.update(id, role);
      return ResponseEntity.ok(updatedRole);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @DeleteMapping("{id}")
  ResponseEntity<Void> softDelete(@PathVariable Long id) {
    try {
      roleService.softDelete(id);
      return ResponseEntity.ok(null);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
}
