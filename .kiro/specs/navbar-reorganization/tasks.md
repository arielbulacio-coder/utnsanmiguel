# Implementation Plan: Navigation Menu Reorganization

## Overview

This plan outlines the implementation of a reorganized navigation menu for SimuTec, transforming the current mega-menu with 70+ links into a clean 7-category structure with modern styling and improved mobile experience. The implementation follows the existing React 19 + Vite architecture and maintains all current functionality including theme toggle, role-based access, and mobile access modal.

## Tasks

- [ ] 1. Create navigation data structure configuration
  - Define NAVIGATION_STRUCTURE constant with 7 categories
  - Include course highlights, sub-sections, and links for each category
  - Define data types for: course-highlight, course-details, sub-header, status items
  - Create path mapping for all existing routes
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1_

- [ ] 2. Extract NavBar styling to CSS
  - Move inline style objects to App.css or new NavBar.css file
  - Create CSS custom properties for brand colors and spacing
  - Extract navStyle, linkStyle, activeStyle to CSS classes
  - Add responsive breakpoint at 992px
  - _Requirements: 5.1, 5.3_

- [ ] 3. Implement main navigation structure
  - Update NavBar component to use NAVIGATION_STRUCTURE
  - Render 7 main category buttons with icons
  - Add hover/click handlers for dropdown toggling
  - Maintain logo placement and theme toggle
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 4. Implement Cursos dropdown component
  - Create course highlight section with 3 courses
  - Add course detail sub-items (Programa, Evaluaciones, Materiales)
  - Style course highlights as prominent cards
  - Add course descriptions
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 5. Implement Electricidad dropdown component
  - Create 2-column grid layout
  - Add sub-headers: Fundamentos, Análisis de Circuitos, Electrónica Digital
  - Add category links with icons
  - Limit items per sub-section to max 20
  - _Requirements: 3.1, 3.5, 1.4_

- [ ] 6. Implement Robótica dropdown component
  - Create 2-column grid layout
  - Add sub-headers: Arduino & C++, ESP32 & IoT, Proyectos
  - Add category links with icons
  - _Requirements: 3.2, 3.6_

- [ ] 7. Implement Taller dropdown component
  - Create 2-column grid layout
  - Add sub-headers: Metrología, Herramientas, Dibujo Técnico
  - Add category links with icons
  - _Requirements: 3.3, 3.7_

- [ ] 8. Implement Recursos dropdown component
  - Create 1-column layout
  - Add sub-headers: Matemática & Física, Cultura Digital, Institucionales
  - Handle external links (Drive, Spreadsheet)
  - _Requirements: 3.4_

- [ ] 9. Implement App Móviles protected category
  - Integrate existing MobileAccessGate component
  - Add unlock/lock state indicators
  - Display Programa and Simulador when unlocked
  - Show password prompt when locked
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 10. Implement Gestión role-based category
  - Create role detection from authentication context
  - Add student options (Academic)
  - Add admin options (Gestionar Usuarios)
  - Add director options (Configuración Sistema)
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 11. Implement mobile expanded menu
  - Add hamburger button visibility below 992px
  - Create ExpandedMobileMenu component with all 7 categories
  - Show all categories expanded simultaneously
  - Display sub-items immediately without accordion toggles
  - Add vertical scrolling within viewport
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 12. Add accessibility features
  - Add ARIA labels to all interactive elements
  - Add role="menubar", role="menuitem", aria-haspopup attributes
  - Implement keyboard navigation (Tab, Enter, Escape, Arrow keys)
  - Add aria-expanded states for dropdowns
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 13. Add click-outside handler
  - Add document click listener for closing menus
  - Exclude navigation bar from click detection
  - Implement closeAll function for menu state reset
  - _Requirements: 1.6_

- [ ]* 14. Write unit tests for navigation structure
  - Test 7 main categories render correctly
  - Test exact text content matches specifications
  - Test sub-headers exist for large categories
  - Test course highlights display properly
  - _Requirements: 1.1, 1.2, 1.5, 2.1, 2.2_

- [ ]* 15. Write property tests for hover interactions
  - **Property 1: Hover shows dropdown**
  - **Validates: Requirements 1.3, 5.2**

- [ ]* 16. Write property tests for mobile responsive
  - **Property 4: Hamburger appears on mobile**
  - **Property 5: Mobile menu opens with hamburger**
  - **Validates: Requirements 4.1, 4.2**

- [ ]* 17. Write property tests for keyboard navigation
  - **Property 6: Keyboard navigation works**
  - **Validates: Requirements 6.1, 6.2**

- [ ]* 18. Write property tests for brand blue styling
  - **Property 7: Hover uses brand blue**
  - **Validates: Requirements 5.1, 5.2**

- [ ]* 19. Write integration tests for role-based access
  - **Property 8: Role-based menu visibility**
  - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**

- [ ] 20. Final checkpoint - Verify all functionality
  - Run full test suite
  - Test on actual mobile viewport sizes
  - Verify theme toggle works correctly
  - Test access modal integration
  - Ask user if questions arise.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": [
        "1"
      ]
    },
    {
      "id": 1,
      "tasks": [
        "2"
      ]
    },
    {
      "id": 2,
      "tasks": [
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ]
    },
    {
      "id": 3,
      "tasks": [
        "9",
        "10",
        "11",
        "12",
        "13"
      ]
    },
    {
      "id": 4,
      "tasks": [
        "14"
      ]
    },
    {
      "id": 5,
      "tasks": [
        "15",
        "16",
        "17",
        "18",
        "19"
      ]
    },
    {
      "id": 6,
      "tasks": [
        "20"
      ]
    }
  ]
}
```

## Notes

- Tasks marked with `*` are optional property-based tests that can be skipped for faster MVP
- The NAVIGATION_STRUCTURE configuration serves as the single source of truth for navigation content
- The design document contains 8 correctness properties that should be converted to automated tests
- Mobile testing should use Chrome DevTools device emulation for accurate viewport testing
- All existing functionality (theme toggle, access modal, authentication) must be preserved
- The visual design uses BrandBlue (#1A56DB) with subtle backgrounds and clear typography hierarchy