package dx2.backend.modules.permissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

  @Autowired
  PermissionRepository permissionRepository;
}
