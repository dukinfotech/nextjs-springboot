package dx2.backend.modules.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

  @Autowired
  RoleRepository roleRepository;
}
