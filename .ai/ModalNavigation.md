# 모달 네비게이션 구현 가이드

이 문서는 React와 TypeScript를 사용하여 모달 내 네비게이션을 구현하는 방법을 설명합니다. 특히 상단 네비게이션 바, 하단 컨텐츠 카운터, 이미지 드래그 방지 등의 구현 원리를 다룹니다.

## 1. 상단 네비게이션 바 구현

### 1.1 스크롤 가능 여부 감지

네비게이션 바의 스크롤 가능 여부를 감지하는 로직은 다음과 같습니다:

```typescript
const checkScrollButtons = () => {
  if (navItemsRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = navItemsRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  }
};
```

- `scrollWidth`: 전체 컨텐츠의 실제 너비
- `clientWidth`: 현재 보이는 영역의 너비
- `scrollLeft`: 현재 스크롤된 위치

### 1.2 스크롤 버튼 동작

좌우 스크롤 버튼의 동작은 다음과 같이 구현됩니다:

```typescript
const handleNavSwipe = (direction: 'left' | 'right') => {
  if (navItemsRef.current) {
    const scrollAmount = 200;
    const newScrollLeft =
      direction === 'left'
        ? navItemsRef.current.scrollLeft - scrollAmount
        : navItemsRef.current.scrollLeft + scrollAmount;

    navItemsRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }
};
```

### 1.3 선택된 탭 중앙 정렬

선택된 탭을 중앙에 정렬하는 로직입니다:

```typescript
const scrollToContent = (type: ContentType) => {
  if (navItemsRef.current) {
    const selectedItem = navItemsRef.current.querySelector(
      `[data-type="${type}"]`,
    );
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }
};
```

## 2. 하단 컨텐츠 카운터 구현

컨텐츠 카운터는 현재 보고 있는 이미지의 위치를 표시하는 인디케이터입니다:

```typescript
const ContentCounterWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
`;

const ContentCounter = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? '#ff6ba9' : '#ddd')};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#ff6ba9' : '#ccc')};
  }
`;
```

## 3. 이미지 드래그 방지

이미지가 웹 브라우저에서 드래그되는 것을 방지하기 위해 다음과 같은 CSS 속성을 사용합니다:

```typescript
const ContentBody = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
```

주요 속성 설명:

- `user-select: none`: 텍스트 선택 방지
- `-webkit-user-drag: none`: 이미지 드래그 방지
- `-webkit-user-select: none`: Safari에서 텍스트 선택 방지
- `-moz-user-select: none`: Firefox에서 텍스트 선택 방지
- `-ms-user-select: none`: IE/Edge에서 텍스트 선택 방지

## 4. 스타일링 팁

1. 네비게이션 바의 스크롤바 숨김:

```css
.nav-items {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
```

2. 부드러운 스크롤 효과:

```css
.nav-items {
  scroll-behavior: smooth;
}
```

3. 반응형 디자인을 위한 미디어 쿼리:

```css
@media (max-width: 768px) {
  .nav-items {
    padding: 0 5px;
  }
}
```

이러한 구현 방식들을 통해 사용자 친화적인 모달 네비게이션을 구현할 수 있습니다. 각 기능은 모듈화되어 있어 유지보수가 용이하며, 재사용성도 높습니다.
