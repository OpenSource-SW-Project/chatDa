package Opensource_SW_Project.Project.domain;

import Opensource_SW_Project.Project.domain.enums.Category;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Builder
@DynamicUpdate
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Talk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long talkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // user와 양방향 매핑하기 <- 양방향??
    public void setUser(User user) {
//        // 기존에 이미 등록되어 있던 관계를 제거
//        if (this.user != null) {
//            this.user.getAnswerList().remove(this);
//        }

        this.user = user;

//        // 양방향 관계 설정
//        if (user != null) {
//            user.getAnswerList().add(this);
//        }
    }
}