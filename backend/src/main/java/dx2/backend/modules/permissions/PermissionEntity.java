package dx2.backend.modules.permissions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import dx2.backend.modules.roles.RoleEntity;
import dx2.backend.modules.users.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "permissions")
@Data
public class PermissionEntity {
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

  @ManyToMany(mappedBy = "permissions")
  List<UserEntity> users = new ArrayList<UserEntity>();

  @ManyToMany(mappedBy = "permissions")
  List<RoleEntity> roles = new ArrayList<RoleEntity>();
}