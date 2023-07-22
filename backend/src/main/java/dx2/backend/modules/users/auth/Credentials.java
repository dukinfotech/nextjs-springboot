package dx2.backend.modules.users.auth;

import lombok.Data;

@Data
public class Credentials {
  private String email;
  private String password;
}
