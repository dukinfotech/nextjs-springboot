package dx2.backend.modules.roles;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import dx2.backend.modules.permissions.PermissionEntity;
import dx2.backend.modules.users.UserEntity;
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
@Table(name = "roles")
@Data
public class RoleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  @ManyToMany(mappedBy = "roles")
  Set<UserEntity> users = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY, cascade = {
      CascadeType.PERSIST,
      CascadeType.MERGE
  })
  @JoinTable(name = "role_permission_id", joinColumns = {
      @JoinColumn(name = "role_id")
  }, inverseJoinColumns = {
      @JoinColumn(name = "permission_id") })
  private Set<PermissionEntity> permissions = new HashSet<>();
}