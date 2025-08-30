# 하루하나(Haruhana)

이 프로젝트는 **습관 달성표(스탬프)** 를 기록하고 관리하는 웹 애플리케이션입니다.  

자세한 내용 확인: [하루하나-서버](https://github.com/hjk997/haruhana-server)

---

## 🛠️ 기술 스택

### Frontend
- HTML/CSS/Vanilla JS (추후 변경 가능성 있음)
- PWA (알림/오프라인 기능 지원)

---

## 📂 프로젝트 구조 (Frontend)

```
haruhana-cilent/
├── css/  
├── img/ 
├── js/ 
└── *.html 
```

---

## 🚀 실행 방법 (개발 환경)

### Frontend
```
# FastAPI 실행
uvicorn core.main:app --reload --host 0.0.0.0 --port 8000
```
