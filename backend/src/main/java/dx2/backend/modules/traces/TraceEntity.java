package dx2.backend.modules.traces;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import dx2.backend.modules.users.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "traces")
@Data
public class TraceEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "table_name", nullable = false)
  private String tableName;

  @Column(name = "primary_key", nullable = false)
  private String primaryKey;

  @Column(name = "operation", nullable = false)
  private String operation;

  @ManyToOne
  @JoinColumn(name = "operator_id")
  private UserEntity operator;

  @Column(name = "json_data", columnDefinition = "json", nullable = false)
  private String jsonData;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;
}