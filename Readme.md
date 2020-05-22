# WordMatchingGame

Word Mathing Game. you can play here <https://hixxx.me/wordMatchingGame>

----

## Table of contents

[● Technical Stack](#Technial-Stack)  
[● Service Overview](#Service-Overview)   

## Technical Stack

* Backend
  * Node.js
  * Express
  * Nginx
  * AWS EC2

* Frontend
  * Single Page Application (SPA)
  * ES6, ES7 Only
  * Jest
  * WebPack Dev Server & Hot loading

## Service Overview

* 해결 전략
  * State Propagation
    * Game Page는 점수 변동, 타이머 변동, 단어 변동 등 동적인 UI가 많음
    * React와 유사하게 state를 공유하는 방식으로 구현
    * 각 컴포넌트에서 해당 state를 핸들링할 필요가 있을 시 ${state}_handler 형식으로 손쉽게 핸들링 가능
    * UI를 각각의 컴포넌트로 구현한 후, 메인 Home 컴포넌트를 기반으로 state를 하위 컴포넌트로 확산시켜 나가는 모델로 구현
    * children 밑에 또 다시 하위 컴포넌트가 있더라도 state 변화를 전달할 수 있는 확장성 있는 구조로 구현
  * Class based
    * Class 기반으로 개별 컴포넌트를 정의하고, dom과 메서드를 정의
    * 공통 class를 구현하여 setState, render 메서드를 공유
  * SPA & Routing
    * 접속 시 index.html 만을 렌더링하고 동적인 UI 변경 및 라우팅을 모두 js로 구현
    * Pjax 방식의 네비게이션으로 '/', '/result' 페이지를 라우팅
  * Test
    * Initialization Phase, Loading Phase, Game Phase로 나누어 jest test 진행
    * 각 컴포넌트의 변수들에 단계마다 값이 적절하게 주어지는 지 여부를 체크
    * Home 컴포넌트에서는 각 컴포넌트의 연관관계속에서 성공 시 scenario, 실패 시 scenario를 점검