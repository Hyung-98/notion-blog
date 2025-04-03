# Notion Blog

노션 API를 활용한 블로그 프로젝트입니다. 노션 페이지를 블로그 포스트로 변환하여 보여줍니다.

## 프로젝트 소개

- 노션 페이지를 블로그 포스트로 자동 변환
- 마크다운 기반의 콘텐츠 지원
- 반응형 디자인 적용
- SEO 최적화

## 개발 환경

- IDE: Visual Studio Code
- Node.js: v18.x
- npm: v9.x

## 기술 스택

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- React Query

### Backend

- Next.js API Routes
- Notion API

### 도구 및 인프라

- Git
- Vercel
- ESLint
- Prettier

## 주요 기능

- 📝 노션 페이지 블로그 포스트 변환
- 🔍 게시물 검색
- 🏷️ 카테고리 및 태그 기능
- 💬 댓글 시스템
- 📱 모바일 대응

## API 문서

### Posts

```typescript
GET /api/posts
// 모든 게시물 목록 조회

GET /api/posts/:id
// 특정 게시물 조회

GET /api/categories
// 카테고리 목록 조회

GET /api/tags
// 태그 목록 조회
```
