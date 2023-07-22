package dx2.backend.modules.users.auth;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import javax.naming.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import dx2.backend.modules.users.UserEntity;
import dx2.backend.modules.users.UserRepository;

@Service
public class AuthService {

  @Autowired
  JwtEncoder jwtEncoder;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  UserRepository userRepository;

  public String authenticate(Credentials credentials) throws NotFoundException, AuthenticationException {
    var userOptional = userRepository.findOneByEmail(credentials.getEmail());
    if (userOptional.isEmpty()) {
      throw new NotFoundException();
    }

    var user = userOptional.get();

    var isMatched = passwordEncoder.matches(credentials.getPassword(), user.getHashedPassword());
    if (isMatched) {
      return this.issueToken(user);
    } else {
      throw new AuthenticationException();
    }
  }

  private String issueToken(UserEntity userEntity) {
    var now = Instant.now();
    var claims = JwtClaimsSet.builder().issuer("self")
        .issuedAt(now)
        .expiresAt(now.plus(1, ChronoUnit.HOURS))
        .subject(userEntity.getEmail())
        .build();

    return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }
}
