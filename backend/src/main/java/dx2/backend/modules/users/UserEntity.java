package dx2.backend.modules.users;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import dx2.backend.modules.permissions.PermissionEntity;
import dx2.backend.modules.roles.RoleEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "hashed_password")
  private String hashedPassword;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  @ManyToMany(fetch = FetchType.LAZY, cascade = {
      CascadeType.PERSIST,
      CascadeType.MERGE
  })
  @JoinTable(name = "user_role_id", joinColumns = {
      @JoinColumn(name = "user_id")
  }, inverseJoinColumns = {
      @JoinColumn(name = "role_id") })
  private Set<RoleEntity> roles = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY, cascade = {
      CascadeType.PERSIST,
      CascadeType.MERGE
  })
  @JoinTable(name = "user_permission_id", joinColumns = {
      @JoinColumn(name = "user_id")
  }, inverseJoinColumns = {
      @JoinColumn(name = "permission_id") })
  private Set<PermissionEntity> permissions = new HashSet<>();
}