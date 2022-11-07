package com.a401.backend.domain.follow.api;

import com.a401.backend.domain.follow.application.FollowService;
import com.a401.backend.domain.follow.dto.request.FollowRequestDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/follow")
public class FollowController {

    private final FollowService flService;

//    @GetMapping ("")
//    public ResponseEntity<?> getMemo(@CurrentUser PrincipalDetails principalDetails) {
//        // 멤버 가져오기
//        Member member = principalDetails.getMember();
//
//        try {
//            MemoResponseDto memo = memoService.callMemo(member);
//            return new ResponseEntity<>(memo, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping ("/following")
    public ResponseEntity<?> connectFollow(@RequestBody FollowRequestDto request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            flService.connect(request,member);
            return new ResponseEntity<>("성공적으로 저장", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

