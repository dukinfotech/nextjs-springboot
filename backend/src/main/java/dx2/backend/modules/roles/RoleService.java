package dx2.backend.modules.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

  @Autowired
  RoleRepository roleRepository;

  public Page<RoleEntity> findAllWithPagination(
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
    return roleRepository.findByNameContainingIgnoreCaseOrTextContainingIgnoreCase(search, search, pageable);
  }

  public void softDelete(Long id) {
    roleRepository.deleteById(id);
  }
}
