# GitHub Pages 배포 가이드

## 사전 준비

1. **GitHub 저장소 생성**
   - GitHub에서 새 저장소를 생성합니다
   - 저장소 이름은 원하는 대로 지정 (예: `portfolio`)

2. **로컬에서 Git 초기화 및 연결**
   ```bash
   # Git 초기화
   git init
   
   # 파일 추가
   git add .
   
   # 첫 커밋
   git commit -m "Initial commit: Portfolio website"
   
   # GitHub 저장소와 연결 (저장소 URL을 본인의 것으로 변경)
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   
   # main 브랜치로 푸시
   git branch -M main
   git push -u origin main
   ```

## GitHub Pages 설정

1. **GitHub 저장소 설정**
   - 저장소 페이지에서 `Settings` 탭으로 이동
   - 왼쪽 메뉴에서 `Pages` 선택
   - `Source`에서 `GitHub Actions` 선택

2. **저장소 이름 확인 및 base 경로 수정**
   - `vite.config.ts` 파일에서 `base` 경로를 저장소 이름과 일치시킵니다
   - 현재: `base: process.env.GITHUB_ACTIONS ? '/my-make-file/' : '/'`
   - 변경: `base: process.env.GITHUB_ACTIONS ? '/YOUR_REPO_NAME/' : '/'`
   - 예시: 저장소 이름이 `portfolio`라면 `/portfolio/`로 변경

## 자동 배포

이제 `main` 브랜치에 푸시할 때마다 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update portfolio"
git push
```

배포 상태는 저장소의 `Actions` 탭에서 확인할 수 있습니다.

## 배포된 사이트 확인

배포가 완료되면 다음 주소에서 사이트를 확인할 수 있습니다:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

예시:
- 사용자명이 `parkleeeun`이고 저장소 이름이 `portfolio`라면
- `https://parkleeeun.github.io/portfolio/`

## 문제 해결

### 배포 실패 시
1. `Actions` 탭에서 에러 로그 확인
2. `Settings > Pages`에서 Source가 `GitHub Actions`로 설정되어 있는지 확인

### 페이지가 빈 화면으로 나올 때
1. `vite.config.ts`의 `base` 경로가 저장소 이름과 일치하는지 확인
2. 브라우저 개발자 도구(F12)의 Console 탭에서 에러 확인

### 이미지가 로드되지 않을 때
- 현재 `figma:asset` 이미지들은 플레이스홀더로 표시됩니다
- 실제 이미지를 사용하려면 이미지 파일을 `src/assets/` 폴더에 추가하고 
  `vite.config.ts`의 `figmaAssetPlugin` 함수를 수정해야 합니다

## 로컬 개발

배포와 별개로 로컬에서 개발하려면:

```bash
# 개발 서버 실행 (포트 5173)
pnpm run dev

# 프로덕션 빌드 테스트
pnpm run build
pnpm run preview
```

## 커스텀 도메인 (선택사항)

1. 저장소 루트에 `public/CNAME` 파일 생성
2. 파일 내용: `your-domain.com`
3. 도메인 제공업체에서 DNS 설정:
   - A 레코드: GitHub Pages IP 주소들
   - 또는 CNAME: `YOUR_USERNAME.github.io`

자세한 내용은 [GitHub Pages 문서](https://docs.github.com/en/pages)를 참고하세요.
