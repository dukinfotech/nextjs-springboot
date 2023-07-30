package dx2.backend.modules.roles;

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
    var roleOptional = roleService.get(id);
    if (roleOptional.isPresent()) {
      var role = roleOptional.get();
      return ResponseEntity.ok(role);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  ResponseEntity<RoleEntity> create(@RequestBody RoleEntity role) {
    var newRole = roleService.create(role);
    return ResponseEntity.ok(newRole);
  }

  @DeleteMapping("{id}")
  ResponseEntity<Void> softDelete(@PathVariable Long id) {
    roleService.softDelete(id);
    return ResponseEntity.ok(null);
  }
}
